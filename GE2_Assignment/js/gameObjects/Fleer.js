
GAME.Fleer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var flee = new GAME.Flee(this);
    flee.fleeDistance = 200;

    var path, numPathPoints;

    var pathIndex = 0;

    this.setPath = function(_path){
        path = _path.getPoints();
        numPathPoints = path.length;
    };

    this.maxSpeed = 90;

    this.setTarget = function(target){
        flee.setTarget(target);
    };

    this.updateBehaviours = function(delta){
        flee.update(delta);
    };

};

GAME.Seeker.prototype = Object.create(GAME.GameObject);

