
GAME.OffsetPursuit_Scene = function(assetManager, gameObjects, scene){

    var num_followers = 14;
    var offset_distance_X = 30;
    var offset_distance_Z = 70;
    var num_in_first_row = 2;

    var path = new GAME.Path();
    path.setPoints(path.createCirclularPath(6, 300, new THREE.Vector3(0,0,-500)));
    path.drawPath(scene, 0x0000FF);

    var leader = new GAME.Arriver();
    leader.mesh = assetManager.createShipMesh();
    leader.setPosition(new THREE.Vector3(0,0,0));
    leader.setPath(path);
    leader.followPath(true);

    scene.add(leader.mesh);
    gameObjects.push(leader);

    var positions = set_triangle_positions();

    for(var i = 0; i < num_followers; i++) {

        var follower = new GAME.OffsetPursuer();
        follower.mesh = assetManager.createShipMesh();
        follower.setPosition(new THREE.Vector3(0, 0, 0));
        follower.setLeader(leader);
        follower.setOffset(positions[i]);

        scene.add(follower.mesh);
        gameObjects.push(follower);
    }

    function set_triangle_positions(){

        function getNumRows(){

            var k = 1;
            var j = num_in_first_row;

            while(j < num_followers)
            {
                j += num_in_first_row + 1;
                k++;
            }

            return k;
        };

        var num_rows = getNumRows();
        var num_in_row = num_in_first_row;
        var positions = [];
        var start_position = leader.getPosition();

        for(var i = 0; i < num_rows ; i++){
            var pos = start_position.clone();
            pos.add(new THREE.Vector3(0,0,i * offset_distance_Z));
            pos.add(new THREE.Vector3(-offset_distance_X * (num_in_row - 1), 0, 0));

            for(var j = 0; j < num_in_row; j ++){
                var newPos = pos.clone();
                newPos.add(new THREE.Vector3(j * (2 * offset_distance_X), 0, 0));
                positions.push(newPos);
            }
            num_in_row++;
        }

        return positions;
    };

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set( 0, 100, 0 );
    scene.add( directionalLight );

};


