
GAME.Ship = function(){

    var that = this;

    GAME.GameObject.call(this);

    var seek = new GAME.Seek(this);
    var rotate = new GAME.Rotate(this);
    var flee = new GAME.Flee(this);
    var path, numPathPoints;

    var pathIndex = 0;

    this.setPath = function(_path){
        path = _path.getPoints();
        numPathPoints = path.length;
    };

    this.maxSpeed = 100;

    this.setTarget = function(target){
       // seek.setTarget(target);
        flee.setTarget(target);
        rotate.setTargetVector(target);
    };

    this.updateBehaviours = function(delta){

        //if(!seek.targetReached)
        //    seek.update(delta);
        //else {
        //    that.setTarget(path[pathIndex % numPathPoints]);
        //    pathIndex++;
        //}

        if(!flee.fleeDistanceReached)
            flee.update(delta);
        else {
            that.setTarget(path[pathIndex % numPathPoints]);
            pathIndex++;
        }

        rotate.update(delta);
    };

};

GAME.Ship.prototype = Object.create(GAME.GameObject);
