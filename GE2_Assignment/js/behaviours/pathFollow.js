/*
* Given a path object loop over it's points and direct gameObject towards it
* moving to the next, once reached
* */

GAME.PathFollow = function(gameObject){

    var that = this;

    var path, numPathPoints;

    var pathIndex = 0;


    this.getNextPathTarget = function(){
        pathIndex++;
        return path[pathIndex % numPathPoints];
    };

    this.setPath = function(_path){
        path = _path.getPoints();
        numPathPoints = path.length;
        that.getNextPathTarget();
    };

    this.followPath = false;


};