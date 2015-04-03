
GAME.Ship = function(){

    GAME.GameObject.call(this);

    var seek = new GAME.Seek(this);
    var rotate = new GAME.Rotate(this);

    this.maxSpeed = 100;

    this.setTarget = function(target){
        seek.setTarget(target);
        rotate.setTargetVector(target);
    };

    this.updateBehaviours = function(delta){

        if(!seek.targetReached)
            seek.update(delta);

        if(!rotate.rotationComplete)
            rotate.update(delta);
    };

};

GAME.Ship.prototype = Object.create(GAME.GameObject);
