/*
 *Given a point, move away from that point, in the opposite direction
 * */

GAME.Flee = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();
    var fleeLocation = new THREE.Vector3();

    this.fleeDistance = 100;

    this.setTarget = function(v){
        that.fleeDistanceReached = false;
        target = v;
        fleeLocation.subVectors(gameObject.getPosition(), target).normalize();
        fleeLocation.multiplyScalar(that.fleeDistance);
    };

    this.fleeDistanceReached = true;

    this.update = function(){

        desiredVelocity.subVectors(fleeLocation,gameObject.getPosition() );

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

