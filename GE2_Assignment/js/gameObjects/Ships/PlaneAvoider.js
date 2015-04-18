

GAME.PlaneAvoider = function(){

    var that = this;

    GAME.GameObject.call(this);

    var planeAvoidance = new GAME.PlaneAvoidance(this);
    var wander = new GAME.Wander(this);

    var showfeelers = false;
    var feelerLines = [];

    this.maxSpeed = 50;

    this.setPlanes = function(_planes){
        planeAvoidance.setPlanes(_planes);
    };

    this.showObjects = function(scene){
        wander.addTargetObjects(scene);
        planeAvoidance.createFeelers();

        var feelers = planeAvoidance.getFeelers();

        for(var i in feelers){
            var l = new GAME.LineDrawer();
            l.setPoints([
               that.getPosition(),
                feelers[i]
            ]);

            var line = l.getLine();

            scene.add(line);
            feelerLines.push(line);

            showfeelers = true;
        }
    };

    function updateFeelerLines(){
        var feelers = planeAvoidance.getFeelers();

        for(var i in feelerLines) {
            feelerLines[i].geometry.vertices = [
                that.getPosition(),
                feelers[i]
            ];
            feelerLines[i].geometry.verticesNeedUpdate = true;
        }
    };

    this.updateBehaviours = function(delta){

        wander.update(delta);

        planeAvoidance.update(delta);
        if(showfeelers)
            updateFeelerLines();
    };

};

GAME.PlaneAvoider.prototype = Object.create(GAME.GameObject);
