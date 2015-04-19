
GAME.Alignment_Scene = function(assetManager, gameObjects, scene, camera){

    var path = new GAME.Path();
    var points = path.createCirclularPath(100, 300, new THREE.Vector3(0,0,-400));
    camera.position.set(0,0,200);

    for(var i = 0; i < 100; i++) {

        var s = new GAME.Wanderer();
        s.maxSpeed = 120;
        s.mesh = assetManager.createShipMesh();
        s.setPosition(points[i] );
        scene.add(s.mesh);
        gameObjects.push(s);
    }


    var s2 = new GAME.Alignment_example();
    s2.maxSpeed = 60;
    s2.mesh = assetManager.createShipMesh();
    s2.setPosition(new THREE.Vector3(0,0,-400));
    s2.setGameObjects(gameObjects);
    s2.setNeighbourhoodRadius(400);
    s2.showRadius(scene, 0x00ff00);
    scene.add(s2.mesh);
    gameObjects.push(s2);

};

