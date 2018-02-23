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


var bromsc = document.getElementById('broms');

var carMass, wheelRadius, airDensity, dragCoefficient, dragArea, netDragCoefficient, rollingResistance, differentialRatio;
var transmissionEfficiency, gear,gearRatio,throttle, breaks,velocity, cutOffThrottle, angularvelocity,RPM;
var automatic = true;

init();
animate();



function init(){
	WIDTH = window.innerWidth;
  	HEIGHT = window.innerHeight;

	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({ antialias: false } );
	//renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH,HEIGHT );
	renderer.shadowMap.enabled;
  	renderer.shadowMapSoft = true;
  	//renderer.autoClear = false;
	container.appendChild( renderer.domElement );
	renderer.domElement.style.display = "block";
	

	//Scene
	scene = new THREE.Scene();
	scene.castShadow = true;
  	scene.receiveShadow = true;
  	// scene.fog = new THREE.Fog(0x000000, 0.1, 1000);
	car = new THREE.Group();
	carParent = new THREE.Group();
	createWorld();
	camerarig();
	loadMTLOBJ('objects/c7/','c7.mtl','c7.obj',0 ,0 ,0,car, 0.053488095, -Math.PI/2);
	lights();
	initPostProcessing();
	c7 = new Car(car,carParent ,1600, 0.34, 200, 0.3, 1.9, 3.42, 0.7,0.381,2.654, true);
	carParent.add(car);
	scene.add(carParent);

	initSky();
	window.addEventListener( 'resize', onWindowResize, false );
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
	//if(time > 20){
		c7.update(deltatime);
	//}
	
	
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

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	camera2.aspect = window.innerWidth / window.innerHeight;
	camera2.updateProjectionMatrix();
	camera3.aspect = window.innerWidth / window.innerHeight;
	camera3.updateProjectionMatrix();
	camera4.aspect = window.innerWidth / window.innerHeight;
	camera4.updateProjectionMatrix();
	camera5.aspect = window.innerWidth / window.innerHeight;
	camera5.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}