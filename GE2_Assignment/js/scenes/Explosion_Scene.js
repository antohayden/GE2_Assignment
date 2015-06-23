
GAME.Explosion_Scene = function(assetManager, gameObjects, scene, camera){

    var explosion = new GAME.Explosion(new THREE.Vector3(0,0,0), scene);
    camera.position.set(0,0,500);

    gameObjects.push(explosion);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );

};


