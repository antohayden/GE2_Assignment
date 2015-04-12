
GAME.Seeker = function(){

    var that = this;

    GAME.GameObject.call(this);

    var seek = new GAME.Seek(this);
    var path, numPathPoints;

    var pathIndex = 1;

    this.followPath = false;

    function setNewPathTarget(){
        that.setTarget(path[pathIndex % numPathPoints]);
        pathIndex++;
    };

    this.setPath = function(_path){
        path = _path.getPoints();
        numPathPoints = path.length;
        setNewPathTarget();
    };

    this.maxSpeed = 100;

    this.setTarget = function(target){
        seek.setTarget(target);
    };

    this.updateBehaviours = function(delta){

        if(!seek.targetReached)
            seek.update(delta);

        else if(that.followPath)
            setNewPathTarget();
    };

};

GAME.Seeker.prototype = Object.create(GAME.GameObject);
