/*
* Additional Math Functions
* */

 Math.clamp = function(num, min, max){
    var temp;

    num < min ? temp = min : temp = num;
    num > max ? temp = max : temp = num;

    return temp;
};

Math.randomBetween = function(min, max){
    return Math.random() * (max - min) + min;
};

THREE.Vector3.ZERO = new THREE.Vector3();