/*
* For drawing lines between vector points
* */
GAME.LineDrawer = function(){

    var line;

    var material = new THREE.LineBasicMaterial({
        color: 0xFF0000
    });

    var geometry = new THREE.Geometry();

    this.addPoint = function(v){
        geometry.vertices.push(v);
    };

    this.setPoints = function(vArray){
        geometry.vertices = vArray;
    };

    this.setColor = function(hex){

        var color = new THREE.Color(hex);
        material.color = color;
    };

    this.getLine = function(){
        line = new THREE.Line(geometry, material);
        return line;
    };

};
