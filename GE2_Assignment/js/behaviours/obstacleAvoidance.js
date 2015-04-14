/*
* Given a list of obstacles direct the gameObject away from
* obstacles in it's path
* */


GAME.ObstacleAvoidance = function(gameObject){

    var that = this;

    var minDetectionBoxLength = 100;
    var detectionBoxLength;

    var obstaclesInRange;
    var obstacles = [];
    var closestObstacle;
    var closestObstacleLocalPosition;
    var distanceToClosest;
    var intersectionPoint;

    function findObstaclesInRange(distance){

        obstaclesInRange = [];
        var pos = gameObject.getPosition();

        for(var i in obstacles){
            if(pos.distanceTo(obstacles[i].getPosition()) < distance){
                obstaclesInRange.push(obstacles[i]);
            }
        };
    };

    //calculate steering force away from object
    function calculateSteeringForce(obstacleObject){

        var steeringForce = new THREE.Vector3();

        //closer the agent, the stronger the force... luke
        var multiplier = 1.0 + (detectionBoxLength - closestObstacleLocalPosition.z) / detectionBoxLength;
        var obstacleRadius = obstacleObject.mesh.geometry.boundingSphere.radius;
        var expandedRadius = obstacleRadius + (gameObject.mesh.geometry.boundingSphere.radius);

        steeringForce.x = (expandedRadius - Math.abs(closestObstacleLocalPosition.x)) * multiplier;
        steeringForce.y = (expandedRadius - Math.abs(closestObstacleLocalPosition.y)) * multiplier;
        //
        //if(closestObstacleLocalPosition.x > 0)
        //    steeringForce.x *= -1;
        //
        ////if above, steer down
        //if(closestObstacleLocalPosition.y > 0)
        //    steeringForce.y *= -1;

        //apply braking proportional to the obstacles distance
        var brakingWeight = 0.4;
        steeringForce.z = (expandedRadius - closestObstacleLocalPosition.z) * brakingWeight;

        //convert to world space
        steeringForce.applyMatrix4(gameObject.mesh.matrixWorld);
        steeringForce.normalize();
        steeringForce.multiplyScalar(gameObject.maxSpeed * gameObject.maxSpeed);

        return steeringForce;

    };

    function intersectionCheck(obstacleObject){

        var m = new THREE.Matrix4;
        var localPos = new THREE.Vector3();
        localPos.copy(obstacleObject.getPosition());

        localPos.applyMatrix4(m.getInverse(gameObject.mesh.matrixWorld));

        if(localPos.z < 0){

            var obstacleRadius = obstacleObject.mesh.geometry.boundingSphere.radius;
            var expandedRadius = obstacleRadius + (gameObject.mesh.geometry.boundingSphere.radius / 2 );

            if( Math.abs(localPos.x) < expandedRadius &&
                Math.abs(localPos.y) < expandedRadius ){
                /*
                * derived in part from:
                * http://www.ccs.neu.edu/home/fell/CSU540/programs/RayTracingFormulas.htm
                * */

                var rayEndPoint = gameObject.look.clone().multiplyScalar(detectionBoxLength);

                var dx = rayEndPoint.x;
                var dy = rayEndPoint.y;
                var dz = rayEndPoint.z;

                var a = (dx * dx) + (dy * dy) + (dz * dz);

                var b = 2 * ((dx * -localPos.x) +
                            (dy * -localPos.y) +
                            (dz * -localPos.z));

                var c = (localPos.x * localPos.x) +
                        (localPos.y * localPos.y) +
                        (localPos.z * localPos.z) -
                        (expandedRadius * expandedRadius);

                //discriminant(a, b, c) = b^2 - 4ac
                var discriminant = (b * b) - (4 * (a * c));

                //if less than, no intersection has occurred
                if(discriminant >= 0) {
                    //nearest intersection Point
                    var t = (-b - Math.sqrt(discriminant)) / ( 2 * a );

                    var x = t * dx;
                    var y = t * dy;
                    var z = t * dz;

                    intersectionPoint = new THREE.Vector3(x,y,z);

                    if(!distanceToClosest) {
                        distanceToClosest = intersectionPoint.length();
                        closestObstacle = obstacleObject;
                        closestObstacleLocalPosition = localPos;
                        that.obstacleDetected = true;
                    }
                    else{
                        var l = intersectionPoint.length();

                        if(l < distanceToClosest){
                            distanceToClosest = l;
                            closestObstacle = obstacleObject;
                            closestObstacleLocalPosition = localPos;
                            that.obstacleDetected = true;
                        }
                    }
                }
            }
        }
    };

    this.obstacleDetected = false;

    this.getIntersectionPoint = function(){
        if(closestObstacle)
            return intersectionPoint.applyMatrix4(gameObject.mesh.matrixWorld);
    };

    this.setObstacles = function(obstacleArray){
        obstacles = obstacleArray;
    };

    this.addObstacle = function(obstacleObject){
        obstacles.push(obstacleObject);
    };

    this.update = function(delta){

        that.obstacleDetected = false;
        obstaclesInRange = undefined;
        closestObstacle = undefined;
        closestObstacleLocalPosition = undefined;
        distanceToClosest = undefined;

        detectionBoxLength = minDetectionBoxLength +
        ((gameObject.speed / gameObject.maxSpeed) *  minDetectionBoxLength);

        findObstaclesInRange(detectionBoxLength);

        for(var o in obstaclesInRange) {
            intersectionCheck(obstaclesInRange[o]);
        }

        if(closestObstacle){
            gameObject.applyForce(calculateSteeringForce(closestObstacle));
        }

    };

};