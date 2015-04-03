
/*
* Given a target, rotate gameObject towards target
* */

 GAME.Rotate = function(gameObject){

    var that = this;

    var rotationSpeed = 3;
    var desiredRotation;
    var targetVector;


    function setDesiredRotation(){

        var v1 = gameObject.look.clone();
        var v2 = targetVector.clone();

        v2.sub(gameObject.getPosition());
        v2.normalize();

        desiredRotation.setFromUnitVectors(v1,v2);
    }

    this.setTargetVector = function(target){

        targetVector = target.clone();
        desiredRotation = new THREE.Quaternion();
        setDesiredRotation();
    };


    this.update = function(delta){

        gameObject.rotation.slerp(desiredRotation, (rotationSpeed * delta));
        gameObject.updateRotation();

    };

};
