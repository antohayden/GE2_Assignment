
/*
* Given a target, rotate gameObject towards target
* */

 GAME.Rotate = function(gameObject){

    var that = this;

    var rotationSpeed = 2;
    var desiredRotation = new THREE.Quaternion();
    var target;

    function setDesiredRotation(){

        var v1 = gameObject.look.clone();
        var v2 = target.clone();

        v2.sub(gameObject.getPosition());
        v2.normalize();

        desiredRotation.setFromUnitVectors(v1,v2);
    };

    this.setTargetVector = function(_target){
        target = _target;
    };

    this.update = function(delta){

        if(target)
            setDesiredRotation();

        gameObject.rotation.slerp(desiredRotation, (rotationSpeed * delta));
        gameObject.updateRotation();

    };

};
