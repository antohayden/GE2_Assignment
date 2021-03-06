
GAME.MultiWander = function(assetManager, gameObjects, scene){

    for(var i = 0; i < 10; i++) {
        var wanderer = new GAME.Wanderer(scene);
        wanderer.maxSpeed = 150;
        wanderer.mesh = assetManager.createShipMesh();
        wanderer.setPosition(new THREE.Vector3(0, 0, -100));

        wanderer.showTargets(scene);

        scene.add(wanderer.mesh);
        gameObjects.push(wanderer);
    }

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );
};

