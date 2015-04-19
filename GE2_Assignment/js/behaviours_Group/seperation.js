/*
* Given a list of nearest neighbour gameObjects, apply force to a gameObject to
* steer away from each neighbour
* */

GAME.Separation = function(gameObject){

    var steeringForce = new THREE.Vector3();
    var toNeighbour = new THREE.Vector3();

    function setSteeringForce(neighbours){

        var len = neighbours.length;
        steeringForce.set(0,0,0);

        if(len === 0){
            return steeringForce;
        }

        var pos = gameObject.getPosition();
        var dirLength;

        for(var i = 0; i < len; i++){

            toNeighbour.set(0,0,0);
            toNeighbour.subVectors(pos, neighbours[i].getPosition());

            dirLength = toNeighbour.length();
            toNeighbour.normalize().multiplyScalar(1 / dirLength);
            steeringForce.add(toNeighbour);
        };


        return steeringForce;

    };

    this.update = function(neighbours){

        return setSteeringForce(neighbours);

    };


};