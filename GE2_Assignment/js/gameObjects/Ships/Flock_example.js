

GAME.Flock_example = function(){

    var that = this;

    GAME.GameObject.call(this);

    var flocking = new GAME.Flocking(this);

    var separation = new GAME.Separation(this);
    var cohesion = new GAME.Cohesion(this);
    var alignment = new GAME.Alignment(this);
    var wander = new GAME.Wander(this);

    flocking.behaviours.push(separation);
    flocking.behaviours.push(cohesion);
    flocking.behaviours.push(alignment);
    flocking.behaviours.push(wander);

    this.setRadius = function(val) {
        flocking.setNeighbourhoodRadius(val);
    }

    this.setGameObjects = function(gameObjects){
        flocking.setGameObjects(gameObjects);
    };

    this.maxSpeed = 120;

    this.updateBehaviours = function(delta){

        that.applyForce(flocking.calculate(delta));
    };

};

GAME.Flock_example.prototype = Object.create(GAME.GameObject);
