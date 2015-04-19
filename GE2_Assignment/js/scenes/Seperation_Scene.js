
GAME.Separation_Scene = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();
    var points = path.createCirclularPath(10, 100, new THREE.Vector3(0,0,-300));

    for(var i = 0; i < 10; i++) {

        var s = new GAME.Separator_example();
        s.mesh = assetManager.createShipMesh();
        s.setPosition(points[i]);
        s.setGameObjects(gameObjects);
        s.setNeighbourhoodRadius(100);
        s.showRadius(scene, 0xff0000);
        scene.add(s.mesh);
        gameObjects.push(s);
    }


    var s2 = new GAME.Separator_example();
    s2.mesh = assetManager.createShipMesh();
    s2.setPosition(new THREE.Vector3(0, 0, -300));
    s2.setGameObjects(gameObjects);
    s2.setNeighbourhoodRadius(100);
    s2.showRadius(scene, 0x00ff00);
    s2.logIt = true;
    scene.add(s2.mesh);
    gameObjects.push(s2);

};
