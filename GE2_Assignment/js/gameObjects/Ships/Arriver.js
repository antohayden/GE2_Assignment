
GAME.Arriver = function(){

    var that = this;

    GAME.GameObject.call(this);

    var arrive = new GAME.Arrive(this);
    var path, numPathPoints;

    var pathIndex = 1;

    function setNewPathTarget(){
        that.setTarget(path[pathIndex % numPathPoints]);
        pathIndex++;
    };

    this.setPath = function(_path){
        path = _path.getPoints();
        numPathPoints = path.length;
        setNewPathTarget();
    };

    this.followPath = false;

    this.maxSpeed = 60;

    this.setTarget = function(target){
        arrive.setTarget(target);
    };

    this.updateBehaviours = function(delta){

        if(!arrive.targetReached)
            arrive.update(delta);

        else if(that.followPath)
            setNewPathTarget();
    };

};

GAME.Arriver.prototype = Object.create(GAME.GameObject);

