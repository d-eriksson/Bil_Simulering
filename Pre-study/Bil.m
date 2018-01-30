%% Reset simulation
close all
clear all
clc
%% Define Car Parameters
% Car mass
mass = 1500;
load_rear_wheels = 0.49*mass*9.81;
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
differentialRatio = 3.42;
% Include the differential ratio into the gears
gears = gears*differentialRatio;
transm_efficiency = 0.7;
clear differentialRatio

% SIMULATION SETTINGS
Ts = 0.001;     % Time step
duration = 15;  % Duration of simulation
samples = 15001;% Number of samples, used to preallocate arrays

% RESOLVE INITIAL CONDITIONS
velocity = zeros(1,samples+1);
angular_velocity = zeros(1,samples+1);
Force_traction = zeros(1,samples+1);
current_gear = ones(1,samples); % Gears are changed automatically at redline (for now)
gearRatio = gears(1);
deactivate_throttle = false;

% MEMORY PREALLOCATION
acceleration = zeros(1, samples);
angular_acceleration = zeros(1, samples);
drive_torque = zeros(1, samples);
Force_net = zeros(1, samples);
rolling_torque = zeros(1, samples);
rpm = zeros(1, samples);
slip_ratio = zeros(1, samples);
total_torque = zeros(1, samples);
traction_torque = zeros(1, samples);
wheel_velocity = zeros(1, samples);

% --------------- loop here ------------------------
% Five second loop, time step of Ts
i = 1;
for t = 0:Ts:duration
% Throttle should be based on user input
if (deactivate_throttle)
    throttle = 0.0;
else
    throttle = 1.0; % User input
end

% Calculate RPM and round it. rpm is used as index for enginge torque later and must be a positive integer
rpm(i) = (angular_velocity(i))*gearRatio*60/(2*pi);

% GEARBOX 2.0
[rpm, current_gear, gearRatio, deactivate_throttle] = gearbox(i, rpm, gears, current_gear, angular_velocity);

% ---- TORQUE ---- %
% Drive torque is torque provided by engine
drive_torque(i) = throttle*(560-0.000025*abs(4400-rpm(i)).^2+0.000000004*abs(4400-rpm(i)).^3-0.02*rpm(i))*gearRatio*transm_efficiency;
% Traction torque är markens torque på hjulet (motsatt håll än drive torque)
traction_torque(i) = Force_traction(i)*wheel_radius;
% Total torque is the total torque acting on the wheel
total_torque(i) = drive_torque(i) - traction_torque(i);
% NEW ROLLING RESISTANCE, (0.005 + 0.414938*(0.01+0.00019*velocity(i))) is
% the coefficient with tyre pressure 2.41 bar. The coefficient is
% multiplied by the 
rolling_torque(i) = min(abs(total_torque(i)), abs((0.005 + 0.414938*(0.01+0.00019*velocity(i)))*mass*9.81*wheel_radius));
total_torque(i) = total_torque(i)-rolling_torque(i);

% ---- WHEEL VEL/ACC ---- %
angular_acceleration(i) = total_torque(i)/inertia;
angular_velocity(i+1) = angular_velocity(i) + angular_acceleration(i)*Ts;
wheel_velocity(i) = angular_velocity(i+1)*wheel_radius;

% ---- SLIP ---- %
slip_ratio(i) = (wheel_velocity(i)-velocity(i))/velocity(i);
force_multiplier = 15*slip_ratio(i);
if(force_multiplier > 0.9)
    force_multiplier = 0.9;
elseif(force_multiplier < -0.9)
    force_multiplier = -0.9;
end

% ---- FORCES ---- %
% Propelling forces
Force_traction(i+1) = force_multiplier*load_rear_wheels;
% Resistive forces
% Force_rolling = -cRR*velocity(i);
Force_drag = Cdrag*velocity(i).^2;

% Slutgiltig kraft på bil
Force_net(i) = Force_traction(i+1) - Force_drag;

% Calculate acceleration
acceleration(i) = Force_net(i)/(mass*wheel_radius);

% Calculate velocity
velocity(i+1) = velocity(i) + acceleration(i)*Ts;

i = i+1;
end

% Convert to km/h
Vkmh = velocity*3.6;

% Show figures
figure
subplot(2, 2, 1)
plot(Vkmh)
xlabel('Time (ms)')
ylabel('Velocity (km/h)')

subplot(2, 2, 2)
plot(current_gear)
xlabel('Time (ms)')
ylabel('Gear')

subplot(2, 2, 3)
plot(slip_ratio*100)
xlabel('Time (ms)')
ylabel('Slip ratio (%)')

subplot(2, 2, 4)
plot(rpm)
xlabel('Time (ms)')
ylabel('RPM')