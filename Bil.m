%% Define Car Parameters
% Car mass
m = 1600;
% Wheel mass
m_w = 25;
% Wheel radius
wheelRadius = 0.34;
% Moment of inertia for cylinder
I = (m_w*wheelRadius^2)/2;

% Drag calculations
rho = 1.29; % Air density (typical)
cD = 0.3;   % Drag coefficient (car specific)
A = 2.2; % Drag surface area (car specific)
Cdrag = 0.5*cD*A*rho; % Net drag coefficient
cRR = 0.01*m; % Rolling resistance

% Transmission
gears = [2.66 1.78 1.3 1 0.74 0.5];
differentialRatio = 3.42;
transm_efficiency = 0.7;

% Initial velocity
v(1) = 0;

% --------------- loop here ------------------------
% WRITE A FUNCTION TO SELECT GEAR
    % code....

% Calculate gear ratio
gearRatio = gears(current_gear)*differentialRatio*60/(2*pi);

% Calculate RPM
rpm = ang_velocity*gearRatio*differentialRatio;

% Calculate torque at the wheels
T = Wheel_torque(rpm, wheelRadius, gearRatio, differentialRatio);

% Calculate wheel force on ground --------?---------
Fw = T/wheelRadius;

%% Generate a speed vector over 10 seconds
i=1;
for t=0:0.01:5
    
    Fnet = Fw-Cdrag*v(i)^2-cRR*v(i);
    a = Fnet/mc;
    v(i+1) = v(i)+a*t;
    i=i+1;
    
end

% Convert to km/h
Vkmh = v*3.6;
plot(Vkmh)
