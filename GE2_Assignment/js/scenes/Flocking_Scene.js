
GAME.Flocking_Scene = function(assetManager, gameObjects, scene, camera){

    var path = new GAME.Path();
    var numShips = 200;
    camera.position.set(0,0,300);


    for(var i = 0; i < numShips; i++) {

        var s = new GAME.Flock_example();
        s.maxSpeed = 300;
        s.mesh = assetManager.createShipMesh();
        s.setRadius(500);
        s.setPosition(new THREE.Vector3(Math.randomBetween(-1000, 1000), Math.randomBetween(-1000, 1000), Math.randomBetween(-4000, 0)));
        s.setGameObjects(gameObjects);
        scene.add(s.mesh);
        gameObjects.push(s);
    }

};
