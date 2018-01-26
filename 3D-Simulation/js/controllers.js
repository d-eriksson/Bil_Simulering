document.addEventListener('keydown', function(e) { 
    if(e.keyCode == 87 && cutOffThrottle == false){ // Key:w
    	throttle = 1.0;
    }
    else{
    	throttle = 0.0;
    }
    if(e.keyCode == 38){// Key:upArrow
    	gearUp();
    }
    if(e.keyCode == 40){// Key:downArrow
    	gearDown();
    }
    if(e.keyCode == 83){// Key:s
        breaks = 1.0;
    }

    
});
document.addEventListener('keyup', function(e) { 
    if(e.keyCode == 87){// Key:w
    	throttle = 0.0;
    }
    if(e.keyCode == 83){// Key:s
        breaks = 0.0;
    }
    if(e.keyCode == 32){// Key:space
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
