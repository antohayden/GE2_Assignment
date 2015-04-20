

GAME.IdleState = function(gameObject){

    this.enter = function(){

        gameObject.behaviours = [];

        gameObject.behaviours.push(gameObject.behavioursList.planeAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.obstacleAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.wander);
        gameObject.behaviours.push(gameObject.behavioursList.separation);
        gameObject.behaviours.push(gameObject.behavioursList.cohesion);
        gameObject.behaviours.push(gameObject.behavioursList.alignment);
        gameObject.maxSpeed = 250;
    };

    this.exit = function(){

    };

    this.update = function(delta){

        if(!gameObject.isAlive){
            gameObject.stateMachine.switchState(new GAME.DeathState(gameObject));
        }

        if(gameObject.nearestEnemy){
            if(gameObject.nearestEnemy && (gameObject.health >= gameObject.nearestEnemy.health)){
                gameObject.stateMachine.switchState(new GAME.AttackState(gameObject));
            }
            else {
                gameObject.stateMachine.switchState(new GAME.EvadeState(gameObject));
            }
        }

    };

};
