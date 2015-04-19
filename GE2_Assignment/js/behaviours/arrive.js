/*
 *Given a point, move towards that point, decelerating upon arrival
 * */

GAME.Arrive = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();

    var speed, distance;

    this.decelerationFactor = 2;

    this.setTarget = function(v){
        that.targetReached = false;
        target = v;
    };

    this.targetReached = true;

    this.update = function(delta){

        desiredVelocity.subVectors(target, gameObject.getPosition());
        distance = desiredVelocity.length();

        if(distance < (gameObject.maxSpeed / 50) ) {
            that.targetReached = true;
        }else{

            speed = distance / that.decelerationFactor;
            speed = Math.min(speed, gameObject.maxSpeed);

            desiredVelocity.multiplyScalar(speed).divideScalar(distance);
            return desiredVelocity.sub(gameObject.velocity);
        }

    };

};
