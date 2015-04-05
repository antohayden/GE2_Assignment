
/*
* Given a target, rotate gameObject towards target
* */

 GAME.Rotate = function(gameObject){

    var that = this;

    var rotationSpeed = 2;
    var desiredRotation = new THREE.Quaternion();
    var targetVector, targetReference;

    function setDesiredRotation(){

        var v1 = gameObject.look.clone();
        var v2 = targetVector.clone();

        v2.sub(gameObject.getPosition());
        v2.normalize();

        desiredRotation.setFromUnitVectors(v1,v2);
    };

    function pointToTarget(){
        targetVector = targetReference.clone();
        setDesiredRotation();
    };

    this.followTargetEnabled = false;

    this.setTargetVector = function(target){
        targetReference = target;
        pointToTarget();
    };

    this.update = function(delta){

        if(that.followTargetEnabled)
            pointToTarget();

        gameObject.rotation.slerp(desiredRotation, (rotationSpeed * delta));
        gameObject.updateRotation();

    };

};
