/*
 * Given a leader gameObject, maintain a relative position given by offset
 * local to the leader gameObject
 * */

GAME.OffsetPursuit = function(gameObject){

    var that = this;

    var leader, offset;
    var distance, lookAhead;
    var toOffset = new THREE.Vector3();
    var localOffset = new THREE.Vector3();
    var target = new THREE.Vector3();
    var arrive = new GAME.Arrive(gameObject);

    this.setLeader = function(gameObject){
        leader = gameObject;
    };

    this.setOffset = function(vec){
        offset = vec.clone();
    };

    this.update = function(delta){

        localOffset.copy(offset);
        localOffset.applyQuaternion(leader.rotation);

        target.copy(leader.getPosition());
        target.add(localOffset);

        toOffset.copy(target);
        toOffset.sub(gameObject.getPosition());
        distance = toOffset.length();

        lookAhead = (distance / gameObject.maxSpeed);
        target.add(leader.velocity.clone().multiplyScalar(lookAhead));

        arrive.setTarget(target);
        return (arrive.update(delta));
    };

};
