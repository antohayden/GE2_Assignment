

GAME.Assignment_Scene = function(assetManager, gameObjects, scene, camera){


    var numShips = 50;
    var cameraSwitchTimer = 0;
    var cameraSwitchDuration = 5;
    var cameraObject = new THREE.Object3D();
    scene.add(cameraObject);
    camera.position.set(0,50,150);

    /*******************************************
    *   PLANES
    * *******************************************/

    var g1 = new THREE.PlaneGeometry( 16000, 16000, 32 );
    var m1 = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    var p = new THREE.Mesh( g1, m1 );
    var rotation = 0;
    p.position.set(0,0,-8000);
    p.rotateX(rotation);
    scene.add( p );

    var p2 = new THREE.Mesh( g1, m1 );
    rotation = Math.PI/2;
    p2.position.set(0,8000,0);
    p2.rotateX(rotation);
    scene.add( p2 );

    var p3 = new THREE.Mesh( g1, m1 );
    rotation = 0;
    p3.position.set(0,0,8000);
    p3.rotateX(rotation);
    scene.add( p3 );

    var p4 = new THREE.Mesh( g1, m1 );
    rotation = Math.PI/2;
    p4.position.set(0,-8000,0);
    p4.rotateX(rotation);
    scene.add( p4 );

    var p5 = new THREE.Mesh( g1, m1 );
    rotation = Math.PI/2;
    p5.position.set(8000,0,0);
    p5.rotateY(rotation);
    scene.add( p5 );

    var p6 = new THREE.Mesh( g1, m1 );
    rotation = Math.PI/2;
    p6.position.set(-8000,0,0);
    p6.rotateY(rotation);
    scene.add( p6 );

    //plane takes normal and distance from origin
    var plane = new THREE.Plane(
        new THREE.Vector3(0,0,1),
        p.position.length()/2);

    var plane2 = new THREE.Plane(
        new THREE.Vector3(0,-1,0),
        p2.position.length()/2);

    var plane3 = new THREE.Plane(
        new THREE.Vector3(0,0,-1),
        p2.position.length() /2 );

    var plane4 = new THREE.Plane(
        new THREE.Vector3(0,1,0),
        p2.position.length()/2);

    var plane5 = new THREE.Plane(
        new THREE.Vector3(-1,0,0),
        p2.position.length()/2);

    var plane6 = new THREE.Plane(
        new THREE.Vector3(1,0,0),
        p2.position.length()/2);

    var planes = [
        plane,
        plane2,
        plane3,
        plane4,
        plane5,
        plane6
    ];

    /**********************************
     * OBSTACLES
     * ********************************/

    var obstacles = [];
    var numObstacles = 15;

    for (var i = 0; i < numObstacles; i++){

        var sphere = new GAME.GameObject();

        var geometry = new THREE.SphereGeometry( Math.floor(Math.randomBetween( 500, 1000)),32,32);
        var material = new THREE.MeshBasicMaterial( { map: assetManager.rockTexture} );
        var mesh = new THREE.Mesh( geometry, material );
        sphere.mesh = mesh;
        sphere.setPosition(new THREE.Vector3(Math.randomBetween(-4000, 4000), Math.randomBetween(-4000, 4000), Math.randomBetween(-4000, 4000) ));

        scene.add( sphere.mesh );
        obstacles.push(sphere);
    }

    /*****************************************************
    * SHIPS
    * *****************************************/

    for (var i = 0; i < numShips; i++){

        var ship = new GAME.Assignment_Ship();
        ship.scene = scene;
        ship.setGameObjects(gameObjects);
        ship.setPlanes(planes);
        ship.setObstacles(obstacles);
        ship.maxSpeed = 150;

        if(i%2 === 0) {
            ship.objectName = "A";
            ship.mesh = assetManager.createShipMesh(null, "Red");
        }
        else {
            ship.objectName = "B";
            ship.mesh = assetManager.createShipMesh(null, "Blue");
        }

        ship.setRadius(1500);

        ship.maxSpeed = 150;
        ship.setPosition(new THREE.Vector3(Math.randomBetween(-2000, 2000), Math.randomBetween(-2000, 2000), Math.randomBetween(-2000, 2000) ));

        scene.add(ship.mesh);
        gameObjects.push(ship);
    }

    /*********************************************
    * Stars in scene
    * ***********************************************************/

    for(var i = 0; i < 500; i++){
        var size = Math.floor(Math.randomBetween( 1, 5));
        var geometry = new THREE.BoxGeometry(size,size,size);
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var mesh = new THREE.Mesh( geometry, material );
        var direction = new THREE.Vector3(Math.randomBetween(-1, 1), Math.randomBetween(-1, 1), Math.randomBetween(-1, 1) );

        while(direction.length() < 8000){
            direction.multiplyScalar(1.1);
        }

        mesh.position.copy(direction);
        scene.add(mesh);

        if(i % 20 === 0) {
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.copy(direction)
            scene.add(directionalLight);
        }
    }

    this.update = function(delta){

        cameraSwitchTimer += delta;
        if(cameraSwitchTimer > cameraSwitchDuration) {

            var j = gameObjects.length;

            for (var i = Math.floor(Math.randomBetween(0, j)); i < j; i++) {

                if(i%2 === 0) {
                    if (gameObjects[i] instanceof GAME.Assignment_Ship) {

                            cameraObject.position.copy(gameObjects[i].getPosition());
                            camera.position.set(0, 0, 300);
                            cameraObject.add(camera);
                            cameraSwitchTimer = 0;
                            break;

                    }
                }
                else{
                    if (gameObjects[i] instanceof GAME.Assignment_Ship) {
                            gameObjects[i].mesh.add(camera);
                            camera.position.add(new THREE.Vector3(0, 100, 100));
                            cameraSwitchTimer = 0;
                            break;
                    }
                }
            }
        }
    }

};