


GAME.AttackState = function(gameObject){

    var currentTarget = gameObject.nearestEnemy;
    var lazerInterval = 2, lazerCounter = 0;

    this.enter = function(){

        gameObject.behaviours = [];

        gameObject.behaviours.push(gameObject.behavioursList.planeAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.obstacleAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.pursue);
        gameObject.behaviours.push(gameObject.behavioursList.separation);
        gameObject.behaviours.push(gameObject.behavioursList.cohesion);
        gameObject.behaviours.push(gameObject.behavioursList.alignment);
        gameObject.setTargetObject(currentTarget);
        gameObject.maxSpeed = 275;
    };

    this.exit = function(){

    };

    this.update = function(delta){

        if(!gameObject.isAlive){
            gameObject.stateMachine.switchState(new GAME.DeathState(gameObject));
        }
        else if(!gameObject.nearestEnemy){
            gameObject.stateMachine.switchState(new GAME.IdleState(gameObject));
        }
        else if(gameObject.health < 3 || gameObject.neighbourEnemies.length > (gameObject.neighbourAllies.length + 2)){
            gameObject.stateMachine.switchState(new GAME.EvadeState(gameObject));
        }
        if(gameObject.nearestEnemy != currentTarget){
            currentTarget = gameObject.nearestEnemy;
            gameObject.setTargetObject(currentTarget);
        }

        lazerCounter += delta;

        if (lazerCounter >= lazerInterval) {

            var color;

            if(gameObject.objectName === "A")
                color = 0xff0000;
            else
                color = 0x0000ff;

            var lazer = new GAME.Lazer(color, gameObject, gameObject.scene);
            gameObject.gameObjects.push(lazer);
            lazerCounter = 0;
        }


    };

};

