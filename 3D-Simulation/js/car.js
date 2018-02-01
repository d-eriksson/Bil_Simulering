// Car modeling
// Set variables
function carSpecificVariables(){
	//Car mass variables
	carMass = 1600;
	LoadRearWheels = 0.49*carMass*9.81;
	wheelRadius = 0.34;

	// Back wheels inertia
	massBackAxis = 200;
	inertia = massBackAxis * Math.pow(wheelRadius,2)*0.5;

	// Drag calculations
	dragCoefficient = 0.3;
	dragArea = 1.9;
	netDragCoefficient = 0.5*dragCoefficient*dragArea*airDensity;

	// Transmission
	differentialRatio = 3.42;
	transmissionEfficiency = 0.7;
	gearRatio = [0,2.66,1.78,1.3,1,0.74,0.5];
	gearRatio = gearRatio.map(function(x){return x * differentialRatio});
	gear = 1;

	//misc
	throttle = 0;
	velocity = 0.0;
	angularvelocity = 0.0;
	cutOffThrottle = false;
	rollingResistance = 30* netDragCoefficient;
	forcetraction = 0;
	clutchLevel = 1.0;

}
function worldSpecificVariables(){
	airDensity =1.29;

}
function carVariables(){
	worldSpecificVariables();
	carSpecificVariables();
	
	
}

// Calculates velocity based on acceleration
function Velocity(){
	return velocity + Acceleration() * deltatime;

}
// Calculates acceleration based on torque
function Acceleration(){
	 a = forceNet()/(carMass*wheelRadius);
	 
	 Accelerationc.innerHTML = "Acceleration (m/s^2): " + a;
	 rollingResistancec.innerHTML = "rollingResistance: " + (rollingResistance*velocity);
	 airresistancec.innerHTML = "airresistance: " + (dragCoefficient*Math.pow(velocity,2));
	 //console.log("2: " + a);
	 return a;
}
function forceNet(){
	forcetraction = forceTraction();
	//console.log("3: " + forcetraction);
	return forcetraction - forceDrag();
}
function forceDrag(){
	//console.log("4: " + netDragCoefficient*Math.pow(velocity,2));
	return netDragCoefficient*Math.pow(velocity,2);
}
function forceTraction(){
	return forceMultiplier() * LoadRearWheels;
}
function forceMultiplier(){

	var slipRatio;
	var FM;
	if (velocity == 0.0){
		slipRatio = 10000000000;
		if(throttle == 0.0){
			FM = 0;
			return FM;
		}
	}
	else{
		slipRatio =((wheelVelocity()-velocity)/Math.abs(velocity));
	}
	if( slipRatio > 0 ){
		if(slipRatio < 0.06){
			FM = 1-16.67*Math.abs(0.06-slipRatio);
		}
		else{
			FM = 0.5+0.5*0.06/slipRatio;
		}
	}
	else if(slipRatio <=0){
		if(slipRatio >= -0.06){
			FM = -1+16.67*Math.abs(0.06+slipRatio);
		}
		else{
			FM = -0.5+0.5*0.06/slipRatio;
		}
	}
	

	console.log(slipRatio*100);
	return FM;
}

function wheelVelocity(){
	return angularVelocity() * wheelRadius;
}
function angularVelocity(){
	angularvelocity = angularvelocity + angularAcceleration()*deltatime;
	return angularvelocity;
}
function angularAcceleration(){
	return totalTorque()/inertia;
}
function totalTorque(){
	return driveTorque() - tractionTorque() - rollingTorque();
}
function driveTorque(){
	return clutchLevel*throttle*engineTorque(calculateRPM())*gearRatio[gear]*transmissionEfficiency;
}
function tractionTorque(){
	return forcetraction * wheelRadius;
}

function rollingTorque(){

	var ABSDTTorque = Math.abs(driveTorque()-tractionTorque());
	var rollingTorque = Math.abs((0.414938*(0.01+0.00019*velocity))*carMass*9.81*wheelRadius);
	if(ABSDTTorque < rollingTorque){
		return ABSDTTorque;
	}
	else{
		return rollingTorque;
	}
}

// Torque curve
function engineTorque(RPM){
	
	return (560)-(0.000025*Math.pow(Math.abs(4400-RPM),2))+(0.000000004*Math.pow(Math.abs(4400-RPM),3)) - (0.02*RPM);
}
// RPM calculation
function calculateRPM(){

	//console.log(angularvelocity);
	RPM = Math.round((angularvelocity)*gearRatio[gear]*60/(2*Math.PI));
	if(RPM < 1000){
		gearDown();
		clutchLevel = 0.5 + 0.5*RPM/2000;
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