/*
 * Weight Truncated Running Sum with Prioritization for ships
 *
 * Given a gameObject's set of behaviours, produce a force decided through
 * a prioritisation system
 * */

GAME.ShipPriorities = function(gameObject){

    var steeringForce = new THREE.Vector3();
    var force = new THREE.Vector3();
    var nearestNeighbours = new GAME.NearestNeighbours(gameObject);
    var currentNeighbours;
    var enemies;
    var allies;

    var multipliers = {
        planeAvoidance : 1,
        obstacleAvoidance : 3,
        separation : 2,
        cohesion : 2,
        alignment : 1,
        pursue : 1,
        seek : 1,
        flee : 1,
        evade : 1,
        arrive : 1,
        offsetPursuit : 1,
        wander : 1
    };

    function accumulateForce(runningTotal, force){

        var soFar = runningTotal.length();

        var remaining = gameObject.maxForce - soFar;

        if(remaining <= 0){
            return false;
        }
        var toAdd = force.length();

        if(toAdd < remaining){
            runningTotal.add(force);
        }
        //clone required????
        else{
            runningTotal.add(force.normalize().multiplyScalar(remaining));
        }
        return true;
    };

    this.setNeighbourhoodRadius = function(radius){
        nearestNeighbours.setNeighbourhoodRadius(radius);
    };

    this.setGameObjects = function(_gameObjects){
        nearestNeighbours.setGameObjects(_gameObjects);
    };

    this.updateNearestNeighbours  = function(){
        currentNeighbours = nearestNeighbours.update();
        return currentNeighbours;
    };

    this.setNeighbours = function(_neighbours){
        currentNeighbours = _neighbours;
    };

    this.setAllies = function(_allies){
        allies = _allies;
    };

    this.setEnemies = function(_enemies){
        enemies = _enemies;
    };

    this.calculate = function(delta){

        steeringForce.set(0,0,0);
        force.set(0,0,0);

        var j = gameObject.behaviours.length;

        for(var i = 0; i < j; i++){

            if(gameObject.behaviours[i] instanceof GAME.PlaneAvoidance){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.planeAvoidance);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.ObstacleAvoidance){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.obstacleAvoidance);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Separation){
                force = gameObject.behaviours[i].update(currentNeighbours);
                force.multiplyScalar(multipliers.separation);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Cohesion){
                force = gameObject.behaviours[i].update(allies, delta);
                force.multiplyScalar(multipliers.cohesion);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Alignment){
                force = gameObject.behaviours[i].update(allies);
                force.multiplyScalar(multipliers.alignment);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Wander){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.wander);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Flee){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.flee);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Seek){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.wander);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Evade){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.evade);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.OffsetPursuit){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.offsetPursuit);

                if(!accumulateForce(steeringForce, force)) break;
            }

            if(gameObject.behaviours[i] instanceof GAME.Pursue){
                force = gameObject.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.pursue);

                if(!accumulateForce(steeringForce, force)) break;
            }
        }

        return steeringForce;

    };

};
