document.addEventListener('keydown', function(e) { 
    if(e.keyCode == 87){ // Key:w
    	c7.updateThrottle(1.0);
    }
    else{
    	c7.updateThrottle(0.0);
    }
    if(e.keyCode == 83){// Key:s
        c7.updateBrakeLevel(1.0); 
    }
    if(e.keyCode == 38){// Key:upArrow
    	c7.gearUp();
    }
    if(e.keyCode == 40){// Key:downArrow
    	c7.gearDown();
    }
});
document.addEventListener('keyup', function(e) { 
    if(e.keyCode == 87){// Key:w
    	c7.updateThrottle(0.0);
    }
    if(e.keyCode == 83){// Key:s
        c7.updateBrakeLevel(0.0);
    }
    if(e.keyCode == 32){// Key:space
        ChooseCamera++;
        if(ChooseCamera > 5){
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
