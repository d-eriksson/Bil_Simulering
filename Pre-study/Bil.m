%% Reset simulation
close all
clear all
clc
%% Define Car Parameters
% Car mass
mass = 1600;
g = 9.81;
load_front_wheel = 0.51*mass*0.5;
load_back_wheel = 0.49*mass*0.5;
% Wheel radius
wheel_radius = 0.34;

% Create a slip function
for i=1:1000
    if(i<=60)
        slip(i) = 1.06*1.6667*0.01*i;
    else
        slip(i) = slip(i-1);
    end
end

% Drag calculations
air_density = 1.29; % Air density (typical)
cD = 0.3;   % Drag coefficient (car specific)
drag_area = 2.2; % Drag surface area (car specific)
Cdrag = 0.5*cD*drag_area*air_density; % Net drag coefficient
cRR = 30*Cdrag; % Rolling resistance

% Transmission
gears = [2.66 1.78 1.3 1 0.74 0.5];
differentialRatio = 3.42;
transm_efficiency = 0.7;

% Initial velocity
velocity(1) = 0;

% Engine torque curve
rpm_range = 1000:6000;
engineTorque(1000:6000) = 560-0.000025*abs(4400-rpm_range).^2+0.000000004*abs(4400-rpm_range).^3-0.02*rpm_range; % --Vad �r konstanterna f�r n�got?--

% Initial gear
current_gear(1) = 1; % Gears are changed automatically at redline (for now)
% Initial gear ratio from lookup table
gearRatio = gears(current_gear(1));

% --------------- loop here ------------------------
% Five second loop, time step of Ts
Ts = 0.001;
i = 1;
throttle = 1.0; % User input
for t = 0:Ts:15
% temporary hard coded...
%if (t==3)
%    throttle = 0;
%end

angular_velocity = velocity(i)/wheel_radius;

% Calculate RPM and round it. rpm is used as index for enginge torque later
% and must be an integer
rpm(i) = floor((angular_velocity)*gearRatio*differentialRatio*60/(2*pi));

% ----- GEARBOX -----
if(rpm(i)>=1000 && rpm(i)<=6000)
    % If rpm is within range, do not switch gears
    current_gear(i) = current_gear(i-1);

elseif(rpm(i)<1000)
    % If rpm falls below stalling threshold, pretend rpm is 1000
    rpm(i) = 1000;
    % Also change to first gear!
    current_gear(i) = 1;

elseif(rpm(i)>6000 && current_gear(i-1)<3)       
    % As long as rpm is above 6000(redline), increase gear
    current_gear(i) = current_gear(i-1) + 1;
    % Recalculate rpm after gear change
    gearRatio = gears(current_gear(i));
    rpm(i) = floor(angular_velocity*gearRatio*differentialRatio*60/(2*pi));

elseif(rpm(i)>6000)
    % If the gear is already 6 (max) reset rpm to 6000
    rpm(i) = 6000;
    current_gear(i) = current_gear(i-1);
end


% Calculate torque at the wheels
Torque = throttle*engineTorque(rpm(i))*differentialRatio*gearRatio*transm_efficiency;

% Calculate wheel force on ground and subtract air resistance and rolling
% resistance
Force_rolling = -cRR*velocity(i);
Force_drag = -Cdrag*velocity(i).^2;
Force_wheels = Torque/wheel_radius;
Force_traction = Force_wheels*1; % "traction must be defined somehow"

Force_net(i) = Force_traction + Force_rolling + Force_drag;

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
plot(acceleration)
xlabel('Time (ms)')
ylabel('Acceleration (m/s^2)')

subplot(2, 2, 4)
plot(rpm)
xlabel('Time (ms)')
ylabel('RPM')