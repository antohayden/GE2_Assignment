/*
* Path for game Object to follow
* */

GAME.Path = function(){

    var points = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,-150,-300),
        new THREE.Vector3(300,-100,0),
        new THREE.Vector3(0,100,0),
        new THREE.Vector3(0,100,-300),
        new THREE.Vector3(300,300,0),
        new THREE.Vector3(0,0,0)
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

    this.createCirclularPath = function(numPoints, radius, origin){

        var degree = 360 / numPoints;
        var radian = degree * (Math.PI / 180);
        var points = [];

        for(var i = 0; i < numPoints; i++){
            var x = origin.x + radius * Math.cos(radian * i);
            var y = origin.y + radius * Math.sin(radian * i);
            var z = origin.z;
            var point = new THREE.Vector3(x,y,z);
            points.push(point);
        }

        //close loop
        points.push(points[0]);

        return points;

    };

};
