

GAME.Assignment_Ship = function(){

    var that = this;

    GAME.GameObject.call(this);

    var arrive = new GAME.Arrive(this);
    var seek = new GAME.Seek(this);
    var evade = new GAME.Evade(this);
    var flee = new GAME.Flee(this);
    var pursue = new GAME.Pursue(this);
    var wander = new GAME.Wander(this);
    var alignment = new GAME.Alignment(this);
    var cohesion = new GAME.Cohesion(this);
    var separation = new GAME.Separation(this);
    var obstacleAvoidance = new GAME.ObstacleAvoidance(this);
    var planeAvoidance = new GAME.PlaneAvoidance(this);

    var priorities = new GAME.ShipPriorities(this);

    function sortNeighbours(){

        var neighbours = priorities.updateNearestNeighbours();

        that.neighbourEnemies = [];
        that.neighbourAllies = [];
        that.allNeighbours = [];
        that.nearestEnemy = undefined;
        that.nearestEnemyDist = undefined;

        for(var i in neighbours){

            if(neighbours[i] instanceof GAME.Lazer){
                //not shooting ourselves
                if(neighbours[i].creator !== that) {
                    if (neighbours[i].getPosition().distanceTo(that.getPosition()) <= that.mesh.geometry.boundingSphere.radius) {
                        that.health--;
                        if(that.health <= 0)
                            that.isAlive = false;
                    }
                }
            }
            else if(neighbours[i] instanceof GAME.Assignment_Ship){

                if(neighbours[i].objectName === that.objectName){
                    that.neighbourAllies.push(neighbours[i]);
                    that.allNeighbours.push(neighbours[i]);
                }
                else{
                    if(!that.nearestEnemy) {
                        that.nearestEnemyDist = neighbours[i].getPosition().distanceTo(that.getPosition());
                        that.nearestEnemy = neighbours[i];
                    }
                    else{
                        var dist = neighbours[i].getPosition().distanceTo(that.getPosition());
                        if (dist < that.nearestEnemyDist){
                            that.nearestEnemyDist = dist;
                            that.nearestEnemy = neighbours[i];
                        }
                    }

                    that.neighbourEnemies.push(neighbours[i]);
                    that.allNeighbours.push(neighbours[i]);
                }
            }
        }

        priorities.setNeighbours(that.allNeighbours);
        priorities.setAllies(that.neighbourAllies);
        priorities.setEnemies(that.neighbourEnemies);
    };

    this.scene = undefined;
    this.gameObjects = undefined;

    this.neighbourEnemies = [];
    this.neighbourAllies = [];
    this.nearestEnemy = undefined;
    this.nearestEnemyDist = undefined;
    this.light = new THREE.PointLight( 0xffffff, 10, 50 );

    this.behavioursList = {
        arrive: arrive,
        seek: seek,
        evade: evade,
        flee: flee,
        pursue: pursue,
        wander: wander,
        alignment: alignment,
        cohesion: cohesion,
        separation: separation,
        obstacleAvoidance: obstacleAvoidance,
        planeAvoidance: planeAvoidance
    };

    this.stateMachine = new GAME.StateMachine(new GAME.IdleState(this));

    this.setRadius = function(val) {
        priorities.setNeighbourhoodRadius(val);
    }

    this.setGameObjects = function(gameObjects){
        priorities.setGameObjects(gameObjects);
        that.gameObjects = gameObjects;
    };

    this.setPlanes = function(_planes){
        planeAvoidance.setPlanes(_planes);
    };

    this.setObstacles = function(obstaclesArray){
        obstacleAvoidance.setObstacles( obstaclesArray );
    };

    this.maxSpeed = 40;

    this.setTarget = function(v){
        seek.setTarget(v);
        arrive.setTarget(v);
        flee.setTarget(v);
    }

    this.setTargetObject = function(o){
        pursue.setTargetObject(o);
        evade.setTargetObject(o);
    };

    this.updateBehaviours = function(delta){

        this.light.position.copy(that.getPosition());
        this.light.position.y += 20;
        sortNeighbours();
        that.stateMachine.update(delta);
        that.applyForce(priorities.calculate(delta));
    };

};

GAME.Assignment_Ship.prototype = Object.create(GAME.GameObject);
