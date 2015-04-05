/*
* Some code taken from pointer lock controls example on Three.js examples
* (Controls and setup)
* */

GAME = function(){
        var camera, scene, renderer;
        var cameraController, controls;
        var assetManager;
        var ships = [];
        var loaded = false;
        var prevTime;

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


            $(document).on("assetsLoaded", function(){

                path = new GAME.Path();
                path.drawPath(scene, 0xFF0000);

                var seeker = new GAME.Seeker();
                seeker.mesh = assetManager.createShipMesh();
                seeker.setPosition(new THREE.Vector3(300,100,0));
                seeker.setPath(path);
                scene.add(seeker.mesh);
                ships.push(seeker);

                var fleer = new GAME.Fleer();
                fleer.mesh = assetManager.createShipMesh();
                fleer.setPosition(new THREE.Vector3(100,0,100));
                fleer.setTarget(seeker.getPosition());
                scene.add(fleer.mesh);
                ships.push(fleer);

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
            if(delta > 0.1)
                delta = 0.1;

            controls.update(delta);
            prevTime = time;

            if(loaded) {
                for(var i in ships)
                    ships[i].update(delta);
            }

        }

        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        }



};
