function [rpm, current_gear, gearRatio, deactivate_throttle, clutch_level, gearing_bool] = gearbox(i, rpm, gears, current_gear, angular_velocity, gearing_bool)
% ----- GEARBOX ----- %
% 1. If rpm is below 1000, fake an rpm of 1000, maybe implement clutch
% 2. If rpm is within range, do not switch gears (still need to assign one)
% 3. If rpm is above 6000, upshift and recalculate rpm.
% 4. If rpm is above 6000 is max gear, reset throttle and rpm.

% These should be defined outside this function
rpm_stalling = 1000;
rpm_upshift = 6000;
rpm_redline = 6000;
gear_max = 6;

deactivate_throttle = false;
clutch_level = 1.0;

% STALLING ENGINE
if(rpm(i)<rpm_stalling)
    clutch_level = 0.5+rpm(i)/2000;
    % If rpm falls below stalling threshold, pretend rpm is 1000
    rpm(i) = rpm_stalling;
    % Also change to first gear!
    current_gear(i) = 1;
    gearRatio = gears(current_gear(i));

% NO SHIFT NECESSARY
elseif(rpm(i)>=rpm_stalling && rpm(i)<=rpm_upshift)
    % If rpm is within range, do not switch gears
    current_gear(i) = current_gear(i-1);
    gearRatio = gears(current_gear(i));

% UPSHIFT
elseif(rpm(i)>rpm_upshift && current_gear(i-1)<gear_max)
    % As long as rpm is above 6000(redline), increase gear
    current_gear(i) = current_gear(i-1) + 1;
    % Recalculate rpm after gear change
    gearRatio = gears(current_gear(i));
    rpm(i) = angular_velocity(i)*gearRatio*60/(2*pi);
    %set gearing bool true for 200 samples
    gearing_bool(i:i+200) = 1;

% REDLINE
%elseif(rpm(i)>rpm_redline && current_gear(i-1)==gear_max)
else
    % If the gear is already 6 (max) reset rpm to 6000
    rpm(i) = 6000;
    deactivate_throttle = true;
    current_gear(i) = current_gear(i-1);
    gearRatio = gears(current_gear(i));
end