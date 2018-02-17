using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DriveCar : MonoBehaviour {
	//Car mass variables
	public int carMass;
	private float normalForceFront;
	private float normalForceBack;
	public float wheelRadius;
	public float wheelBase;
	// Back wheels inertia
	public int massBackAxis;
	private float inertiaWheels;
	public float CoGHeight;
	// Drag calculations
	public float dragCoefficient;
	public float dragArea;
	public float airDensity;
	private float netDragCoefficient;
	// Transmission
	public float differentialRatio;
	public float transmissonEffecieny;
	public float[] gearRatio;
	private int gear;
	// Torques
	private float engineTorque = 0;
	private float driveTorque = 0;
	private float rollingTorque = 0;
	private float tractionTorque = 0;
	private float brakingTorque = 0;
	private float engineBrakeTorque = 0;


	// Wheel velocity and acceleration
	private float angularVelocity = 0.0f;
	private float angularAcceleration = 0.0f;
	private float wheelVelocity = 0.0f;


	// Forces 
	private float forceMultiplier = 0.0f;
	private float forceTraction = 0.0f;
	private float forceDrag = 0.0f;
	private float forceNet = 0.0f;

	//turning
	private float delta = 0.0f;

	//misc
	private float throttle = 1.0f;
	private Vector3 velocity = new Vector3(0,0,0);
	private Vector3 acceleration = new Vector3(0,0,0);
	private float rollingResistance;
	private float brakeLevel = 0.0f;
	public bool automatic;
	private float RPM;
	private float slipRatio = 0.0f;
	private bool turnLeft = false;
	private bool turnRight = false;
	private float gravity = 9.81f;
	// Use this for initialization
	void Start () {
		inertiaWheels = massBackAxis * Mathf.Pow(wheelRadius,2)*0.5f;
		netDragCoefficient = 0.5f * dragCoefficient * dragArea * airDensity;
		normalForceFront = 0.51f*carMass*gravity;
		normalForceBack = 0.49f*carMass*gravity;
		rollingResistance = 30* netDragCoefficient;
		gear = 1;

	}
	
	// Update is called once per frame
	void Update () {

		// Calculate RPM
		RPM = Mathf.Round(angularVelocity * gearRatio[gear-1]* differentialRatio * 60 / (2 * Mathf.PI));
		if (RPM < 1000) {
			RPM = 1000;
			gearDown ();
		} 
		else if (RPM > 6000) {
			RPM = 6000;
			gearUp ();
		}

		// Calculate Torque
		engineTorque = (560)-(0.000025f*Mathf.Pow(Mathf.Abs(4400-RPM),2))+(0.000000004f*Mathf.Pow(Mathf.Abs(4400-RPM),3)) - (0.02f*RPM);
		driveTorque = throttle * engineTorque * gearRatio [gear-1] * differentialRatio * transmissonEffecieny;
		rollingTorque = 0.414938f * 0.00019f * wheelVelocity * carMass * gravity * wheelRadius;
		tractionTorque = forceTraction * wheelRadius;

		if (Mathf.Abs (angularVelocity) > 5) {
			brakingTorque = Mathf.Sign (angularVelocity) * 6000 * brakeLevel;

		} else {
			brakingTorque = angularVelocity * 1200 * brakeLevel;
		}

		engineBrakeTorque = 0.02f * RPM * (1-StepFunction(throttle));
		angularAcceleration = (driveTorque -tractionTorque -rollingTorque -brakingTorque -engineTorque)/inertiaWheels;
		angularVelocity += Mathf.Round (angularAcceleration);
		wheelVelocity = angularVelocity * wheelRadius;

		slipRatio = (wheelVelocity - velocity.x) / Mathf.Abs (velocity.x);

		if (Mathf.Abs (slipRatio) <= 0.06f) {
			forceMultiplier = Mathf.Sign (slipRatio) + Mathf.Sign (slipRatio) * (-16.67f) * Mathf.Abs (0.06f + Mathf.Sign (slipRatio) * (-slipRatio));
		} else {
			forceMultiplier = Mathf.Sign (slipRatio) * 0.5f + 0.5f * 0.06f / slipRatio;
		}

		forceTraction = forceMultiplier * normalForceBack;
		forceDrag = netDragCoefficient * Mathf.Pow (velocity.x, 2);
		forceNet = forceTraction - forceDrag;
		Vector3 temp = new Vector3 (forceNet / (carMass * wheelRadius), 0,0);
		acceleration = temp;
		velocity += acceleration * Time.deltaTime;
		normalForceBack = 0.49f*carMass*9.81f + (CoGHeight/wheelBase) * carMass * acceleration.x;
		transform.position += velocity*Time.deltaTime;
		Debug.Log (velocity*3.6f);

	}

	void gearDown(){
		if (gear > 1 && gear <= 6) {
			gear--;
		}
	}
	void gearUp(){
		if (gear >= 1 && gear < 6) {
			gear++;
		}
	}
	private int StepFunction(float a){
		if (a == 0) {
			return 0;
		} else {
			return 1;
		}

	}
}
