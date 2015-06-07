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

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 40000 );

            scene = new THREE.Scene();

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

            var scenes = {
                seekAndFlee : false,
                arriveAndSeek : false,
                seekAndPursue : false,
                seekAndEvade : false,
                multiWander : false,
                offsetPursue : false,
                obstacleAvoidance : false,
                planeAvoidance : false,
                separation : false,
                cohesion : false,
                alignment : false,
                flocking : false,
                lazer : false,
                explosion : false,
                spaceDemo : false
            };

            var resetScene = function(sceneName){

                gameObjects = [];

                for ( var key in scenes){

                    if (key !== sceneName){
                        scenes[key] = false;
                    }
                }

                scene = new THREE.Scene();
                scene.add( cameraController.getObject() );

                var light = new THREE.AmbientLight( 0xBBBBBB);
                light.position.set( 0,300,0 );
                scene.add( light );
            };

            $(document).on("assetsLoaded", function(){
<<<<<<< HEAD

                var gui = new dat.GUI();
                var folder = gui.addFolder('Scenes');

                var safController = folder.add( scenes, "seekAndFlee").listen();
                var aasController = folder.add( scenes, "arriveAndSeek").listen();
                var sapController = folder.add( scenes, "seekAndPursue").listen();
                var saeController = folder.add( scenes, "seekAndEvade").listen();
                var mwController = folder.add( scenes, "multiWander").listen();
                var ospController = folder.add( scenes, "offsetPursue").listen();
                var oaController = folder.add( scenes, "obstacleAvoidance").listen();
                var paController = folder.add( scenes, "planeAvoidance").listen();
                var sController = folder.add( scenes, "separation").listen();
                var cController = folder.add( scenes, "cohesion").listen();
                var aController = folder.add( scenes, "alignment").listen();
                var fController = folder.add( scenes, "flocking").listen();
                var lController = folder.add( scenes, "lazer").listen();
                var eController = folder.add( scenes, "explosion").listen();
                var sdController = folder.add( scenes, "spaceDemo").listen();

                safController.onChange( function( value ) {

                    if(value) {
                        resetScene("seekAndFlee");
                        demo = new GAME.SeekAndFlee(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        resetScene();
                    }
                } );

                aasController.onChange( function( value ) {
                    if(value) {
                        resetScene("arriveAndSeek");
                        demo = new GAME.ArriveAndSeek(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.arriveAndSeek = false;
                    }
                } );

                sapController.onChange( function( value ) {
                    if(value) {
                        resetScene("seekAndPursue");
                        demo = new GAME.SeekAndPursue(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.seekAndPursue = false;
                    }
                } );

                saeController.onChange( function( value ) {
                    if(value) {
                        resetScene("seekAndEvade");
                        demo = new GAME.SeekAndEvade(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.seekAndEvade = false;
                    }
                } );

                mwController.onChange( function( value ) {
                    if(value) {
                        resetScene("multiWander");
                        demo = new GAME.MultiWander(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.multiWander = false;
                    }
                } );

                ospController.onChange( function( value ) {
                    if(value) {
                        resetScene("offsetPursue");
                        demo = new GAME.OffsetPursuit_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.offsetPursue = false;
                    }
                } );

                oaController.onChange( function( value ) {
                    if(value) {
                        resetScene("obstacleAvoidance");
                        demo = new GAME.ObstacleAvoidance_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.obstacleAvoidance = false;
                    }
                } );

                paController.onChange( function( value ) {
                    if(value) {
                        resetScene("planeAvoidance");
                        demo = new GAME.PlaneAvoidance_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.planeAvoidance = false;
                    }
                } );

                sController.onChange( function( value ) {
                    if(value) {
                        resetScene("separation");
                        demo = new GAME.Separation_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.separation = false;
                    }
                } );

                cController.onChange( function( value ) {
                    if(value) {
                        resetScene("cohesion");
                        demo = new GAME.Cohesion_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.cohesion = false;
                    }
                } );

                aController.onChange( function( value ) {
                    if(value) {
                        resetScene("alignment");
                        demo = new GAME.Alignment_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.alignment = false;
                    }
                } );

                fController.onChange( function( value ) {
                    if(value) {
                        resetScene("flocking");
                        demo = new GAME.Flocking_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.flocking = false;
                    }
                } );

                lController.onChange( function( value ) {
                    if(value) {
                        resetScene("lazer");
                        demo = new GAME.Lazer_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.lazer = false;
                    }
                } );

                eController.onChange( function( value ) {
                    if(value) {
                        resetScene("explosion");
                        demo = new GAME.Explosion_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                    }else{
                        scenes.explosion = false;
                    }
                } );

                sdController.onChange( function( value ) {
                    if(value) {
                        resetScene("spaceDemo");
                        demo = new GAME.Assignment_Scene(assetManager, gameObjects, scene, camera);
                    }else{
                        scenes.spaceDemo = false;
                    }
                } );

=======
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
                //demo = new GAME.Alignment_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.Flocking_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.Lazer_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                //demo = new GAME.Explosion_Scene(assetManager, gameObjects, scene, cameraController.getObject());
                demo = new GAME.Assignment_Scene(assetManager, gameObjects, scene, camera);
>>>>>>> origin/master
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

                for(var i in gameObjects) {
                    gameObjects[i].update(delta);

                    if(!gameObjects[i].isAlive){
                        gameObjects.splice(i,1);
                    }
                }

                if(demo)
                    if(demo.update)
                        demo.update(delta);
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        }
};
