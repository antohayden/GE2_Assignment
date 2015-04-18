
GAME.Fleer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var flee = new GAME.Flee(this);
    flee.fleeDistance = 180;

    this.maxSpeed = 50;

    this.setTarget = function(target){
        flee.setTarget(target);
    };

    this.updateBehaviours = function(delta){
        flee.update(delta);
    };

};

GAME.Fleer.prototype = Object.create(GAME.GameObject);

