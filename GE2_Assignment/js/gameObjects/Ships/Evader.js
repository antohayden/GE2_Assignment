

GAME.Evader = function(){

    var that = this;

    GAME.GameObject.call(this);

    var evade = new GAME.Evade(this);
    evade.setEvadeDistance(400);

    this.maxSpeed = 100;

    this.setTargetObject = function(targetObject){
        evade.setTargetObject(targetObject);
    };

    this.updateBehaviours = function(delta){
        evade.update(delta);
    };

};

GAME.Evader.prototype = Object.create(GAME.GameObject);
