/*
* Given an object, predict an interception point based on it's velocity
* and seek that point
* */

GAME.Pursue = function(gameObject){

    var that = this;

    var targetObject, targetVector = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var positionOffset = new THREE.Vector3();
    var distance, lookAhead;
    var seek = new GAME.Seek(gameObject);

    this.setTargetObject = function(_targetObject){
        targetObject = _targetObject;
    };

    this.update = function(delta){

        if(targetObject) {
            direction.subVectors(targetObject.getPosition(), gameObject.getPosition());
            distance = direction.length();

            positionOffset.copy(targetObject.velocity);
            positionOffset.normalize();
            positionOffset.multiplyScalar(targetObject.mesh.geometry.boundingSphere.radius);

            lookAhead = (distance / gameObject.maxSpeed);
            targetVector.copy(targetObject.getPosition());
            targetVector.add(targetObject.velocity.clone().multiplyScalar(lookAhead));
            targetVector.sub(positionOffset);

            seek.setTarget(targetVector);
        }
        return(seek.update(delta));
    };

};