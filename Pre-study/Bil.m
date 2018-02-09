%% Reset simulation
close all
clear
clc
%% Define Car Parameters
% SIMULATION SETTINGS
Ts = 0.001;             % Time step
duration = 20;          % Duration of simulation
samples = 1+duration/Ts;  % Number of samples, used to preallocate arrays

% Car mass
mass = 1500;
normal_force = zeros (1, samples);
normal_force(1) = 0.49*9.81*mass;
wheelbase = 2.654;
CoG_height = 0.381;
wheel_radius = 0.34;
% Back wheels inertia (should be entire rear axle)
mass_back_axis = 200;
inertia = mass_back_axis*wheel_radius^2*0.5;
clear mass_back_axis

% Drag calculations
air_density = 1.29; % Air density (typical)
cD = 0.3;   % Drag coefficient
drag_area = 1.9; % Drag surface area
Cdrag = 0.5*cD*drag_area*air_density; % Net drag coefficient
clear air_density
clear cD
clear drag_area

% Transmission
gears = [2.66 1.78 1.3 1 0.74 0.5];
reverse_gear = -2.9;
differentialRatio = 3.42;
% Include the differential ratio into the gears
gears = gears*differentialRatio;
transm_efficiency = 0.7;
clutch_level = 1;
clear differentialRatio

% RESOLVE INITIAL CONDITIONS
velocity = zeros(1,samples+1);
angular_velocity = zeros(1,samples+1);
Force_traction = zeros(1,samples+1);
current_gear = ones(1,samples); % Gears are changed automatically at redline (for now)
gearRatio = gears(1);
deactivate_throttle = false;
braking_level = 0;
engine_braking_torque = 0;

% MEMORY PREALLOCATION
acceleration = zeros(1, samples);
angular_acceleration = zeros(1, samples);
drive_torque = zeros(1, samples);
Force_net = zeros(1, samples);
rolling_resistance_torque = zeros(1, samples);
rpm = zeros(1, samples);
slip_ratio = zeros(1, samples);
total_torque = zeros(1, samples);
traction_torque = zeros(1, samples);
wheel_velocity = zeros(1, samples);
gearing_bool = zeros(1, samples);

% --------------- loop here ------------------------
% Five second loop, time step of Ts
i = 1;
for t = 0:Ts:duration

% Calculate RPM and round it. rpm is used as index for enginge torque later and must be a positive integer
rpm(i) = (angular_velocity(i))*gearRatio*60/(2*pi*clutch_level);

% 
% if(i>2000)
%     braking_level = min(1, 0.005*i);
%     deactivate_throttle = true;
% end

% Throttle is turned off if:
% 1. RPM is 6000 and gear is max
% 2. For 200 ms after switching gear
% 3. When breaking is applied
if (deactivate_throttle == true || gearing_bool(i)==1 || braking_level>0)
    throttle = 0.0;
    engine_braking_torque = 0.01*rpm(i);
else
    throttle = 1.0; % User input
    engine_braking_torque = 0;
end

% GEARBOX 2.0
[rpm, current_gear, gearRatio, deactivate_throttle, clutch_level, gearing_bool] = gearbox(i, rpm, gears, current_gear, angular_velocity, gearing_bool);

% ---- TORQUE ---- %
% Drive torque is torque provided by engine
drive_torque(i) = clutch_level*throttle*(560-0.000025*abs(4400-rpm(i)).^2+0.000000004*abs(4400-rpm(i)).^3-0.02*rpm(i))*gearRatio*transm_efficiency;
% Traction torque �r markens torque p� hjulet (motsatt h�ll �n drive torque)
traction_torque(i) = Force_traction(i)*wheel_radius;
% Total torque is the total torque acting on the wheel
total_torque(i) = drive_torque(i) - traction_torque(i);
% NEW ROLLING RESISTANCE, 0.414938*(0.01+0.00019*velocity(i)) is the
% coefficient with tyre pressure 2.41 bar.
rolling_resistance_torque(i) = (0.414938*0.00019*velocity(i))*mass*9.81*wheel_radius;
% Bromskraft
total_torque(i) = total_torque(i)-rolling_resistance_torque(i)-engine_braking_torque;
if(angular_velocity(i)>5)
    total_torque(i) = total_torque(i)-4000*braking_level;
elseif(angular_velocity(i)<-5)
    total_torque(i) = total_torque(i)+4000*braking_level;
end
% ---- WHEEL VEL/ACC ---- %
angular_acceleration(i) = total_torque(i)/inertia;
angular_velocity(i+1) = angular_velocity(i) + angular_acceleration(i)*Ts;
wheel_velocity(i) = angular_velocity(i+1)*wheel_radius;

% ---- SLIP ---- %
slip_ratio(i) = (wheel_velocity(i)-velocity(i))/abs(velocity(i));
%If slip ratio is positive (forward)
if(slip_ratio(i)>=0 && slip_ratio(i)<=0.06)
     force_multiplier = 1-16.67*abs((0.06-slip_ratio(i)));
elseif(slip_ratio(i)>0.06)
     force_multiplier = 0.5+0.5*0.06/slip_ratio(i);
% If slip ratio is negative (backwards)
elseif(slip_ratio(i)>=-0.06 && slip_ratio(i)<=0)
     force_multiplier = -1+16.67*abs((0.06+slip_ratio(i)));
elseif(slip_ratio(i)<-0.06)
    force_multiplier = -0.5+0.5*0.06/slip_ratio(i);
end

% ---- FORCES ---- %
% Propelling forces
Force_traction(i+1) = force_multiplier*normal_force(i);
% Resistive forces
Force_drag = Cdrag*velocity(i).^2;
% Slutgiltig kraft p� bil
Force_net(i) = Force_traction(i+1) - Force_drag;
% Calculate acceleration
acceleration(i) = Force_net(i)/(mass*wheel_radius);
% Calculate velocity
velocity(i+1) = velocity(i) + acceleration(i)*Ts;

% Calculated normal force on rear wheels
normal_force(i+1) = 0.49*mass*9.81 + CoG_height/wheelbase*mass*acceleration(i);

i = i+1;
end

% Show figures
figure
subplot(2, 5, 1)
plot(velocity(:, 1:samples-1)*3.6)
xlabel('Time (ms)')
ylabel('Velocity (km/h)')

subplot(2, 5, 2)
plot(acceleration(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Acceleration (m/s^2)')

subplot(2, 5, 3)
plot(wheel_velocity(:, 1:samples-1)*3.6)
xlabel('Time (ms)')
ylabel('Wheel velocity (km/h)')

subplot(2, 5, 4)
plot(rpm(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('RPM')

subplot(2, 5, 5)
plot(current_gear(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Gear')

subplot(2, 5, 6)
plot(slip_ratio(:, 1:samples-1)*100)
xlabel('Time (ms)')
ylabel('Slip ratio (%)')
axis([0 samples -50 50])

subplot(2, 5, 7)
plot(drive_torque(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Drive Torque (Nm)')

subplot(2, 5, 8)
plot(Force_traction(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Drag Force (Nm)')

subplot(2, 5, 9)
plot(Force_net(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Net Force (Nm)')

subplot(2, 5, 10)
plot(drive_torque(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Drive Torque (Nm)')