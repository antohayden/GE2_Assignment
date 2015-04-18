
GAME.Arriver = function(){

    var that = this;

    GAME.GameObject.call(this);

    var arrive = new GAME.Arrive(this);
    var pathFollow = new GAME.PathFollow(this);

    this.setPath = function(_path){
        pathFollow.setPath(_path);
    };

    this.followPath = function(bool){
        pathFollow.followPath = bool;
    };

    this.maxSpeed = 60;

    this.updateBehaviours = function(delta){

        if(!arrive.targetReached)
            arrive.update(delta);

        else if(pathFollow.followPath)
            arrive.setTarget(pathFollow.getNextPathTarget());
    };

};

GAME.Arriver.prototype = Object.create(GAME.GameObject);

