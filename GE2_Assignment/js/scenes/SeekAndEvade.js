

GAME.SeekAndEvade = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();

    path.setPoints(path.createCirclularPath(10, 200, new THREE.Vector3(0,0,-300)));
    path.drawPath(scene, 0x0000FF);

    var arriver = new GAME.Arriver();
    arriver.mesh = assetManager.createShipMesh();
    arriver.setPosition(new THREE.Vector3(0,0,-100));
    arriver.setPath(path);
    arriver.followPath(true);

    scene.add(arriver.mesh);
    gameObjects.push(arriver);

    var evader = new GAME.Evader();
    evader.mesh = assetManager.createShipMesh();
    evader.setPosition(new THREE.Vector3(0,0,-300));
    evader.setTargetObject(arriver);

    scene.add(evader.mesh);
    gameObjects.push(evader);

};
