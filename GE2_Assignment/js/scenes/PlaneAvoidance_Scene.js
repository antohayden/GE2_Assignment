
GAME.PlaneAvoidance_Scene = function(assetManager, gameObjects, scene, camera){

    var num_ships = 10;

    camera.position.set(0,0,500);

    var geometry = new THREE.PlaneGeometry( 4000, 4000, 32 );
    var material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff, side: THREE.DoubleSide} );
    var p = new THREE.Mesh( geometry, material );
    var rotation = Math.PI/4;
    p.position.set(0,0,-200);
    p.rotateX(rotation);
    scene.add( p );

    var g = new THREE.PlaneGeometry( 4000, 4000, 32 );
    var m = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff, side: THREE.DoubleSide} );
    var p2 = new THREE.Mesh( g, m );
    var rotation2 = 0;
    p2.position.set(0,0,-300);
    p2.rotateX(rotation2);
    scene.add( p2 );

    //plane takes normal and distance from origin
    var plane = new THREE.Plane(
        p.position.clone().applyAxisAngle(new THREE.Vector3(1,0,0), rotation).normalize().negate(),
        p.position.length());

    var plane2 = new THREE.Plane(
        p2.position.clone().applyAxisAngle(new THREE.Vector3(1,0,0), rotation2).normalize().negate(),
        p2.position.length());

    for(var k = 0; k < num_ships; k++) {
        var pAvoider = new GAME.PlaneAvoider(scene);
        pAvoider.mesh = assetManager.createShipMesh();
        pAvoider.setPosition(new THREE.Vector3(0, 0, 500));
        pAvoider.showObjects(scene);
        scene.add(pAvoider.mesh);
        gameObjects.push(pAvoider);
        pAvoider.setPlanes([
            plane,
            plane2
        ]);
    }

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );



};