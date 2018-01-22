var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init(){
	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
	camera.position.z = 1500;

	//Scene
	scene = new THREE.Scene();

	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
	scene.add(camera);

	// Load texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	var textureLoader = new THREE.TextureLoader( manager );
	var texture = textureLoader.load( 'objects/2007_Chevy_Avalanche.jpg' );

	// Load model
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};

	var loader = new THREE.OBJLoader( manager );
	loader.load( 'objects/2007chevyavalanche.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = texture;
			}
		} );
		scene.add( object );
	}, onProgress, onError );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}
function render(){
	camera.lookAt( scene.position );
	camera.position.x += 1;
	camera.position.z -= 1;
	renderer.render(scene,camera);
}