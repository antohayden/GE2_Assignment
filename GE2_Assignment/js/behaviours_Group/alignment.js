/*
 * Given a list of nearest neighbour gameObjects, apply force to a gameObject to
 * keep it's heading in the same direction as it's neighbours
 * */

GAME.Alignment = function(gameObject){

    var averageHeading = new THREE.Vector3();

    function setAverageHeading(neighbours){

        var len = neighbours.length;
        averageHeading.set(0,0,0);

        for(var i = 0; i < len; i++){

            averageHeading.add(neighbours[i].velocity);
        }

        averageHeading.divideScalar(len);
        averageHeading.sub(gameObject.velocity);

        return averageHeading;
    }

    this.update = function(neighbours){

        return setAverageHeading(neighbours);
    };

};

