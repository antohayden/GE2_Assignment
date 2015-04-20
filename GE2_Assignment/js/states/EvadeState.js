


GAME.EvadeState = function(gameObject){

    var currentTarget = gameObject.nearestEnemy;

    this.enter = function(){

        gameObject.behaviours = [];

        gameObject.behaviours.push(gameObject.behavioursList.planeAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.obstacleAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.evade);
        gameObject.behaviours.push(gameObject.behavioursList.separation);
        gameObject.behaviours.push(gameObject.behavioursList.cohesion);
        gameObject.behaviours.push(gameObject.behavioursList.alignment);
        gameObject.maxSpeed = 350;
        gameObject.setTargetObject(currentTarget);
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
        else if(gameObject.nearestEnemy != currentTarget){
            currentTarget = gameObject.nearestEnemy;
            gameObject.setTargetObject(currentTarget);
        }

        if(gameObject.nearestEnemy && (gameObject.health >= gameObject.nearestEnemy.health))
        {
            gameObject.stateMachine.switchState(new GAME.AttackState(gameObject));
        }
    };

};


