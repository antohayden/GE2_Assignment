/*
* Weight Truncated Running Sum with Prioritization for Flocking
*
* Given a gameObject's set of behaviours, produce a force decided through
* a prioritisation system (order in array list given)
* */


GAME.Flocking = function(gameObject){

    var that = this;
    var steeringForce = new THREE.Vector3();
    var force = new THREE.Vector3();
    var nearestNeighbours = new GAME.NearestNeighbours(gameObject);

    var multipliers = {

        planeAvoidance : 1,
        obstacleAvoidance : 1,
        separation : 10000,
        cohesion : 3,
        alignment : 2,
        pursue : 1,
        seek : 1,
        flee : 1,
        evade : 1,
        arrive : 1,
        offsetPursuit : 1,
        wander : 5
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
            runningTotal.add(force.clone().normalize().multiplyScalar(remaining));
        }
        return true;
    };

    this.behaviours = [];

    this.setNeighbourhoodRadius = function(radius){
        nearestNeighbours.setNeighbourhoodRadius(radius);
    };

    this.setGameObjects = function(_gameObjects){
        nearestNeighbours.setGameObjects(_gameObjects);
    };

    this.calculate = function(delta){

        var n = nearestNeighbours.update();

        steeringForce.set(0,0,0);
        force.set(0,0,0);

        var j = that.behaviours.length;

        for(var i = 0; i < j; i++){

            if(that.behaviours[i] instanceof GAME.PlaneAvoidance){
                force = that.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.planeAvoidance);

                if(!accumulateForce(steeringForce, force)) return steeringForce;
            }

            if(that.behaviours[i] instanceof GAME.ObstacleAvoidance){
                force = that.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.obstacleAvoidance);

                if(!accumulateForce(steeringForce, force)) return steeringForce;
            }

            if(that.behaviours[i] instanceof GAME.Separation){
                force = that.behaviours[i].update(n);
                force.multiplyScalar(multipliers.separation);

                if(!accumulateForce(steeringForce, force)) return steeringForce;
            }

            if(that.behaviours[i] instanceof GAME.Cohesion){
                force = that.behaviours[i].update(n, delta);
                force.multiplyScalar(multipliers.cohesion);

                if(!accumulateForce(steeringForce, force)) return steeringForce;
            }

            if(that.behaviours[i] instanceof GAME.Alignment){
                force = that.behaviours[i].update(n);
                force.multiplyScalar(multipliers.alignment);

                if(!accumulateForce(steeringForce, force)) return steeringForce;
            }

            if(that.behaviours[i] instanceof GAME.Wander){
                force = that.behaviours[i].update(delta);
                force.multiplyScalar(multipliers.wander);

                if(!accumulateForce(steeringForce, force)) return steeringForce;
            }

        }

        return steeringForce;

    };

};