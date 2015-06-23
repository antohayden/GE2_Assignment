
GAME.ObstacleAvoidance_Scene = function(assetManager, gameObjects, scene){

    var path = new GAME.Path();
    var numPoints = 6;
    var radius = 350;
    var points = path.createCirclularPath(numPoints, radius, new THREE.Vector3(0,0,-300));

    path.setPoints(points);
    path.drawPath(scene, 0x0000FF);

    var obstacles = [];

    var movingSphere = new GAME.GameObject();

    var geometry = new THREE.SphereGeometry( 50,32,32);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    var mesh = new THREE.Mesh( geometry, material );
    movingSphere.mesh = mesh;
    movingSphere.setPosition(new THREE.Vector3(-150,100,-300));

    scene.add( movingSphere.mesh );
    obstacles.push(movingSphere);

    var sphere = new GAME.GameObject();

    var g = new THREE.SphereGeometry( 50,32,32);
    var m = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    var mesh2 = new THREE.Mesh( geometry, material );
    sphere.mesh = mesh2;
    sphere.setPosition(new THREE.Vector3(-300,100,-300));

    scene.add( sphere.mesh );
    obstacles.push(sphere);

    var X = 0, Y = 0;
    var pos = new THREE.Vector3();

    movingSphere.update = function(delta){
        X += delta / 10;
        Y += delta / 10;

        pos.set(Math.sin(X) * radius, Math.cos(Y) * radius, -300);
        movingSphere.setPosition(pos);
    };

    gameObjects.push(movingSphere);

    var oaShip = new GAME.ObstacleAvoider();
    oaShip.mesh = assetManager.createShipMesh();
    oaShip.setPath(path);
    oaShip.setObstacles(obstacles);
    oaShip.followPath(true);
    oaShip.maxSpeed = 100;

    scene.add(oaShip.mesh);
    gameObjects.push(oaShip);

    oaShip.setIntersectionObject(scene);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );


};