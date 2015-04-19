/*
 *Given a point, move away from in the opposite direction
 * */

GAME.Flee = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();

    this.fleeDistanceReached = true;

    this.setTarget = function(v){
        target = v;
        that.fleeDistanceReached = false;
    };

    this.fleeDistance = 200;

    this.update = function(delta){

        desiredVelocity.subVectors(gameObject.getPosition(), target);

        if(desiredVelocity.length() > that.fleeDistance) {
            that.fleeDistanceReached = true;
            gameObject.velocity.set(0,0,0);

        }else{
            desiredVelocity.normalize();
            desiredVelocity.multiplyScalar(gameObject.maxSpeed);
            gameObject.velocity.copy(desiredVelocity);
        }
    };

};

