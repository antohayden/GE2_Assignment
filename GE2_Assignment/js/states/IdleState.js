

GAME.IdleState = function(gameObject){

    this.enter = function(){

        gameObject.behaviours = [];

        gameObject.behaviours.push(gameObject.behavioursList.planeAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.obstacleAvoidance);
        gameObject.behaviours.push(gameObject.behavioursList.wander);
        gameObject.behaviours.push(gameObject.behavioursList.separation);
        gameObject.behaviours.push(gameObject.behavioursList.cohesion);
        gameObject.behaviours.push(gameObject.behavioursList.alignment);
        gameObject.maxSpeed = 150;
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

        if(gameObject.nearestEnemy){
            if(     gameObject.nearestEnemy
                &&  gameObject.health >= gameObject.nearestEnemy.health
                &&  checkIfInFront()
            ){
                gameObject.stateMachine.switchState(new GAME.AttackState(gameObject));
            }
            else {
                gameObject.stateMachine.switchState(new GAME.EvadeState(gameObject));
            }
        }

    };

};
