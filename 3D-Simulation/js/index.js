var container,GUI;
var camera,camera2, car, scene, renderer;
var controls;
var light, light2;
var mouse = {x: 0, y: 0};
var mouseAcceleration = {x: 0, y: 0};
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var ChooseCamera = 0;
var clock = new THREE.Clock();
var time = 0.0;
var allowRender = false;
var WIDTH, HEIGHT;

var container = document.createElement('div');
var Vkmhc = document.getElementById('Vkmh');
var timec = document.getElementById('time');
var RPMc = document.getElementById('RPM');
var Accelerationc = document.getElementById('Acceleration');
var Gearc = document.getElementById('Gear');
var Throttlec = document.getElementById('Throttle');
var rollingResistancec = document.getElementById('rollingResistance');
var airresistancec = document.getElementById('airresistance');

var carMass, wheelRadius, airDensity, dragCoefficient, dragArea, netDragCoefficient, rollingResistance, differentialRatio;
var transmissionEfficiency, gear,gearRatio,throttle, breaks,velocity, cutOffThrottle;

init();
animate();



function init(){
	WIDTH = window.innerWidth;
  	HEIGHT = window.innerHeight-5;

	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({ antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH,HEIGHT );
	renderer.shadowMap.enabled;
  	renderer.shadowMapSoft = true;
  	//renderer.autoClear = false;
	container.appendChild( renderer.domElement );


	//Scene
	scene = new THREE.Scene();
	scene.castShadow = true;
  	scene.receiveShadow = true;
  	// scene.fog = new THREE.Fog(0x000000, 0.1, 1000);
	car = new THREE.Group();

	carVariables();
	createWorld();
	camerarig();
	loadMTLOBJ('objects/c7/','c7.mtl','c7.obj',0 ,0 ,0,car, 0.053488095, -Math.PI/2);
	lights();
	initPostProcessing();
	scene.add(car);

	initSky();
}
function animate() {
	renderer.clear();
	requestAnimationFrame( animate );
	render();
}
function render(){
	
	prevTime = time;
	time = time + clock.getDelta();
	deltatime = time - prevTime;
	velocity = Velocity(deltatime);
	car.position.z = car.position.z - velocity*deltatime;

	Gearc.innerHTML = "gear: " + gear;
	Vkmhc.innerHTML = "km/h: " + velocity*3.6;
	timec.innerHTML = "time: " + time;
	Throttlec.innerHTML = "Throttle: " + throttle;
	
	if(ChooseCamera == 0){	
		renderer.render(scene,camera);
	}
	else if(ChooseCamera == 1){
		renderer.render(scene,camera2);
	}
	else if(ChooseCamera == 2){
		renderer.render(scene,camera3);
	}
	else if(ChooseCamera == 3){
		renderer.render(scene,camera4);
	}
	else if(ChooseCamera == 4){
		renderer.render(scene,camera5);
	}
	else if(ChooseCamera == 5){
		postprocessing.composer.render( 5 );
	}
}