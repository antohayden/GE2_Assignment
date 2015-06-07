

GAME.Alignment_example = function(){

    var that = this;

    GAME.GameObject.call(this);

    var alignment = new GAME.Alignment(this);
    var nearestNeighbours = new GAME.NearestNeighbours(this);
    var rad, radiusSphere;

    this.setNeighbourhoodRadius = function(radius){
        rad = radius;
        nearestNeighbours.setNeighbourhoodRadius(radius);
    };

    this.showRadius = function(scene, color){
        var g = new THREE.SphereGeometry( rad,32,32);
        var m = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
        radiusSphere = new THREE.Mesh( g, m );
        radiusSphere.position = that.mesh.position;
        scene.add(radiusSphere);
    };

    this.setGameObjects = function(_gameObjects){
        nearestNeighbours.setGameObjects(_gameObjects);
    };

    this.maxSpeed = 40;

    this.updateBehaviours = function(delta){

        var f = alignment.update(nearestNeighbours.update());
        that.applyForce(f);

        if(radiusSphere) {
            radiusSphere.position.copy(that.getPosition());
            radiusSphere.rotation.copy(that.mesh.rotation);
        }
    };

};

GAME.Alignment_example.prototype = Object.create(GAME.GameObject);
