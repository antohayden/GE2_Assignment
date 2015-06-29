
GAME.Controls = function(cameraController){

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var mousedown = false;

    var velocity = new THREE.Vector3();
    var speed = 20;
    var multFactor = 1;

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

            case 16: //shift
                multFactor = 10;
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

            case 16: //shift
                multFactor = 1;
                break;
        }
    };

    init();

    function init() {
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    }

    var baseLookVector = new THREE.Vector3(0,0,-1);
    var baseUpVector = new THREE.Vector3(0,1,0);
    var look = new THREE.Vector3();
    var right = new THREE.Vector3();

    this.update = function(delta){

        look = cameraController.getDirection(baseLookVector);
        right = look.clone().cross(baseUpVector);

        if (moveForward){
            cameraController.getObject().position.add(look.clone().multiplyScalar(multFactor * speed * delta));
        }
        if (moveBackward){
            cameraController.getObject().position.add(look.clone().negate().multiplyScalar(multFactor * speed * delta));
        }
        if (moveRight){
            cameraController.getObject().position.add(right.clone().multiplyScalar(multFactor * speed * delta));
        }
        if (moveLeft){
            cameraController.getObject().position.add(right.clone().negate().multiplyScalar(multFactor * speed * delta));
        }

        //direction = lookVector.clone().applyQuaternion(cameraController.getObject().quaternion);

        //cameraController.getObject().translateX(velocity.x * delta * multFactor);
        //cameraController.getObject().translateZ(velocity.z * delta * multFactor);
        //cameraController.getObject().position.add(direction);

    }

};