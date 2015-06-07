

GAME.Evader = function(){

    var that = this;

    GAME.GameObject.call(this);

    var evade = new GAME.Evade(this);
    evade.setEvadeDistance(100);

    var seek = new GAME.Seek(this);
    seek.setTarget(new THREE.Vector3(-200,0,-300));

    var force;

    this.maxSpeed = 40;

    this.setTargetObject = function(targetObject){
        evade.setTargetObject(targetObject);
    };

    this.updateBehaviours = function(delta){

        force = evade.update(delta);

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

GAME.Evader.prototype = Object.create(GAME.GameObject);
