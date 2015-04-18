

GAME.Separator = function(){

    var that = this;

    GAME.GameObject.call(this);

    var wander = new GAME.Wander(this);
    var separation = new GAME.Separation(this);
    var nearestNeighbours = new GAME.NearestNeighbours(this);
    var rad, radiusSphere;

    this.logIt;

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

    this.maxSpeed = 70;

    this.updateBehaviours = function(delta){

        var f = separation.update(nearestNeighbours.update());

        if(f.length() > 0) {
            that.applyForce(f);
            if(that.logIt)
                console.log("separating");
        }
        else {
            wander.update(delta);
            if(that.logIt)
                console.log("wandering");
        }

        if(radiusSphere) {
            radiusSphere.position.copy(that.getPosition());
            radiusSphere.rotation.copy(that.mesh.rotation);
        }
    };

};

GAME.Separator.prototype = Object.create(GAME.GameObject);
