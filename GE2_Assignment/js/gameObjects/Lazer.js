
/*
* Given a gameObject fire a lazer from along it's world forward vector
* */

 GAME.Lazer = function(color, gameObject, scene){

     var that = this;

     var origin = gameObject.getPosition().clone();
     var direction = gameObject.look.clone().applyQuaternion(gameObject.rotation);
     var positionChange = new THREE.Vector3();
     var currentPosition = gameObject.getPosition().clone();
     var speed = 1100;
     var dissipateDistance = 1000;
     var thickness = 2, length = 50;

     var rectShape = new THREE.Shape();
     rectShape.moveTo( 0, 0 );
     rectShape.lineTo( 0, thickness);
     rectShape.lineTo( length, thickness );
     rectShape.lineTo( length, 0 );
     rectShape.lineTo( 0, 0 );

     var rectGeom = new THREE.ShapeGeometry( rectShape );
     rectGeom.computeBoundingSphere();
     if(!color)
        var color =  0xff0000;

     var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: color , side: THREE.DoubleSide} ) ) ;

     rectMesh.position.copy(origin);
     rectMesh.applyMatrix(gameObject.mesh.matrix);
     rectMesh.rotateY(Math.PI/2);

     scene.add( rectMesh );

     this.mesh = rectMesh;

     this.creator = gameObject;

     this.getPosition = function(){
         return currentPosition;
     };

     this.isAlive = true;

     this.update = function(delta){

         positionChange.copy(direction);
         currentPosition.add(positionChange.multiplyScalar(speed * delta));
         rectMesh.position.copy(currentPosition);

         if (origin.distanceTo(currentPosition) > dissipateDistance) {
             that.isAlive = false;
         }

         if (!that.isAlive){
             scene.remove(rectMesh);
         }
     }

};
