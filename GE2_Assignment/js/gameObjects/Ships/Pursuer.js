

GAME.Pursuer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var pursue = new GAME.Pursue(this);

    this.maxSpeed = 50;

    this.setTargetObject = function(targetObject){
        pursue.setTargetObject(targetObject);
    };

    this.updateBehaviours = function(delta){
        pursue.update(delta);
    };

};

GAME.Pursuer.prototype = Object.create(GAME.GameObject);