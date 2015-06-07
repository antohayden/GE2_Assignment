

GAME.Wanderer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var wander = new GAME.Wander(this);

    this.showTargets = function(scene){
        wander.addTargetObjects(scene);
    };

    this.maxSpeed = 40;

    this.updateBehaviours = function(delta){
        that.applyForce(wander.update(delta));
    };

};

GAME.Wanderer.prototype = Object.create(GAME.GameObject);
