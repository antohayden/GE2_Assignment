


GAME.DeathState = function(gameObject){

    this.enter = function(){

        var position = gameObject.getPosition();
        var explosion = new GAME.Explosion(position, gameObject.scene);
        gameObject.gameObjects.push(explosion);
        gameObject.scene.remove(gameObject.mesh);

    };

    this.exit = function(){

    };

    this.update = function(delta){

    };

};

