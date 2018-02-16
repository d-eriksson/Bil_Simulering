document.addEventListener('keydown', function(e) { 
    if(e.keyCode == 87){ // Key:w
    	c7.updateThrottle(1.0);
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
    if(e.keyCode == 65){// Key:A
        c7.turnLeft = true;
    }
    if(e.keyCode == 68){// Key:D
        c7.turnRight = true;
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
    if(e.keyCode == 65){// Key:A
        c7.turnLeft = false;
    }
    if(e.keyCode == 68){// Key:D
        c7.turnRight = false;
    }
});