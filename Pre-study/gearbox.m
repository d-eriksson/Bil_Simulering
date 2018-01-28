function [rpm, current_gear, gearRatio, deactivate_throttle] = gearbox(i, rpm, gears, differentialRatio, current_gear, angular_velocity)
% ----- GEARBOX ----- %
% 1. If rpm is below 1000, fake an rpm of 1000, maybe implement clutch
% 2. If rpm is within range, do not switch gears (still need to assign one)
% 3. If rpm is above 6000, upshift and recalculate rpm.
% 4. If rpm is above 6000 is max gear, reset throttle and rpm.

deactivate_throttle = false;

% STALLING ENGINE
if(rpm(i)<1000)
    % If rpm falls below stalling threshold, pretend rpm is 1000
    rpm(i) = 1000;
    % Also change to first gear!
    current_gear(i) = 1;
    gearRatio = gears(current_gear(i));

% NO SHIFT NECESSARY
elseif(rpm(i)>=1000 && rpm(i)<=6000)
    % If rpm is within range, do not switch gears
    current_gear(i) = current_gear(i-1);
    gearRatio = gears(current_gear(i));

% UPSHIFT
elseif(rpm(i)>6000 && current_gear(i-1)<6)       
    % As long as rpm is above 6000(redline), increase gear
    current_gear(i) = current_gear(i-1) + 1;
    % Recalculate rpm after gear change
    gearRatio = gears(current_gear(i));
    rpm(i) = floor(angular_velocity(i)*gearRatio*differentialRatio*60/(2*pi));

% REDLINE
elseif(rpm(i)>6000 && current_gear(i-1)==6)
    % If the gear is already 6 (max) reset rpm to 6000
    rpm(i) = 6000;
    deactivate_throttle = true;
    current_gear(i) = current_gear(i-1);
    gearRatio = gears(current_gear(i));
end