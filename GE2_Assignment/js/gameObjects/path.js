/*
* Path for game Object to follow
* */

GAME.Path = function(){

    var points = [
        new THREE.Vector3(1000,0,-2000),
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(100,0,200)
    ];

    this.addPoint = function(v){
        points.push(v);
    };

    this.setPoints = function(vArray){
        points = vArray;
    };

    this.drawPath = function(scene, hexColor){

        var lineDrawer = new GAME.LineDrawer();
        lineDrawer.setPoints(points);
        if(hexColor)
            lineDrawer.setColor(hexColor);

        scene.add(lineDrawer.getLine());
    };

    this.getPoints = function(){
        return points;
    };

};
