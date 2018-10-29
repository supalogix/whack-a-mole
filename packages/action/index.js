module.exports = (present) => {
    let actions = {};

    actions.initialize = (payload) => payload;

    actions.start = function() {
        const action = {
            type: "start"
        };
        present(action);
        return false;
    };

    actions.stop = function() {
        const action = {
            type: "stop"
        };
        present(action);
        return false; 
    }

    actions.pause = function() {
        const action = {
            type: "pause"
        }
        present(action);
        return false; 
    }

    actions.reset = function(data) {
        const action = {
            type: "reset"
        };
        present(action);
        return false;
    }

    actions.executeFrameTasks = tasks => {
        const action = {
            type: "executeFrameTasks",
            payload: tasks
        }
        present(action);
        return false;
    };

    actions.whackMole = (moleId) => {
        const action = {
            type: "whackMole",
            payload: {
                moleId 
            }
        }
        present(action);
        return false;
    }

    actions.decrementTime = () => {
        present({
            type: "decrementTime"
        });
        return false;
    }

    actions.moveMoleUp = (moleId) => {
        present({
            type: "moveMoleUp",
            payload: {
                moleId
            }
        });
        return false;
    }

    actions.moveMoleDown = (moleId) => {
        present({
            type: "moveMoleDown",
            payload: {
                moleId
            }
        });
        return false;

    }

    actions.scheduleDecision = (moleId, milliseconds) => {
        present({
            type: "scheduleMole",
            payload: {
                moleId,
                milliseconds
            }
        });

    }

    return actions;
}