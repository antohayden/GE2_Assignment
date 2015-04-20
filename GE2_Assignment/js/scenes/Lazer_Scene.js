
GAME.Lazer_Scene = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();
    path.drawPath(scene, 0x0000FF);

    var lazer_example = new GAME.Lazer_example(gameObjects, scene);
    lazer_example.maxSpeed = 80;
    lazer_example.mesh = assetManager.createShipMesh();
    lazer_example.setPosition(new THREE.Vector3(0,0,0));
    lazer_example.setPath(path);
    lazer_example.followPath(true);

    scene.add(lazer_example.mesh);
    gameObjects.push(lazer_example);

};