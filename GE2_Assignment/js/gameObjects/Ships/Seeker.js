
GAME.Seeker = function(){

    var that = this;

    GAME.GameObject.call(this);

    var seek = new GAME.Seek(this);
    var pathFollow = new GAME.PathFollow(this);

    this.followPath = function(bool){
        pathFollow.followPath = bool;
    };

    this.setPath = function(_path){
        pathFollow.setPath(_path);
    };

    this.maxSpeed = 40;

    this.updateBehaviours = function(delta){

        if(!seek.targetReached)
            that.applyForce(seek.update(delta));

        else if(that.followPath)
            seek.setTarget(pathFollow.getNextPathTarget());
    };

};

GAME.Seeker.prototype = Object.create(GAME.GameObject);
