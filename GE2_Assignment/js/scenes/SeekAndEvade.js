

GAME.SeekAndEvade = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();

    path.setPoints(path.createCirclularPath(10, 250, new THREE.Vector3(0,0,-300)));
    path.drawPath(scene, 0x0000FF);

    var seeker = new GAME.Seeker();
    seeker.mesh = assetManager.createShipMesh();
    seeker.setPosition(new THREE.Vector3(0,0,-100));
    seeker.setPath(path);
    seeker.followPath = true;

    scene.add(seeker.mesh);
    gameObjects.push(seeker);

    var evader = new GAME.Evader();
    evader.mesh = assetManager.createShipMesh();
    evader.setPosition(new THREE.Vector3(0,0,-300));
    evader.setTargetObject(seeker);

    scene.add(evader.mesh);
    gameObjects.push(evader);

};
