

GAME.Wanderer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var wander = new GAME.Wander(this);

    this.showTargets = function(scene){
        wander.addTargetObjects(scene);
    };

    this.maxSpeed = 70;

    this.updateBehaviours = function(delta){
        wander.update(delta);
    };

};

GAME.Pursuer.prototype = Object.create(GAME.GameObject);
