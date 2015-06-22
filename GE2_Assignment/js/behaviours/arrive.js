
GAME.Arrive = function(gameObject){

    var that = this;

    var target = new THREE.Vector3();
    var desiredVelocity = new THREE.Vector3();

    var distance;
    var slowingRadius = 200;
    var slowingForce = new THREE.Vector3();

    this.setTarget = function(v){
        that.targetReached = false;
        target = v;
    };

    this.targetReached = true;

    this.update = function(delta){

        desiredVelocity.subVectors(target, gameObject.getPosition());
        distance = desiredVelocity.length();

        if(distance < 1 ) {
            that.targetReached = true;
            desiredVelocity =  new THREE.Vector3(0,0,0);
        }
        else if (distance < slowingRadius){
            //inside slowing distance
            desiredVelocity = desiredVelocity.normalize();
            desiredVelocity.multiplyScalar(gameObject.maxSpeed);
            desiredVelocity.multiplyScalar(distance / slowingRadius);
            desiredVelocity.sub(gameObject.velocity).multiplyScalar(gameObject.mass);
        }
        else{
            //outside slowing radius
            desiredVelocity = desiredVelocity.normalize();
            desiredVelocity.multiplyScalar(gameObject.maxSpeed);
            desiredVelocity.sub(gameObject.velocity)

        }
        return desiredVelocity;



    };

};