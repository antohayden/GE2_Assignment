

GAME.Flock_example = function(){

    var that = this;

    GAME.GameObject.call(this);


    var separation = new GAME.Separation(this);
    var cohesion = new GAME.Cohesion(this);
    var alignment = new GAME.Alignment(this);
    var wander = new GAME.Wander(this);

    this.behaviours.push(separation);
    this.behaviours.push(cohesion);
    this.behaviours.push(alignment);
    this.behaviours.push(wander);

    var flocking = new GAME.Flocking(this);

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
