
GAME.Lazer_example = function(gameObjects, scene){

    var that = this;

    GAME.GameObject.call(this);

    var seek = new GAME.Seek(this);
    var pathFollow = new GAME.PathFollow(this);

    var lazerInterval = 2, lazerCounter = 0;

    this.followPath = function(bool){
        pathFollow.followPath = bool;
    };

    this.setPath = function(_path){
        pathFollow.setPath(_path);
    };

    this.maxSpeed = 60;

    this.updateBehaviours = function(delta){

        lazerCounter += delta;

        if(lazerCounter >= lazerInterval){
            var lazer  = new GAME.Lazer(0xff0000, that, scene);
            gameObjects.push(lazer);
            lazerCounter = 0;
        }

        if(!seek.targetReached)
            that.applyForce(seek.update(delta));

        else if(that.followPath)
            seek.setTarget(pathFollow.getNextPathTarget());
    };

};

GAME.Seeker.prototype = Object.create(GAME.GameObject);

