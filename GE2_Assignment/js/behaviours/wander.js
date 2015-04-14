/*
 *Project a circle in front of gameObject and steer towards the perimeter of the circle
 * */

GAME.Wander = function(gameObject){

    var that = this;

    var circleCenter = new THREE.Vector3();

    var randVector = new THREE.Vector3();
    var direction = new THREE.Vector3();
    var perimeterPoint = new THREE.Vector3();
    var jitterFactor = 10;

    var target = new THREE.Vector3();
    target.copy(gameObject.look);

    var newTarget = new THREE.Vector3();


    var wanderRadius = 100;
    var wanderDistance = 400;

    var seek = new GAME.Seek(gameObject);

    var greenCube, redSphere;
    var geometry, material;
    var showTargets = false;

    this.addTargetObjects = function(scene){
        geometry = new THREE.BoxGeometry( 5, 5, 5 );
        material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        greenCube = new THREE.Mesh( geometry, material );
        scene.add( greenCube );

        geometry = new THREE.SphereGeometry( wanderRadius, 32, 32);
        material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff} );
        redSphere = new THREE.Mesh( geometry, material );
        scene.add( redSphere );

        showTargets = true;
    };


    function setWanderTarget(){

        circleCenter.copy(gameObject.getPosition());

        randVector.set(
            Math.randomBetween(-1,1),
            Math.randomBetween(-1,1),
            Math.randomBetween(-1,1)).multiplyScalar(jitterFactor);

        perimeterPoint.add(randVector);
        perimeterPoint.normalize();
        perimeterPoint.multiplyScalar(wanderRadius);

        direction.copy(gameObject.look);
        direction.applyQuaternion(gameObject.rotation);
        //direction.normalize();
        direction.multiplyScalar(wanderDistance);
        circleCenter.add(direction);

        if(showTargets) {
            greenCube.position.copy(target);
            redSphere.position.copy(circleCenter);
        }

        target.copy(circleCenter);
        target.add(perimeterPoint);

    };

    this.update = function(delta){

        setWanderTarget();

        seek.setTarget(target);
        seek.update(delta);
    };

};