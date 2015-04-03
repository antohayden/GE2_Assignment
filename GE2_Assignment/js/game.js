/*
* Some code taken from pointer lock controls example on Three.js examples
* (Controls and setup)
* */

GAME = function(){
        var camera, scene, renderer;
        var cameraController, controls;
        var assetManager;
        var ships, ship1;
        var loaded = false;
        var prevTime;

        var timer = 0, counter = 0;
        var path;

        init();
        animate();


        function init(){

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );

            scene = new THREE.Scene();
            var light = new THREE.PointLight( 0xBBBBBB, 5, 1000 );
            light.position.set( 0,300,0 );
            scene.add( light );

            cameraController = new THREE.PointerLockControls( camera );
            controls  = new GAME.Controls(cameraController);
            scene.add( cameraController.getObject() );
            cameraController.enabled = true;

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0xAAAAAA );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            assetManager = new GAME.AssetManager();

            ship1 = new GAME.Ship();
            $(document).on("assetsLoaded", function(){

                ship1.mesh = assetManager.createShipMesh();
                ship1.setPosition(new THREE.Vector3(0,100,0));

                path = new GAME.Path();
                path.drawPath(scene, 0xFF0000);
                ship1.setTarget(path.getPoints()[0]);

                scene.add(ship1.mesh);
                loaded = true;
            });

            window.addEventListener( 'resize', onWindowResize, false );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function update(){

            var time = performance.now();
            if(!prevTime)
                prevTime = time;

            var delta = ( time - prevTime ) / 1000;

            controls.update(delta);
            prevTime = time;

            if(loaded) {
                ship1.update(delta);
            }

            timer += delta;

            if(timer > 5) {
                counter++;
                ship1.setTarget(path.getPoints()[counter % path.getPoints().length]);
                timer = 0;
            }

        }

        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        }



};
