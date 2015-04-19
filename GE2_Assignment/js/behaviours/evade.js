/*
 * Given an object, predict an interception point based on it's velocity
 * and Flee from that point
 * */

GAME.Evade = function(gameObject){

    var targetObject, targetVector = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var distance, lookAhead;
    var flee = new GAME.Flee(gameObject);

    this.setTargetObject = function(_targetObject){
        targetObject = _targetObject;
    };

    this.setEvadeDistance = function(distance){
        flee.fleeDistance = distance;
    };

    this.getEvadeDistance = function(){
        return flee.fleeDistance;
    };

    this.update = function(delta){

        direction.subVectors(targetObject.getPosition(), gameObject.getPosition());
        distance = direction.length();

        lookAhead = (distance / gameObject.maxSpeed);
        targetVector.copy(targetObject.getPosition());
        targetVector.add(targetObject.velocity.clone().multiplyScalar(lookAhead));

        flee.setTarget(targetVector);
        return(flee.update(delta));
    };

};