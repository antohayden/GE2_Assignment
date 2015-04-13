
GAME.GameObject = function(){

    var that = this;

    var position = new THREE.Vector3();

    this.rotation = new THREE.Quaternion();
    this.look = new THREE.Vector3(0,0,-1);
    this.up = new THREE.Vector3(0,1,0);
    this.right = new THREE.Vector3(1,0,0);
    this.speed = 0;

    var force = new THREE.Vector3();
    var mass = 1;
    var acceleration = new THREE.Vector3();

    this.updateRotation = function(){
        that.mesh.quaternion.copy(that.rotation);
    };

    this.maxSpeed = 5;
    this.velocity = new THREE.Vector3();

    this.mesh = undefined;

    this.setPosition = function(v){
        position.copy(v);
        that.mesh.position.copy(v);
    };

    this.getPosition = function(){
        return position;
    };

    this.applyForce = function(v){
        force.add(v);
    };

    this.update = function(delta){

        that.updateBehaviours(delta);

        acceleration = force.divideScalar(mass);
        that.velocity.add(acceleration.clone().multiplyScalar(delta));
        that.speed = that.velocity.length();

        if(that.speed > that.maxSpeed){
            that.speed = that.maxSpeed;
            that.velocity.normalize();
            that.velocity.multiplyScalar(that.speed);
        }
        position.add(that.velocity.clone().multiplyScalar(delta));

        that.mesh.position.copy(position);
        force.set(0,0,0);
    };

    this.updateBehaviours = function(){};







};