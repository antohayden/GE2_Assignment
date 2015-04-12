
GAME.MultiWander = function(assetManager, gameObjects, scene){

    for(var i = 0; i < 100; i++) {
        var wanderer = new GAME.Wanderer(scene);
        wanderer.mesh = assetManager.createShipMesh();
        wanderer.setPosition(new THREE.Vector3(0, 0, -100));

        wanderer.showTargets(scene);

        scene.add(wanderer.mesh);
        gameObjects.push(wanderer);
    }

};

