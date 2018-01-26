// Car modeling
// Set variables
function carSpecificVariables(){
	carMass = 1600;
	wheelRadius = 0.34;
	dragCoefficient = 0.3;
	dragArea = 1.9;
	netDragCoefficient = 0.5*dragCoefficient*dragArea*airDensity;
	rollingResistance = 30* netDragCoefficient;
	differentialRatio = 3.42;
	transmissionEfficiency = 0.7;
	gear = 1;
	gearRatio = [0,2.66,1.78,1.3,1,0.74,0.5];
	throttle = 0;
	velocity = 0.0;
	cutOffThrottle = false;

}
function worldSpecificVariables(){
	airDensity =1.29;
}
function carVariables(){
	worldSpecificVariables();
	carSpecificVariables();
	
}

// Torque curve
function engineTorque(RPM){

	return (560)-(0.000025*Math.pow(Math.abs(4400-RPM),2))+(0.000000004*Math.pow(Math.abs(4400-RPM),3)) - (0.02*RPM);
}
function Torque(){
	return throttle*engineTorque(calculateRPM())*differentialRatio*gearRatio[gear]*transmissionEfficiency;
}

// RPM calculation
function calculateRPM(){

	RPM = Math.round((velocity/wheelRadius)*gearRatio[gear]*differentialRatio*60/(2*Math.PI));
	
	if(RPM < 1000){
		gearDown();
		RPM = 1000;
		cutOffThrottle = false;
	}
	else if( RPM > 6000){
		gearUp();
		RPM = 6000;
		cutOffThrottle = true;
	}
	else{
		cutOffThrottle = false;
	}
	RPMc.innerHTML = "RPM: " + RPM;
	return RPM;

}
function Acceleration(){
	 a = ((Torque()/wheelRadius)-(dragCoefficient*Math.pow(velocity,2))-(rollingResistance*velocity))/(carMass*wheelRadius);
	 Accelerationc.innerHTML = "Acceleration (m/s^2): " + a;
	 rollingResistancec.innerHTML = "rollingResistance: " + (rollingResistance*velocity);
	 airresistancec.innerHTML = "airresistance: " + (dragCoefficient*Math.pow(velocity,2));
	 return a;
}
function Velocity(deltaTime){
	return velocity + Acceleration() * deltaTime;
}
// Change Gear
function changeGear(i){
	gear = i;
}
function gearUp(){
	if(gear <6 && gear >= 1){
		changeGear(gear +1);
	}
}
function gearDown(){
	if(gear <=6 && gear > 1){
		changeGear(gear -1);
	}
}
