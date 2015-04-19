/*
* Some code taken from pointer lock controls example on Three.js examples
* (Controls and setup)
* */

GAME = function(){

        var camera, scene, renderer;
        var cameraController, controls;
        var assetManager;
        var demo;

        var gameObjects = [];
        var loaded = false;
        var clock = new THREE.Clock(), delta;

        init();
        animate();

        function init(){

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

            scene = new THREE.Scene();
            var light = new THREE.AmbientLight( 0xBBBBBB);
            light.position.set( 0,300,0 );
            scene.add( light );

            cameraController = new THREE.PointerLockControls( camera );
            cameraController.getObject().position.set(0,0,0);
            controls  = new GAME.Controls(cameraController);
            scene.add( cameraController.getObject() );
            cameraController.enabled = true;

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0xAAAAAA );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            assetManager = new GAME.AssetManager();

            $(document).on("assetsLoaded", function(){
                //demo = new GAME.SeekAndFlee(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.ArriveAndSeek(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.SeekAndPursue(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.SeekAndEvade(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.MultiWander(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.OffsetPursuit_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.ObstacleAvoidance_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.PlaneAvoidance_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.Separation_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.Cohesion_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                demo = new GAME.Alignment_Scene(assetManager, gameObjects, scene, cameraController.getObject());
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

            delta = clock.getDelta();
            if(delta > 0.1)
                delta = 0.1;

            controls.update(delta);

            if(loaded) {
                for(var i in gameObjects)
                    gameObjects[i].update(delta);
            }

        }

        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        }
};
