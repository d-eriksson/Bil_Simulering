%% Define Car Parameters
% Car mass
mass = 1600;
% Wheel mass
%m_w = 25;
% Wheel radius
wheelRadius = 0.34;
% Moment of inertia for cylinder
%I = (m_w*wheelRadius^2)/2;

% Drag calculations
rho = 1.29; % Air density (typical)
cD = 0.3;   % Drag coefficient (car specific)
A = 2.2; % Drag surface area (car specific)
Cdrag = 0.5*cD*A*rho; % Net drag coefficient
cRR = 0.01*mass; % Rolling resistance

% Transmission
gears = [2.66 1.78 1.3 1 0.74 0.5];
differentialRatio = 3.42;
transm_efficiency = 0.7;

% Initial velocity
velocity = 0;

% Engine torque curve
rpm_range = 1000:6000;
engineTorque(1000:6000) = 560-0.000025*abs(4400-rpm_range).^2+0.000000004*abs(4400-rpm_range).^3-0.02*rpm_range; % --Vad är konstanterna för något?--

% Initial gear
current_gear(1) = 1; % Gears are changed automatically at redline (for now)
% Initial gear ratio from lookup table
gearRatio = gears(current_gear(1));

% --------------- loop here ------------------------
% Five second loop, sampling interval of Ts
Ts = 0.001;
i = 1;
for t = 0:Ts:5
% temporary hard coded...
throttle = 1.0; % User input

% Calculate RPM and select gear
rpm = floor(velocity(i)/wheelRadius*gearRatio*differentialRatio*60/(2*pi));
if(rpm<1000)
    % If rpm falls below stalling threshold, pretend rpm is 1000
    rpm = 1000;
    % Also change to first gear!
    current_gear(i) = 1;
elseif(rpm>6000)       
        % As long as rpm is above 6000(redline), increase gear
        if(current_gear(i-1)<6)
            current_gear(i) = current_gear(i-1) + 1;
            gearRatio = gears(current_gear(i));
            rpm = floor(velocity(i)/wheelRadius*gearRatio*differentialRatio*60/(2*pi));
        else
            % If the gear is already 6 (max) reset rpm to 6000
            rpm = 6000;
            current_gear(i) = current_gear(i-1);
        end
else
    % If rpm is within range, do not switch gears
    current_gear(i) = current_gear(i-1);
end


% Calculate torque at the wheels
Torque = throttle*engineTorque(rpm)*differentialRatio*gearRatio*transm_efficiency/wheelRadius;

% Calculate wheel force on ground and subtract air resistance and rolling
% resistance
Fw(i) = Torque/wheelRadius-Cdrag*velocity(i).^2-cRR*velocity(i);

% Calculate acceleration
acceleration = Fw(i)/mass;

% Calculate velocity
velocity(i+1) = velocity(i) + acceleration*Ts;

i = i+1;
end

% Convert to km/h
Vkmh = velocity*3.6;
plot(Vkmh)
xlabel('Time (ms)')
ylabel('Velocity (km/h)')