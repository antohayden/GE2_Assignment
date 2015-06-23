


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
        gameObject.behaviours.push(gameObject.behavioursList.wander);
        gameObject.maxSpeed = 90; //make evading a little faster
        gameObject.setTargetObject(currentTarget);
    };

    this.exit = function(){

    };


    function checkIfInFront(){

        var heading = gameObject.nearestEnemy.getPosition().clone().sub(gameObject.getPosition());
        var dot = gameObject.look.clone().dot(heading);

        if(dot >= 0)
            return true;
        else
            return false;

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
        else if(    gameObject.nearestEnemy
                &&  gameObject.health >= gameObject.nearestEnemy.health
                &&  checkIfInFront())
        {
            gameObject.stateMachine.switchState(new GAME.AttackState(gameObject));
        }
    };

};


