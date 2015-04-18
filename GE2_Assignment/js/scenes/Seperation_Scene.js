
GAME.Separation_Scene = function(assetManager, gameObjects, scene){


    for(var i = 0; i < 10; i++) {

        var s = new GAME.Separator();
        s.mesh = assetManager.createShipMesh();
        s.setPosition(new THREE.Vector3(0, 0, -900));
        s.setGameObjects(gameObjects);
        s.setNeighbourhoodRadius(300);
        s.showRadius(scene, 0xff0000);
        scene.add(s.mesh);
        gameObjects.push(s);
    }


    var s = new GAME.Separator();
    s.mesh = assetManager.createShipMesh();
    s.setPosition(new THREE.Vector3(0, 0, -900));
    s.setGameObjects(gameObjects);
    s.setNeighbourhoodRadius(300);
    s.showRadius(scene, 0x00ff00);
    s.logIt = true;
    scene.add(s.mesh);
    gameObjects.push(s);

};
