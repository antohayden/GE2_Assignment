
/*
* Given a gameObject fire a lazer from along it's world forward vector
* */

 GAME.Lazer = function(color, gameObject, scene){

     var that = this;

     var origin = gameObject.getPosition().clone();
     var direction = gameObject.look.clone().applyQuaternion(gameObject.rotation);
     var positionChange = new THREE.Vector3();
     var speed = 1100;
     var dissipateDistance = 1000;
     var thickness = 2, length = 30;

     var rectShape = new THREE.Shape();
     rectShape.moveTo( 0, 0 );
     rectShape.lineTo( 0, thickness);
     rectShape.lineTo( length, thickness );
     rectShape.lineTo( length, 0 );
     rectShape.lineTo( 0, 0 );

     var rectGeom = new THREE.ShapeGeometry( rectShape );
     var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000 , side: THREE.DoubleSide} ) ) ;

     rectMesh.position.copy(origin);
     rectMesh.applyMatrix(gameObject.mesh.matrix);
     rectMesh.rotateY(Math.PI/2);

     scene.add( rectMesh );

     var currentPosition = gameObject.getPosition().clone();

     this.isAlive = true;

     this.update = function(delta){

             positionChange.copy(direction);
             currentPosition.add(positionChange.multiplyScalar(speed * delta));
             rectMesh.position.copy(currentPosition);

             if (origin.distanceTo(currentPosition) > dissipateDistance) {
                 that.isAlive = false;
                 scene.remove(rectMesh);
             }
     }

};
