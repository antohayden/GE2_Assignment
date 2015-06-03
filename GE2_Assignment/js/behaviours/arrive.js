/*
 *Given a point, move towards that point, decelerating upon arrival
 * using a distance radius from the target
 * */

GAME.Arrive = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var toTarget = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();
    var slowingRadius = 2;
    var speed, distance;

    //this.decelerationFactor = 2;

    this.setTarget = function(v){
        console.log("switching");
        that.targetReached = false;
        target = v;
    };

    this.targetReached = true;

    this.update = function(delta){

        desiredVelocity = target.sub(gameObject.getPosition());
        distance = desiredVelocity.length();

        if(distance < 10 ) {
            that.targetReached = true;

        }else{

            if(distance < desiredVelocity)
                desiredVelocity
                    .normalize()
                    .multiplyScalar(gameObject.maxSpeed)
                    .multiplyScalar(distance / slowingRadius);
            else
                desiredVelocity
                    .normalize()
                    .multiplyScalar(gameObject.maxSpeed);

            return dd = desiredVelocity.sub(gameObject.velocity);

        }

    };

};
