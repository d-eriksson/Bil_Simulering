var airDensity = 1.29;
var gravity = 9.81;
var Vkmhc = document.getElementById('Vkmh');
var timec = document.getElementById('time');
var RPMc = document.getElementById('RPM');
var Accelerationc = document.getElementById('Acceleration');
var Gearc = document.getElementById('Gear');
var Throttlec = document.getElementById('Throttle');
var breakingc = document.getElementById('breaking');
var EngineTorquec = document.getElementById('EngineTorque');
var DriveTorquec = document.getElementById('DriveTorque');
var RollingTorquec = document.getElementById('RollingTorque');
var TractionTorquec = document.getElementById('TractionTorque');
var BrakingTorquec = document.getElementById('BrakingTorque');
var EngineBrakeTorquec = document.getElementById('EngineBrakeTorque');
var AngularAccelerationc = document.getElementById('AngularAcceleration');
var AngularVelocityc = document.getElementById('AngularVelocity');
var WheelVelocityc = document.getElementById('WheelVelocity');
var SlipRatioc = document.getElementById('SlipRatio');
var ForceMultiplierc = document.getElementById('ForceMultiplier');
var ForceTractionc = document.getElementById('ForceTraction');
var ForceDragc = document.getElementById('ForceDrag');
var ForceNetc = document.getElementById('ForceNet');
var NormalForcec = document.getElementById('NormalForce');

class Car{
	constructor(GROUP, PARENT ,CARMASS, WHEELRADIUS, MASSBACKAXIS, DRAGCOEFFICIENT, DRAGAREA, DIFFERENTIALRATIO, TRANSMISSIONEFFICIENCY,COGHEIGHT, WHEELBASE, AUTOMATIC){

		this.carGroup = GROUP;
		this.carParent = PARENT;

		//Car mass variables
		this.carMass = CARMASS;
		this.normalForceFront = 0.51*this.carMass*9.81;
		this.normalForceBack = 0.49*this.carMass*9.81;
		this.wheelRadius = WHEELRADIUS;
		this.wheelBase = WHEELBASE;
		this.carLength = 4.564;
		this.carWidth = 1.869;
		this.carInertia =1/12*this.carMass*(Math.pow(this.carLength,2) + Math.pow(this.carWidth,2));

		// Back wheels inertia
		this.massBackAxis = MASSBACKAXIS;
		this.inertia = this.massBackAxis * Math.pow(this.wheelRadius,2)*0.5;
		this.CoGHeight = COGHEIGHT;

		// Drag calculations
		this.dragCoefficient = DRAGCOEFFICIENT;
		this.dragArea = DRAGAREA;
		this.netDragCoefficient = 0.5*this.dragCoefficient*this.dragArea*airDensity;


		// Transmission
		this.differentialRatio = DIFFERENTIALRATIO;
		this.transmissionEfficiency = TRANSMISSIONEFFICIENCY;
		this.gearRatio = [0,2.66,1.78,1.3,1,0.74,0.5];
		this.gear = 1;


		// Torques
		this.engineTorque = 0;
		this.driveTorque = 0;
		this.rollingTorque = 0;
		this.tractionTorque = 0;
		this.brakingTorque = 0;
		this.engineBrakeTorque = 0;


		// Wheel velocity and acceleration
		this.angularVelocity = 0.0;
		this.angularAcceleration = 0.0;
		this.wheelVelocity = 0.0;


		// Forces
		this.forceMultiplier = 0.0;
		this.forceTraction = 0.0;
		this.forceDrag = 0.0;
		this.forceNet = 0.0;

		//turning
		this.delta = 0.0;
		this.omega = 0.0;
		this.omegaAcc = 0.0;
		this.slipAngleFront = 0.0;
		this.sideSlipAngle = 0.0;
		this.slipAngleRear = 0.0;
		this.angleMultiplierRear = 0.0;
		this.angleMultiplierFront= 0.0;

		//misc
		this.throttle = 0.0;
		this.velocity = new THREE.Vector3(0,0,0);
		this.acceleration = new THREE.Vector3(0,0,0);
		this.rollingResistance = 30* this.netDragCoefficient;
		this.brakeLevel = 0.0;
		this.automatic = AUTOMATIC;
		this.RPM = 0;
		this.slipRatio = 0.0;
		this.turnLeft = false;
		this.turnRight = false;
	}
	update(dT){ // Updates all variables including the cars position.

		if(this.velocity.z < 1){
			this.kineticUpdate(dT);
		}
		else{
			this.dynamicUpdate(dT);
		}

	}
	kineticUpdate(dT){
		if(this.throttle > 0){
		this.acceleration.z = 5;
		// ------ Calculate car Velocity ------
		this.velocity.z = this.velocity.z + this.acceleration.z*dT;
		// ------ Calculate car Position ------
		this.carGroup.position.z = this.carGroup.position.z - this.velocity.z*dT;
		}
		else if(this.brakeLevel > 0){
			if(this.velocity.z >0){
			this.acceleration.z = -5;
			// ------ Calculate car Velocity ------
			this.velocity.z = this.velocity.z + this.acceleration.z*dT;
			// ------ Calculate car Position ------
			this.carGroup.position.z = this.carGroup.position.z - this.velocity.z*dT;
			}
		}
		else{
			if(this.velocity.z >0){
			this.acceleration.z = -1;
			// ------ Calculate car Velocity ------
			this.velocity.z = this.velocity.z + this.acceleration.z*dT;
			// ------ Calculate car Position ------
			this.carGroup.position.z = this.carGroup.position.z - this.velocity.z*dT;
			}
		}
		this.reset();
	}
	dynamicUpdate(dT){

		this.carParent.position.x = this.carGroup.position.x;
		this.carParent.position.y = this.carGroup.position.y;
		this.carParent.position.z = this.carGroup.position.z;

		// ------ Calculate RPM and clamp the values between 1000-6000 ------
		this.RPM = Math.round(this.angularVelocity*this.gearRatio[this.gear]* this.differentialRatio *60/(2*Math.PI));
		if(this.RPM < 1000){
			if(this.automatic){
				this.gearDown();
			}
			this.clutchLevel = 0.5 + 0.5* this.RPM/2000; // Clutch level between 0.5 and 1.0 when RPM < 1000
			this.RPM = 1000;
		}
		else if(this.RPM < 3500 && this.gear > 3){
			if(this.automatic){
				this.gearDown();
			}
		}
		else if( this.RPM > 6000){
			if(this.automatic){
				this.gearUp();
			}
			this.RPM = 6000;
			//this.throttle = 0; // The throttle is no longer usable the car will stall and not accelerate.
		}
		RPMc.innerHTML = "" + this.RPM;
		// ------ Calculate Engine Torque ------
		// Engine torque from a lookup table the algorithm below is an approximation of that lookup table.
		this.engineTorque = (560)-(0.000025*Math.pow(Math.abs(4400-this.RPM),2))+(0.000000004*Math.pow(Math.abs(4400-this.RPM),3)) - (0.02*this.RPM);

		EngineTorquec.innerHTML = "" + Math.round(this.engineTorque);
		// ------ Calculate Drive Torque ------
		this.driveTorque =  this.throttle * this.engineTorque * this.gearRatio[this.gear] * this.differentialRatio * this.transmissionEfficiency;
		DriveTorquec.innerHTML = "" + Math.round(this.driveTorque);
		// ------ Calculatie Rolling Torque ------
		this.rollingTorque = 0.414938 * 0.00019 * this.velocity.z * this.carMass * gravity * this.wheelRadius;
		RollingTorquec.innerHTML = "" + Math.round(this.rollingTorque);
		// ------ Calculate Traction Torque ------
		this.tractionTorque = this.forceTraction * this.wheelRadius;
		TractionTorquec.innerHTML = "" + Math.round(this.tractionTorque);

		// ------ Calculate Braking Torque ------
		if(Math.abs(this.angularVelocity) > 5 ){
			this.brakingTorque = (Math.sign(this.angularVelocity)) * 6000 * this.brakeLevel;
		}
		else{
			this.brakingTorque = this.angularVelocity*1200*this.brakeLevel;
		}
		BrakingTorquec.innerHTML = "" + Math.round(this.brakingTorque);
		// ------ Calculate Enginebrake Torque ------

		this.engineBrakeTorque = 0.02 * this.RPM * (1-this.throttle);
		



		EngineBrakeTorquec.innerHTML = "" + Math.round(this.engineBrakeTorque);
		// ------ Calculate the AngulatAcceleration ------
		// the torque sum divided by the inertia.
		this.angularAcceleration = (this.driveTorque - this.tractionTorque - this.rollingTorque - this.brakingTorque )/this.inertia;
		AngularAccelerationc.innerHTML = "" + Math.round(this.angularAcceleration);
		// ------ Calculate the Angular Veclocity ------

		this.angularVelocity = this.angularVelocity + this.angularAcceleration*dT;
		AngularVelocityc.innerHTML = "" + Math.round(this.angularVelocity);
		// ------ Calculate the Wheels velocity ------
		this.wheelVelocity = this.angularVelocity * this.wheelRadius;
		WheelVelocityc.innerHTML = "" + Math.round(this.wheelVelocity*3.6);

		// ------ Slipratio ------

		this.slipRatio = (this.wheelVelocity-this.velocity.z)/Math.abs(this.velocity.z);

		SlipRatioc.innerHTML = "" + this.slipRatio;
		if(Math.abs(this.slipRatio) > 0.6){
			bromsc.style.backgroundColor ="red";
		}
		else{
			bromsc.style.backgroundColor="black";
		}

		// ------ Calculate Force multiplier -------
		if (this.slipRatio > 0){
			if(this.slipRatio <= 0.06){
				this.forceMultiplier = 1 - 16.67*Math.abs(0.06 - this.slipRatio);
			}
			else{
				this.forceMultiplier = 0.5+0.5*0.06/this.slipRatio;
			}
		}
		else{
			if(this.slipRatio >= -0.06){
				this.forceMultiplier = -1+16.67*Math.abs(0.06+this.slipRatio);
			}
			else{
				this.forceMultiplier = -0.5+0.5*0.06/this.slipRatio;
			}
		}
		ForceMultiplierc.innerHTML = "" + this.forceMultiplier;

		// ------ Steering ------
		this.evaluteSteeringDelta(dT);
		this.sideSlipAngle = Math.atan(this.velocity.x/this.velocity.z);
		this.slipAngleFront = (180/Math.PI)*(Math.atan((this.velocity.x + this.omega*(this.wheelBase/2))/ Math.abs(this.velocity.z))+this.delta*Math.sign(this.velocity.z));
		this.slipAngleRear =  (180/Math.PI)*(Math.atan((this.velocity.x - this.omega*(this.wheelBase/2))/ Math.abs(this.velocity.z)));
		//console.log("sideSlipAngle: " + this.sideSlipAngle + "slipAngleFront: " + this.slipAngleFront + "slipAngleRear: " + this.slipAngleRear)
		console.log("slipAngleFront: " + this.slipAngleFront+ " slipAngleRear: " + this.slipAngleRear);
		
		if(this.slipAngleFront  >= 0.0 && this.slipAngleFront <= 3.0){
			this.angleMultiplierFront = 1 - Math.abs(1-this.slipAngleFront/3.0);
		}
		else if(this.slipAngleFront > 3.0){
			this.angleMultiplierFront = 0.7+0.3*3.0/this.slipAngleFront;
		}
		else if(this.slipAngleFront <= 0.0 && this.slipAngleFront >= -3.0){
			this.angleMultiplierFront = -1 + Math.abs(1+this.slipAngleFront/3.0);
		}
		else if(this.slipAngleFront < -3.0){
			this.angleMultiplierFront = -0.7+0.3*3.0/this.slipAngleFront;
		}


		if(this.slipAngleRear >= 0.0 && this.slipAngleRear <= 3.0){
			this.angleMultiplierRear = 1 - Math.abs(1-this.slipAngleRear/3.0);
		}
		else if(this.slipAngleRear > 3.0){
			this.angleMultiplierRear = 0.7+0.3*3.0/this.slipAngleRear;
		}
		else if(this.slipAngleRear <= 0.0 && this.slipAngleRear >= -3.0){
			this.angleMultiplierRear = -1 + Math.abs(1+this.slipAngleRear/3.0);
		}
		else if(this.slipAngleRear < -3.0){
			this.angleMultiplierRear = -0.7+0.3*3.0/this.slipAngleRear;
		}

		this.FlatFront = this.angleMultiplierFront * this.normalForceFront;
		this.FlatRear = this.angleMultiplierRear * this.normalForceBack;
		this.corneringForce = this.FlatRear + Math.cos(this.delta)* this.FlatFront;
		this.omega = this.FlatFront * (this.wheelBase/2)/this.carInertia - this.FlatRear * (this.wheelBase/2)/this.carInertia;
		//this.omega = this.omega + this.omegaAcc*dT;
		

		// ------ Calculate Force Traction ------
		this.forceTraction = this.forceMultiplier * this.normalForceBack;
		ForceTractionc.innerHTML = "" + Math.round(this.forceTraction);

		// ------ Calculate Force Drag ------
		this.forceDrag = this.netDragCoefficient* Math.pow(this.velocity.z,2);
		ForceDragc.innerHTML = "" + Math.round(this.forceDrag);
		// ------ Calculate Force Net ------
		this.forceNet = this.forceTraction - this.forceDrag;
		ForceNetc.innerHTML = "" + Math.round(this.forceNet);



		// ------ Calculate car Acceleration ------
		this.acceleration.z = this.forceNet/(this.carMass*this.wheelRadius);
		this.acceleration.x = this.corneringForce / this.carMass;
		Accelerationc.innerHTML = "" + Math.round(this.acceleration.z*3.6) + "  km/h";
		// ------ Calculate car Velocity ------
		this.velocity.z = this.velocity.z + this.acceleration.z*dT;
		this.velocity.x = this.velocity.x + this.acceleration.x*dT;
		Vkmhc.innerHTML = "" + Math.round(this.velocity.z*3.6) + "  km/h";
		// ------ Calculate car Position ------
		this.normalForceBack = 0.49*this.carMass*9.81 + (this.CoGHeight/this.wheelBase) * this.carMass * this.acceleration.z;
		this.normalForceFront = this.carMass*9.81 - this.normalForceBack;
		NormalForcec.innerHTML = "" + Math.round(this.normalForceBack);
		//this.carGroup.position.z = this.carGroup.position.z - this.velocity.z*dT;
		this.carGroup.translateZ(-this.velocity.z*dT);
		this.carGroup.translateX(this.velocity.x*dT);
		this.carGroup.rotateY(this.omega*dT);
		


		Throttlec.innerHTML = "" + this.throttle;
		breakingc.innerHTML = "" + this.brakeLevel;


	}
	reset(){
					// Torques
		this.engineTorque = 0;
		this.driveTorque = 0;
		this.rollingTorque = 0;
		this.tractionTorque = 0;
		this.brakingTorque = 0;
		this.engineBrakeTorque = 0;


		// Wheel velocity and acceleration
		this.angularVelocity = 0.0;
		this.angularAcceleration = 0.0;
		this.wheelVelocity = 0.0;


		// Forces
		this.forceMultiplier = 0.0;
		this.forceTraction = 0.0;
		this.forceDrag = 0.0;
		this.forceNet = 0.0;
		this.omegaAcc = 0.0;
		this.omega = 0.0;


	}
	// Change Gear
	changeGear(i){
		this.gear = i;
		Gearc.innerHTML = "Gear: " + this.gear;
	}
	gearUp(){
		if(this.gear <6 && this.gear >= 1){
			this.changeGear(this.gear +1);
		}
	}
	gearDown(){
		if(this.gear <=6 && this.gear > 1){
			this.changeGear(this.gear -1);
		}
	}
	updateThrottle(t){
		this.throttle = t;
	}
	updateBrakeLevel(b){
		this.brakeLevel = b;
	}
	evaluteSteeringDelta(dT){
		if(this.turnRight && !this.turnLeft){
			this.delta -= Math.PI/16 * dT;
			if(this.delta < -Math.PI/32){
				this.delta = -Math.PI/32;
			}

		}
		else if(this.turnLeft && !this.turnRight){
			this.delta += Math.PI/16 * dT;
			if(this.delta > Math.PI/32){
				this.delta = Math.PI/32;
			}
		}
		else if(!this.turnLeft && !this.turnRight){
			if(this.delta < -0.1){
				this.delta += Math.PI/8*dT;
			}
			else if(this.delta > 0.1){
				this.delta -= Math.PI/8*dT;
			}
			else{
				this.delta = 0;
			}
		}
	}
}
