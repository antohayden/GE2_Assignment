

GAME.OffsetPursuer = function(){

    var that = this;

    GAME.GameObject.call(this);

    var offsetPursuit = new GAME.OffsetPursuit(this);


    this.maxSpeed = 100;

    this.setOffset = function(vec){
        offsetPursuit.setOffset(vec);
    };

    this.setLeader = function(targetObject){
        offsetPursuit.setLeader(targetObject);
    };

    this.updateBehaviours = function(delta){
        that.applyForce(offsetPursuit.update(delta));
    };
};

GAME.OffsetPursuer.prototype = Object.create(GAME.GameObject);