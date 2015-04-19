/*
*Given a point, move towards that point
* */

GAME.Seek = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();

    this.setTarget = function(v){
        that.targetReached = false;
        target = v;
    };

    this.targetReached = true;

    this.update = function(delta){

        desiredVelocity.subVectors(target, gameObject.getPosition());

        if(desiredVelocity.length() < (gameObject.maxSpeed / 50) ) {
            that.targetReached = true;
        }else{

            desiredVelocity.normalize();
            desiredVelocity.multiplyScalar(gameObject.maxSpeed);
            gameObject.velocity.copy(desiredVelocity);
        }
    };

};
