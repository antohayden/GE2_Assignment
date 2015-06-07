
GAME.Fleer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var flee = new GAME.Flee(this);
    flee.fleeDistance = 180;

    var seek = new GAME.Seek(this);
    seek.setTarget(THREE.Vector3.ZERO);

    var force;

    this.maxSpeed = 40;

    this.setTarget = function(target){
        flee.setTarget(target);
    };

    this.updateBehaviours = function(delta){

        force = flee.update(delta);

        if(force.length() > 0) {
            that.applyForce(force);
            seek.targetReached = false;
        }
        else if(!seek.targetReached) {
            that.applyForce(seek.update(delta));
        }
        else if(seek.targetReached){
            if(seek.update(delta).length() < 1)
                that.velocity.set(0,0,0);
        }
    };

};

GAME.Fleer.prototype = Object.create(GAME.GameObject);

