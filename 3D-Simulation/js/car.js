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
	throttle = 0.0;
	breaks = 0.0;
	velocity = 0.0;
	angularvelocity = 0.0;
	cutOffThrottle = false;
	rollingResistance = 30* netDragCoefficient;
	forcetraction = 0;
	clutchLevel = 1.0;
	RPM = 0;

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

	velocity = velocity + Acceleration()*deltatime;
	/*if(velocity > 0.0005 || throttle > 0.0){
	}
	else{
		velocity = 0;
	}*/

	return velocity;

}
// Calculates acceleration based on torque
function Acceleration(){
	 a = forceNet()/(carMass*wheelRadius);
	 
	 Accelerationc.innerHTML = "Acceleration (kmh): " + a*3.6;
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
		slipRatio = 1;
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
	
	if(Math.abs(slipRatio) > 0.6){
		bromsc.style.backgroundColor = "red";
	}
	else{
		bromsc.style.backgroundColor = "black";
	}
	//console.log("velocity: " + velocity*3.6 + "SlipRatio: " + slipRatio*100);
	return FM;
}

function wheelVelocity(){
	WV = angularVelocity() * wheelRadius;
	if(Math.abs(WV) < 1.0){
		WV = 0;
	}
	wheelvelocityc.innerHTML = "Wheel Velocity: " + (WV*3.6);
	return WV;
}
function angularVelocity(){
	angularvelocity = angularvelocity + angularAcceleration()*deltatime;
	
	return angularvelocity;
}
function angularAcceleration(){

	TotTorque = driveTorque() - tractionTorque() - rollingTorque() - brakingTorque() - engineBrakingTorque();
	angAccel = TotTorque/inertia;
	if(angularvelocity + angAccel *deltatime < 0){
		TotTorque = -1*angularvelocity*inertia/deltatime;
	}
	angAccel = TotTorque/inertia;
	//console.log(TotTorque);
	return angAccel;
}
function brakingTorque(){
	if (angularvelocity > 5){
		return 6000*breaks;
	}
	else if(angularvelocity < -5){
		return -6000*breaks;
	}
	else{
		return angularvelocity*1200*breaks;
	}
}
function engineBrakingTorque(){
	if(throttle > 0.0){
		return 0.0;
	}
	else{
		return 0.02*calculateRPM();
	}
}
function driveTorque(){
	DT = clutchLevel*throttle*engineTorque(calculateRPM())*gearRatio[gear]*transmissionEfficiency;
	//console.log(DT);
	return DT;
}
function tractionTorque(){
	return forcetraction * wheelRadius;
}

function rollingTorque(){
	return 0.414938*0.00019*velocity*carMass*9.81*wheelRadius;
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
		if(automatic){
			gearDown();
		}
		clutchLevel = 0.5 + 0.5*RPM/2000;
		RPM = 1000;
		cutOffThrottle = false;
	}
	else if( RPM > 6000){
		if(automatic){
			gearUp();
		}
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