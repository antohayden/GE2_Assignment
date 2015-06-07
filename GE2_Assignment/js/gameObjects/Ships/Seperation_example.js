

GAME.Separator_example = function(){

    var that = this;

    GAME.GameObject.call(this);

    var wander = new GAME.Wander(this);
    var separation = new GAME.Separation(this);

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

        var n = nearestNeighbours.update();

        if(n.length > 0) {
            var f = separation.update(n);
            that.applyForce(f);
        }
        else {
            that.applyForce(wander.update(delta));
        }

        if(radiusSphere) {
            radiusSphere.position.copy(that.getPosition());
            radiusSphere.rotation.copy(that.mesh.rotation);
        }
    };

};

GAME.Separator_example.prototype = Object.create(GAME.GameObject);
