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
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.001, 400000 );
	camera.position.x = -0.34;
	camera.position.y = 0.95;
	camera.position.z = 0.6;
	camera.rotateY(-1*Math.PI/32);

	camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000000 );
	camera2.position.x = 0;
	camera2.position.y = 1.2;
	camera2.position.z = 7.2;

	camera3 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000000 );
	camera3.position.x = 0;
	camera3.position.y = 1.2;
	camera3.position.z = -7.2;
	camera3.rotateY(Math.PI);

	camera4 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000000 );
	camera4.position.x = -1.2;
	camera4.position.y = 0.3;
	camera4.position.z = 1.2;

	camera5 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.001, 4000000 );
	camera5.position.x = 0;
	camera5.position.y = 15;
	camera5.position.z = 0;
	camera5.rotateX(-Math.PI/2);


	car.add(camera);
	car.add(camera2);
	car.add(camera3);
	car.add(camera4);
	car.add(camera5);
}