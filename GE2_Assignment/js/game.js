/*
* Some code taken from pointer lock controls example on Three.js examples
* (Controls and setup)
* */

GAME = function(){
        var camera, scene, render;
        var geometry, material, mesh;
        var controls;
        var controlsEnabled = false;

        var moveForward = false;
        var moveBackward = false;
        var moveLeft = false;
        var moveRight = false;

        var velocity = new THREE.Vector3();
        var loader;
        var loadComplete, loadCounter;
        var prevTime;

        var models = [
            "Assets/models/GreenBattle.json",
            "Assets/models/GreenFighter.json",
            "Assets/models/GreenFighter2.json",
            "Assets/models/PurpleBattle.json",
            "Assets/models/PurpleCruiser.json",
            "Assets/models/PurpleFighter.json",
            "Assets/models/RedBattle.json",
            "Assets/models/RedCruiser.json",
        ];

        var loadCount = models.length;


        var ships = [];

        init();
        animate();


        function init(){
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

            scene = new THREE.Scene();
            var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 1.25 );
            light.position.set( 0.5, 1, 0.75 );
            scene.add( light );

            controls = new THREE.PointerLockControls( camera );
            scene.add( controls.getObject() );
            controls.enabled = true;


            var onKeyDown = function ( event ) {

                switch ( event.keyCode ) {

                    case 38: // up
                    case 87: // w
                        moveForward = true;
                        break;

                    case 37: // left
                    case 65: // a
                        moveLeft = true; break;

                    case 40: // down
                    case 83: // s
                        moveBackward = true;
                        break;

                    case 39: // right
                    case 68: // d
                        moveRight = true;
                        break;

                    case 32: // space
                        if ( canJump === true ) velocity.y += 350;
                        canJump = false;
                        break;

                }

            };

            var onKeyUp = function ( event ) {

                switch( event.keyCode ) {

                    case 38: // up
                    case 87: // w
                        moveForward = false;
                        break;

                    case 37: // left
                    case 65: // a
                        moveLeft = false;
                        break;

                    case 40: // down
                    case 83: // s
                        moveBackward = false;
                        break;

                    case 39: // right
                    case 68: // d
                        moveRight = false;
                        break;

                }

            };

            document.addEventListener( 'keydown', onKeyDown, false );
            document.addEventListener( 'keyup', onKeyUp, false );

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0xAAAAAA );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            window.addEventListener( 'resize', onWindowResize, false );

            loadCounter = 0;
            loadModels();
        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function updateShips(){


        }

        function updateControls(){
            var time = performance.now();
            if(!prevTime)
                prevTime = time;

            var delta = ( time - prevTime ) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            if ( moveForward ) velocity.z -= 400.0 * delta;
            if ( moveBackward ) velocity.z += 400.0 * delta;

            if ( moveLeft ) velocity.x -= 400.0 * delta;
            if ( moveRight ) velocity.x += 400.0 * delta;

            controls.getObject().translateX( velocity.x * delta );
            controls.getObject().translateZ( velocity.z * delta );

            prevTime = time;
        }

        function animate() {
            requestAnimationFrame(animate);
            if(loadComplete) {
                updateControls();
                updateShips();
                renderer.render(scene, camera);
            }
        }

        function loadModels(){
            loadComplete = false;

            loader = new THREE.JSONLoader();

            models.forEach(function(entry){
                    loader.load( entry, function ( geometry, materials ) {
                        material = new THREE.MeshFaceMaterial(materials);
                        mesh = new THREE.Mesh(geometry, material);

                        var RandX = Math.floor(Math.random() * 500);
                        var RandY = Math.floor(Math.random() * 360);
                        var RandZ = Math.floor(Math.random() * 500);

                        mesh.position.set(RandX,0,RandZ);
                        mesh.rotateZ(RandY);
                        ships.push(mesh);
                        scene.add(mesh);
                    });
                }
            );


            loader.onLoadComplete = function(){
                loadCounter++;
                if (loadCounter === models.length)
                    loadComplete = true;
            };
        }


};
