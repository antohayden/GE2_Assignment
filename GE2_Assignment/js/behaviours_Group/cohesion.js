/*
 * Given a list of nearest neighbour gameObjects, apply force to a gameObject to
 * steer it towards the center of mass of it's neighbours
 * */

GAME.Cohesion = function(gameObject){

    var steeringForce = new THREE.Vector3();
    var centerOfMass = new THREE.Vector3();
    var seek = new GAME.Seek(gameObject);

    function setCenterOfMassTarget(neighbours){

        steeringForce.set(0,0,0);
        centerOfMass.set(0,0,0);

        var len = neighbours.length;

        for(var i = 0; i < len; i++){

            centerOfMass.add(neighbours[i].getPosition());
        }

        centerOfMass.divideScalar(len);
        seek.setTarget(centerOfMass);
    }

    this.update = function(neighbours,delta){

        setCenterOfMassTarget(neighbours);
        return(seek.update(delta));
    };

};
