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

	var container = document.createElement('div');
	var Vkmhc = document.getElementById('Vkmh');
	var timec = document.getElementById('time');
	var RPMc = document.getElementById('RPM');
	var Accelerationc = document.getElementById('Acceleration');
	var Gearc = document.getElementById('Gear');
	var Throttlec = document.getElementById('Throttle');

var carMass, wheelRadius, airDensity, dragCoefficient, dragArea, netDragCoefficient, rollingResistance, differentialRatio;
var transmissionEfficiency, gear,gearRatio,throttle,velocity, cutOffThrottle;

init();
animate();


function init(){


	document.body.appendChild(container);
	//Scene
	scene = new THREE.Scene();
	car = new THREE.Group();
	carVariables();
	createWorld();
	camerarig();
	loadMTLOBJ('objects/c7/','c7.mtl','c7.obj',0 ,0 ,0,car, 0.053488095);
	lights();
	scene.add(car);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight-5 );
	container.appendChild( renderer.domElement );
}
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render(){
	
	prevTime = time;
	time = time + clock.getDelta();
	deltatime = time - prevTime 
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
}


function loadMTLOBJ( basepath, mtlname, objname, x, y, z, group, scale){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(basepath);
	mtlLoader.load(mtlname, function(materials){
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.load(basepath +objname, function(object){
			object.rotateX(-Math.PI/2);
			object.position.set(x,y,z);
			object.scale.set(scale,scale,scale);
			group.add(object);
		}, function(success){console.log(success)}, function(err){console.log(err)});
	});
}
function lights(){
	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	scene.add( ambientLight );

	light = new THREE.PointLight( 0xffffff, 0.4, 100 );
	light.position.set( 0, 20, 10 );
	car.add( light );

	light2 = new THREE.PointLight( 0xff0000, 0.2, 100 );
	light2.position.set( 0, 40, 10 );
	car.add( light2 );

}
function camerarig(){
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.001, 4000 );
	camera.position.x = -0.34;
	camera.position.y = 0.95;
	camera.position.z = 0.6;
	camera.rotateY(-1*Math.PI/32);

	camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000 );
	camera2.position.x = 0;
	camera2.position.y = 1.2;
	camera2.position.z = 7.2;

	camera3 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000 );
	camera3.position.x = 0;
	camera3.position.y = 1.2;
	camera3.position.z = -7.2;
	camera3.rotateY(Math.PI);

	camera4 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000 );
	camera4.position.x = -1.2;
	camera4.position.y = 0.3;
	camera4.position.z = 1.2;

	camera5 = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 0.001, 4000 );
	camera5.position.x = 0;
	camera5.position.y = 1000;
	camera5.position.z = 0;
	camera5.rotateX(-Math.PI/2);


	car.add(camera);
	car.add(camera2);
	car.add(camera3);
	car.add(camera4);
	car.add(camera5);
}
function createWorld(){

	var geometry_ground = new THREE.PlaneGeometry( 4000, 4000, 8 );
	var material_ground = new THREE.MeshPhongMaterial( { color: 0xdddddd, side: THREE.DoubleSide});
	var ground = new THREE.Mesh( geometry_ground, material_ground );
	ground.position.y = -1;
	ground.rotateX(Math.PI/2);
	scene.add( ground );

	k = 0;
	while (k < 200){
		var geometry_box = new THREE.BoxGeometry( 1, 1, 1 );
		var material_box = new THREE.MeshPhongMaterial( { color: 0xff0000, side: THREE.DoubleSide});
		var box = new THREE.Mesh( geometry_box, material_box );
		box.position.x = 2;
		box.position.z = -10*k;
		box.position.y = 0.5;

		scene.add( box );
		var box2 = new THREE.Mesh( geometry_box, material_box );
		box2.position.x = -2;
		box2.position.z = -10*k;
		box2.position.y = 0.5;
		scene.add(box2);
		k++;
	}

}
document.addEventListener('keydown', function(e) { 
    if(e.keyCode == 87 && cutOffThrottle == false){
    	throttle = 1.0;
    }
    else{
    	throttle = 0.0;
    }
    if(e.keyCode == 38){
    	gearUp();
    }
    if(e.keyCode == 40){
    	gearDown();
    }

    
});
document.addEventListener('keyup', function(e) { 
    if(e.keyCode == 87){
    	throttle = 0.0;
    }
    if(e.keyCode == 32){
        ChooseCamera++;
        if(ChooseCamera > 4){
        	ChooseCamera = 0;
        }
    }
});
document.addEventListener( 'wheel', onDocumentMouseWheel, false );
function onDocumentMouseWheel(e){
	throttle += e.deltaY*(-1) *0.001;
	if(throttle >= 1.0){
		throttle = 1.0;
	}
	else if(throttle < 0.0){
		throttle = 0.0;
	}

}

// Car modeling
// Set variables
function carSpecificVariables(){
	carMass = 1600;
	wheelRadius = 0.34;
	dragCoefficient = 0.3;
	dragArea = 2.2;
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
