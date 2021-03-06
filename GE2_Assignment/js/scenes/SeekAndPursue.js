
GAME.SeekAndPursue = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();
    path.drawPath(scene, 0x0000FF);

    var seeker = new GAME.Seeker();
    seeker.mesh = assetManager.createShipMesh();
    seeker.setPosition(new THREE.Vector3(0,0,0));
    seeker.maxSpeed = 80;
    seeker.setPath(path);
    seeker.followPath(true);

    scene.add(seeker.mesh);
    gameObjects.push(seeker);

    var pursuer = new GAME.Pursuer();
    pursuer.maxSpeed = 60;
    pursuer.mesh = assetManager.createShipMesh();
    pursuer.setPosition(new THREE.Vector3(0,0,0));
    pursuer.setTargetObject(seeker);

    scene.add(pursuer.mesh);
    gameObjects.push(pursuer);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );

};
