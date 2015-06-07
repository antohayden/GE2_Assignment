
GAME.GameObject = function(){

    var that = this;

    var position = new THREE.Vector3();
    var desiredRotation = new THREE.Quaternion();

    var force = new THREE.Vector3();
    var mass = 1;
    var acceleration = new THREE.Vector3();

    function setDesiredRotation(){

        var v1 = that.look;
        var v2 = that.velocity.clone().normalize();

        desiredRotation.setFromUnitVectors(v1,v2);
    };

    function updateRotation(){
        that.mesh.quaternion.copy(that.rotation);
    };

    this.behaviours = [];
    this.objectName = "";
    this.health = 10;
    this.maxForce = 100;
    this.rotation = new THREE.Quaternion();
    this.rotationSpeed = 0.5;
    this.look = new THREE.Vector3(0,0,-1);
    this.up = new THREE.Vector3(0,1,0);
    this.right = new THREE.Vector3(1,0,0);
    this.speed = 0;
    this.maxSpeed = 5;
    this.velocity = new THREE.Vector3();
    this.isAlive = true;

    this.mesh = undefined;

    this.setPosition = function(v){
        position.copy(v);
        that.mesh.position.copy(v);
    };

    this.getPosition = function(){
        return position;
    };

    this.applyForce = function(v){
        try {
            force.add(v);
        }catch(Exception){
            console.error("Problem adding force");
        }
    };

    this.update = function(delta){

        that.updateBehaviours(delta);

        acceleration = force.divideScalar(mass);

        that.velocity.add(acceleration.multiplyScalar(delta));
        that.speed = that.velocity.length();

        if(that.speed > that.maxSpeed){
            that.speed = that.maxSpeed;
            that.velocity.normalize();
            that.velocity.multiplyScalar(that.speed);
        }

        position.add(that.velocity.clone().multiplyScalar(delta));
        that.mesh.position.copy(position);

        setDesiredRotation();
        that.rotation.slerp(desiredRotation, (that.rotationSpeed * delta));
        updateRotation();

        force.set(0,0,0);

    };

    this.updateBehaviours = function(){};

};