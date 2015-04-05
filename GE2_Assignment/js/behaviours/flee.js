/*
 *Given a point, move away from in the opposite direction
 * */

GAME.Flee = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();

    var rotate = new GAME.Rotate(gameObject);
    rotate.followTargetEnabled = true;


    this.setTarget = function(v){
        rotate.setTargetVector(v);
        that.fleeDistanceReached = false;
        target = v;
    };

    this.fleeDistance = 200;

    this.update = function(delta){

        desiredVelocity.subVectors(gameObject.getPosition(), target);

        if(desiredVelocity.length() > that.fleeDistance) {
            gameObject.velocity.set(0,0,0);

        }else{
            desiredVelocity.normalize();
            desiredVelocity.multiplyScalar(gameObject.maxSpeed);
            gameObject.velocity.copy(desiredVelocity);
        }

        rotate.update(delta);

    };

};

