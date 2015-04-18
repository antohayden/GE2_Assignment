/**
 * Given a list of planes extrude 5 feelers to detect collision
 * Create force to steer gameObject away from plane
 * */


GAME.PlaneAvoidance = function(gameObject){

    var that = this;

    var feelerLength = 200;
    var feelers = [];
    var planes = [];

    function calculateSteeringForce() {

        var steeringForce = new THREE.Vector3();
        var point, closestPoint, closestWallIndex, closestPointDist;
        var line = new THREE.Line3();

        for (var i = 0; i < feelers.length; i++) {

            for (var j = 0; j < planes.length; j++) {

                line.set(gameObject.getPosition(), feelers[i]);

                point = planes[j].intersectLine(line);

                if (point) {
                    if (!closestPoint) {
                        closestWallIndex = j;
                        closestPoint = point;
                        closestPointDist = feelers[i].distanceTo(point);
                    }
                    else {
                        var dist = feelers[i].distanceTo(point);

                        if (dist < closestPointDist) {
                            closestWallIndex = j;
                            closestPointDist = dist;
                            closestPoint = point;
                        }
                    }
                }

            }
            if (closestPoint) {
                var overShoot = feelers[i].clone().sub(closestPoint);
                steeringForce.add(planes[closestWallIndex].normal.clone().multiplyScalar(overShoot.length() * gameObject.velocity.length()));
            }

        }

        return steeringForce;
    };

    this.createFeelers = function(){

        feelers = [];

        //forward
        var feelerBase = gameObject.look.clone().multiplyScalar(feelerLength);

        var f1 = feelerBase.clone();
        f1.applyMatrix4(gameObject.mesh.matrixWorld);
        feelers.push(f1);

        var f2 = feelerBase.clone();
        f2.applyAxisAngle(gameObject.up, Math.PI/4);
        f2.applyMatrix4(gameObject.mesh.matrixWorld);
        feelers.push(f2);

        var f3 = feelerBase.clone();
        f3.applyAxisAngle(gameObject.up, -Math.PI/4);
        f3.applyMatrix4(gameObject.mesh.matrixWorld);
        feelers.push(f3);

        var f4 = feelerBase.clone();
        f4.applyAxisAngle(gameObject.right, Math.PI/4);
        f4.applyMatrix4(gameObject.mesh.matrixWorld);
        feelers.push(f4);

        var f5 = feelerBase.clone();
        f5.applyAxisAngle(gameObject.right, -Math.PI/4);
        f5.applyMatrix4(gameObject.mesh.matrixWorld);
        feelers.push(f5);
    };

    this.setPlanes = function(_planes){
        planes = _planes;
    };

    this.getFeelers = function(){
        return feelers;
    };

    this.update = function(delta){

        that.createFeelers();
        gameObject.applyForce(calculateSteeringForce());

    }


};