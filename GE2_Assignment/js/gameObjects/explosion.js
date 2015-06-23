
/*
* Simple explosion (low performance)
* given a position, create a number of small cubes and explode in random directions
* */

GAME.Explosion = function(position, scene) {

    var that = this;

    var geometry = new THREE.BoxGeometry( 1,1,1);
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFF99 } );
    var cube = new THREE.Mesh( geometry, material );

    var cubes = [];
    var directions = [];
    var speed = 5;
    var numCubes = 100;

    var duration = 1.5;
    var counter = 0;

    for(var i = 0; i < numCubes; i++){

        var direction = new THREE.Vector3(Math.randomBetween(-1, 1), Math.randomBetween(-1, 1), Math.randomBetween(-1, 1));
        directions.push(direction.multiplyScalar(speed));
        var newCube = cube.clone();
        cube.position.copy(position);
        cubes.push(newCube);
        scene.add(newCube);
    }

    this.isAlive = true;
    this.collidable = false;

    this.update = function(delta){

        counter += delta;

        if(counter >= duration){
            that.isAlive = false;
        }

        if(!that.isAlive){
            for(var i = 0; i < numCubes; i++){
                scene.remove(cubes[i]);
            }
        }
        else {
            for (var j = 0; j < numCubes; j++) {
                cubes[j].position.add(directions[j]);
            }
        }

    };
}