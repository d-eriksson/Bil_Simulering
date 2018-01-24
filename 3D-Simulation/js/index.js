var container;
var camera,camera2, car, scene, renderer;
var controls;
var light, light2;
var mouse = {x: 0, y: 0};
var mouseAcceleration = {x: 0, y: 0};
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var ChooseCamera = 0;


init();
animate();


function init(){
	container = document.createElement('div');
	document.body.appendChild(container);
	//Scene
	scene = new THREE.Scene();
	car = new THREE.Group();

	createWorld();
	camerarig();
	loadMTLOBJ('objects/c7/','c7.mtl','c7.obj',0 ,0 ,0,car);
	lights();
	
	scene.add(car);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
}
function loadMTLOBJ( basepath, mtlname, objname, x, y, z, group){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(basepath);
	mtlLoader.load(mtlname, function(materials){
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.load(basepath +objname, function(object){
			object.rotateX(-Math.PI/2);
			object.position.set(x,y,z);
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
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 4000 );
	camera.position.x = -7;
	camera.position.y = 20;
	camera.position.z = 8;
	camera.rotateY(-1*Math.PI/32);

	camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
	camera2.position.x = 0;
	camera2.position.y = 20;
	camera2.position.z = 120;

	camera3 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
	camera3.position.x = 0;
	camera3.position.y = 20;
	camera3.position.z = -120;
	camera3.rotateY(Math.PI);

	camera4 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
	camera4.position.x = -20;
	camera4.position.y = 5;
	camera4.position.z = 20;

	camera5 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 4000 );
	camera5.position.x = 0;
	camera5.position.y = 1000;
	camera5.position.z = -500;
	camera5.rotateX(-Math.PI/2);


	car.add(camera);
	car.add(camera2);
	car.add(camera3);
	car.add(camera4);
	scene.add(camera5);
}
function createWorld(){

	var geometry_ground = new THREE.PlaneGeometry( 4000, 4000, 8 );
	var material_ground = new THREE.MeshPhongMaterial( { color: 0xdddddd, side: THREE.DoubleSide})
	var ground = new THREE.Mesh( geometry_ground, material_ground );
	ground.rotateX(Math.PI/2);
	scene.add( ground );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}
function render(){
	car.position.z -= 1;
	
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
 document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        ChooseCamera++;
        if(ChooseCamera > 4){
        	ChooseCamera = 0;
        }
    }
}