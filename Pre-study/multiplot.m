function [] = multiplot(samples, velocity, acceleration, wheel_velocity, rpm, current_gear, slip_ratio, Force_traction, Force_drag, Force_net, drive_torque)
% Show figures
figure
subplot(2, 5, 1)
plot(velocity(1, 1:samples-1)*3.6)
xlabel('Time (ms)')
ylabel('Velocity (km/h)')

subplot(2, 5, 4)
plot(acceleration(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Acceleration (m/s^2)')

subplot(2, 5, 2)
plot(wheel_velocity(:, 1:samples-1)*3.6)
xlabel('Time (ms)')
ylabel('Wheel velocity (km/h)')

subplot(2, 5, 5)
plot(rpm(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('RPM')

subplot(2, 5, 6)
plot(current_gear(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Gear')

subplot(2, 5, 3)
plot(slip_ratio(:, 1:samples-1)*100)
xlabel('Time (ms)')
ylabel('Slip ratio (%)')
axis([0 samples -50 50])

subplot(2, 5, 7)
plot(Force_traction(:, 1:samples-1))
xlabel('Time (ms)')
ylabel('Traction Force (Nm)')

subplot(2, 5, 8)
plot(Force_drag(:, 1:samples-1))
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
end