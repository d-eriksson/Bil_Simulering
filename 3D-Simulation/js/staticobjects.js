function createWorld(){
	var nCells = 512;
	var geometry = new THREE.PlaneGeometry(10000,10000,nCells,nCells);
	geometry.faces.forEach((face,idx)=>{
		if((idx + (Math.floor(idx/(nCells*2)) % 2 * 2)) % 4 < 2 ){
			face.color.setRGB(1,0,0);
		}
	})
	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
	var plane = new THREE.Mesh(geometry, material);
	plane.rotateX(-Math.PI/2);
	scene.add(plane);

	/*var geometry_ground = new THREE.PlaneGeometry( 4000, 4000, 8 );
	var material_ground = new THREE.MeshPhongMaterial( { color: 0xdddddd, side: THREE.DoubleSide});
	var ground = new THREE.Mesh( geometry_ground, material_ground );
	ground.position.y = -1;
	ground.rotateX(Math.PI/2);
	scene.add( ground );

	k = 0;
	while (k < 40){
		loadMTLOBJ('objects/sidewalk/','materials.mtl','model.obj',1, 2 ,-17.5*k,scene, 3, 0 );
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
	}*/
}