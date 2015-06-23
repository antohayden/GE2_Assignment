
GAME.ArriveAndSeek = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();
    path.setPoints([
       new THREE.Vector3(0,0,0),
       new THREE.Vector3(0,0,-500)
    ]);
    path.drawPath(scene, 0x0000FF);

    var seeker = new GAME.Seeker();
    seeker.maxSpeed = 100;
    seeker.mesh = assetManager.createShipMesh();
    seeker.setPosition(new THREE.Vector3(0,0,0));
    seeker.setPath(path);
    seeker.followPath(true);

    scene.add(seeker.mesh);
    gameObjects.push(seeker);

    var arriver = new GAME.Arriver();
    arriver.maxSpeed = 100;
    arriver.mesh = assetManager.createShipMesh();
    arriver.setPosition(new THREE.Vector3(0,0,0));
    arriver.setPath(path);
    arriver.followPath(true);

    scene.add(arriver.mesh);
    gameObjects.push(arriver);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );

};

