
GAME.Controls = function(cameraController){

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var velocity = new THREE.Vector3();
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
                multFactor = 5;
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

    this.update = function(delta){

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        if ( moveForward ) velocity.z -= 400.0 * delta;
        if ( moveBackward ) velocity.z += 400.0 * delta;

        if ( moveLeft ) velocity.x -= 400.0 * delta;
        if ( moveRight ) velocity.x += 400.0 * delta;

        cameraController.getObject().translateX( velocity.x * delta * multFactor);
        cameraController.getObject().translateZ( velocity.z * delta  * multFactor);

    }

};