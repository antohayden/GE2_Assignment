/*
 *Given a point, move towards that point, decelerating upon arrival
 * */

GAME.Arrive = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();
    var rotate = new GAME.Rotate(gameObject);
    rotate.followTargetEnabled = true;

    var speed, distance;

    this.decelerationFactor = 0.9;

    this.setTarget = function(v){
        that.targetReached = false;
        target = v;
        rotate.setTargetVector(target);
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
            if(speed < 1)
                speed = 1;

            desiredVelocity.multiplyScalar(speed).divideScalar(distance);
            gameObject.velocity.copy(desiredVelocity);
        }

        rotate.update(delta);

    };

};
