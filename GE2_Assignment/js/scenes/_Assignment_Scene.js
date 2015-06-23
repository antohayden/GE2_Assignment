

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
    var numObstacles = 200;
    var forceCap = 10;

    for (var i = 0; i < numObstacles; i++){

        var ob = new GAME.GameObject();
        var scale = Math.randomBetween(1,50);
        ob.mesh = assetManager.createAsteroid(scale);
        ob.setPosition(randomPosition(4000));
        ob.mass = 50;

        scene.add( ob.mesh );

        obstacles.push(ob);
        gameObjects.push(ob);

        ob.force = new THREE.Vector3(Math.randomBetween(-forceCap,forceCap),Math.randomBetween(-forceCap,forceCap),Math.randomBetween(-forceCap,forceCap));
        ob.rotationSpeed = Math.randomBetween(1, 50);

        ob.updateBehaviours = function(delta){
            this.rotationSpeed = 0.01;
            this.applyForce(this.force);
        };
    }


    /*****************************************************
     * FUNCTION FOR CHECKING IF SHIPS SPAWN INSIDE OBSTACLES
     * *****************************************/
    function isInsideSphere(point, sphere){

        if(point.distanceTo(sphere.getPosition()) <= sphere.mesh.geometry.boundingSphere.radius)
            return true;
        else
            return false;
    }

    function randomPosition(radius){
        return new THREE.Vector3(Math.randomBetween(-radius, radius), Math.randomBetween(-radius, radius), Math.randomBetween(-radius, radius) );
    }

    /*****************************************************
    * SHIPS
    * *****************************************/

    var randomPos;

    for (var j = 0; j < numShips; j++){

        var ship = new GAME.Assignment_Ship();
        ship.scene = scene;
        ship.setGameObjects(gameObjects);
        ship.setPlanes(planes);
        ship.setObstacles(obstacles);
        ship.maxSpeed = 150;

        if(j%2 === 0) {
            ship.objectName = "A";
            ship.mesh = assetManager.createShipMesh(null, "Red");
        }
        else {
            ship.objectName = "B";
            ship.mesh = assetManager.createShipMesh(null, "Blue");
        }

        ship.setRadius(1500);

        ship.maxSpeed = 150;

        randomPos = randomPosition(2000);

        for(var k = 0; k < obstacles.length; k++){

            if(isInsideSphere(randomPos, obstacles[k])){
                k = 0;
                randomPos = randomPosition(2000);
            }
        }

        ship.setPosition(randomPos);

        scene.add(ship.mesh);
        gameObjects.push(ship);
    }

    /*********************************************
    * Stars in scene
    * ***********************************************************/

    for(var l = 0; l < 500; l++){
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

        if(l % 20 === 0) {
            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.copy(direction);
            scene.add(directionalLight);
        }
    }

    this.update = function(delta){

        //cameraSwitchTimer += delta;

        //if(cameraSwitchTimer > cameraSwitchDuration) {
        //
        //    var j = gameObjects.length;
        //
        //    for (var i = Math.floor(Math.randomBetween(0, j)); i < j; i++) {
        //
        //        if(i%2 === 0) {
        //            if (gameObjects[i] instanceof GAME.Assignment_Ship) {
        //
        //                    cameraObject.position.copy(gameObjects[i].getPosition());
        //                    camera.position.set(0, 0, 300);
        //                    cameraObject.add(camera);
        //                    cameraSwitchTimer = 0;
        //                    break;
        //
        //            }
        //        }
        //        else{
        //            if (gameObjects[i] instanceof GAME.Assignment_Ship) {
        //                    gameObjects[i].mesh.add(camera);
        //                    camera.position.add(new THREE.Vector3(0, 100, 100));
        //                    cameraSwitchTimer = 0;
        //                    break;
        //            }
        //        }
        //    }
        //}
    }

};