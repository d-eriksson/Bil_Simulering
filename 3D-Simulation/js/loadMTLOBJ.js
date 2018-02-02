function loadMTLOBJ( basepath, mtlname, objname, x, y, z, group, scale, rotX){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(basepath);
	mtlLoader.load(mtlname, function(materials){
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.load(basepath +objname, function(object){
			object.rotateX(rotX);
			object.position.set(x,y,z);
			object.scale.set(scale,scale,scale);
			group.add(object);
		}, function(success){}, function(err){});
	});
}