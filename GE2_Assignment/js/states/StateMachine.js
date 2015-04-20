

GAME.StateMachine = function(initialState){

    var that = this;

    this.currentState = initialState;
    this.currentState.enter();

    this.update = function(delta){

        that.currentState.update(delta);
    };

    this.switchState = function(newState){

        if(that.currentState){
            that.currentState.exit();
        }
        that.currentState = newState;

        that.currentState.enter();
    };

};