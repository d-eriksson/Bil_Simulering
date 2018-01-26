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
