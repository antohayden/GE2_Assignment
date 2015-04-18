/*
* Given a list of nearest neighbour gameObjects, apply force to a gameObject to
* steer away from each neighbour
* */

GAME.Separation = function(gameObject){

    var steeringForce = new THREE.Vector3();
    var toNeighbour = new THREE.Vector3();

    function setSteeringForce(neighbours){

        steeringForce.set(0,0,0);

        var len = neighbours.length;
        var pos = gameObject.getPosition();
        var dirLength;

        for(var i = 0; i < len; i++){

            toNeighbour.set(0,0,0);
            toNeighbour.subVectors(pos, neighbours[i].getPosition());

            dirLength = toNeighbour.length();
            steeringForce.add(toNeighbour.normalize().divideScalar(dirLength));
        };

        return steeringForce;

    };

    this.update = function(neighbours){

        return setSteeringForce(neighbours);

    };


};