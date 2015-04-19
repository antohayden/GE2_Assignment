
GAME.Flocking_Scene = function(assetManager, gameObjects, scene, camera){

    var path = new GAME.Path();
    var numShips = 200;
    var points = path.createCirclularPath(numShips, 300, new THREE.Vector3(0,0,-400));
    camera.position.set(0,0,0);

    for(var i = 0; i < numShips; i++) {

        var s = new GAME.Flock_example();
        s.maxSpeed = 120;
        s.mesh = assetManager.createShipMesh();
        s.setRadius(300);
        s.setPosition(points[i]);
        s.setGameObjects(gameObjects);
        scene.add(s.mesh);
        gameObjects.push(s);
    }

};

