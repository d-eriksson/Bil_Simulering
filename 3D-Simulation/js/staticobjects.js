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
		box.position.z = -10*k -5;
		box.position.y = 0.5;

		scene.add( box );
		var box2 = new THREE.Mesh( geometry_box, material_box );
		box2.position.x = -2;
		box2.position.z = -10*k -5;
		box2.position.y = 0.5;
		scene.add(box2);
		k++;
	}
	i = 0;
	while( i < 200){
		var geometry_ground = new THREE.PlaneGeometry( 4, 10, 8 );

		if(i%2){
			c = 0xff0000;
		}
		else{
			c = 0xffffff;
		}
		var material_ground = new THREE.MeshPhongMaterial( { color: c, side: THREE.DoubleSide});
		var ground = new THREE.Mesh( geometry_ground, material_ground );
		ground.position.y = 0;
		ground.position.z = -10*i;
		ground.rotateX(Math.PI/2);
		scene.add( ground );
		i++;
	}

}