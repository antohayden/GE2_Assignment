/*
* Given a list of nearest neighbour gameObjects, apply force to a gameObject to
* steer away from each neighbour
* */

GAME.Separation = function(gameObject){

    var steeringForce = new THREE.Vector3();
    var toNeighbour = new THREE.Vector3();

    function setSteeringForce(neighbours){

        var len = neighbours.length;

        if(len === 0){
            steeringForce.set(0,0,0);
        }
        else{
            var pos = gameObject.getPosition();
            var dirLength;

            steeringForce.set(0,0,0);

            for(var i = 0; i < len; i++){
                toNeighbour.set(0,0,0);
                toNeighbour.subVectors(pos, neighbours[i].getPosition());

                dirLength = toNeighbour.length();
                toNeighbour.normalize().multiplyScalar(0.1 *  dirLength);
                steeringForce.add(toNeighbour);
            };
        }
        return steeringForce;

    };

    this.update = function(neighbours){

        return setSteeringForce(neighbours);

    };


};