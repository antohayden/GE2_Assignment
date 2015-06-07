

GAME.ObstacleAvoider = function(){

    var that = this;

    GAME.GameObject.call(this);

    var arrive = new GAME.Arrive(this);
    var OA = new GAME.ObstacleAvoidance(this);
    var pathFollow = new GAME.PathFollow(this);

    var intersectionPoint;

    var pathIndex = 1;

    this.followPath = function(bool){
        pathFollow.followPath = bool;
    };

    this.setObstacles = function(obstaclesArray){
        OA.setObstacles( obstaclesArray );
    };

    this.setPath = function(_path){
        pathFollow.setPath(_path);
    };

    this.maxSpeed = 40;

    this.setIntersectionObject = function(scene){
        var g = new THREE.CubeGeometry(3,3,3);
        var m = new THREE.MeshBasicMaterial( { color: 0xFF0000} );
        intersectionPoint = new THREE.Mesh( g, m );

        intersectionPoint.position = new THREE.Vector3(0,0,0);
        scene.add( intersectionPoint );
    };

    this.updateBehaviours = function(delta){

        if(!arrive.targetReached)
            that.applyForce(arrive.update(delta));

        else if(that.followPath)
            arrive.setTarget(pathFollow.getNextPathTarget());

        that.applyForce(OA.update(delta));

        var p = OA.getIntersectionPoint();
        if(p)
            intersectionPoint.position.copy(p);


    };

};

GAME.ObstacleAvoider.prototype = Object.create(GAME.GameObject);