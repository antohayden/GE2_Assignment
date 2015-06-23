/*
* Given a list of gameObjects in scene, create a list of those within a certain radius
* of provided gameObject
* */

GAME.NearestNeighbours = function(gameObject){

    var that = this;
    var neighborhoodRadius = 50; //default
    var gameObjects = [];
    var neighbours;

    function inRange(position, _gameObject){

        var adjustedRadius =
            _gameObject.mesh.geometry.boundingSphere.radius +
            neighborhoodRadius;

        if(position.distanceTo(_gameObject.getPosition()) <= neighborhoodRadius)
            return true;
        else
            return false;
    };

    function findNeighboursInRange(){

        neighbours = [];
        var l = gameObjects.length;
        var pos = gameObject.getPosition();

        for(var i = 0; i < l; i++){

            if(gameObjects[i].collidable){
                //object in range and is object checked against
                if (inRange(pos, gameObjects[i]) && gameObjects[i] != gameObject) {
                    neighbours.push(gameObjects[i]);
                }
            }

        };

        return neighbours;
    };

    this.setNeighbourhoodRadius = function(val){
        neighborhoodRadius = val + gameObject.mesh.geometry.boundingSphere.radius;
    };

    this.setGameObjects = function(gameObjectsArray){
        gameObjects = gameObjectsArray;
    };

    this.update = function(){
        return findNeighboursInRange();
    };




};