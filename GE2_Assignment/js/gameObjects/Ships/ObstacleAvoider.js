

GAME.ObstacleAvoider = function(){

    var that = this;

    GAME.GameObject.call(this);

    var seek = new GAME.Seek(this);
    var OA = new GAME.ObstacleAvoidance(this);
    var path, numPathPoints;
    var intersectionPoint;

    var pathIndex = 1;

    this.followPath = false;

    function setNewPathTarget(){
        that.setTarget(path[pathIndex % numPathPoints]);
        pathIndex++;
    };

    this.setObstacles = function(obstaclesArray){
        OA.setObstacles( obstaclesArray );
    };

    this.setPath = function(_path){
        path = _path.getPoints();
        numPathPoints = path.length;
        setNewPathTarget();
    };

    this.maxSpeed = 80;

    this.setTarget = function(target){
        seek.setTarget(target);
    };

    this.setIntersectionObject = function(scene){
        var g = new THREE.CubeGeometry(3,3,3);
        var m = new THREE.MeshBasicMaterial( { color: 0xFF0000} );
        intersectionPoint = new THREE.Mesh( g, m );

        intersectionPoint.position = new THREE.Vector3(0,0,0);
        scene.add( intersectionPoint );
    };

    this.updateBehaviours = function(delta){

        if(!seek.targetReached)
            seek.update(delta);

        else if(that.followPath)
            setNewPathTarget();

        OA.update(delta);
        var p = OA.getIntersectionPoint();
        if(p)
            intersectionPoint.position.copy(p);


    };

};

GAME.ObstacleAvoider.prototype = Object.create(GAME.GameObject);