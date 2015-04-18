
GAME.SeekAndFlee = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();
    path.drawPath(scene, 0xFF0000);

    var seeker = new GAME.Seeker();
    seeker.mesh = assetManager.createShipMesh();
    seeker.setPosition(new THREE.Vector3(0,0,0));
    seeker.setPath(path);
    seeker.followPath(true);

    scene.add(seeker.mesh);
    gameObjects.push(seeker);


    var fleer = new GAME.Fleer();
    fleer.mesh = assetManager.createShipMesh();
    fleer.setPosition(new THREE.Vector3(100,50,-100));
    fleer.setTarget(seeker.getPosition());
    scene.add(fleer.mesh);
    gameObjects.push(fleer);

};
