function T = Wheel_torque(rpm, wheelRadius, gearRatio, differentialRatio)
% ---- Engine torque
% Create a function matching the LS1 engine shown in the asawicky guide
engineTorque = 450-0.05*abs(4400-rpm)-0.02*rpm;

% ---- Wheel torque
% Multiply with differential gear ratio and gearbox gear ratio
T = engineTorque*differentialRatio*gearRatio*efficiency/wheelRadius;
end