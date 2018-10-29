let nullState = {
    learn: () => {}
};

let _initialState = {
    status: 'stopped',
    timeLeft: 30,
    score: 0,
    currentFrame: 0,
    futureFrameTasks: [ ],
    moles: [
        { status: 'down', },
        { status: 'down', },
        { status: 'down', },

        { status: 'down', },
        { status: 'down', },
        { status: 'down', },

        { status: 'down', },
        { status: 'down', },
        { status: 'down', },
    ]
} ;

module.exports = (
    state = nullState, 
    initialState = null) => 
{
    let model = {};

    initialState = initialState || _initialState;

    model.data = { ...initialState };

    model.present = function(action) {		
        
        let acceptors = {
            "start": acceptStart,
            "stop": acceptStop,
            "reset": acceptReset,
            "executeFrameTasks": acceptExecuteFrameTasks,
            "whackMole": acceptWhackMole
        };

        // These console logs enable live debugging
        //console.log('data before', model.data);
        //console.log('action', action);

        if(action.type in acceptors)
        {
            model.data = acceptors[action.type](
                model.data, 
                action);
        }

        //console.log('data after', model.data);

        state.learn(model) ;
    }

    return model;

    function acceptReset(data, action)
    {
        return {
            ...initialState,
            moles: downMoles()
        }
    }

    function acceptStart(data, action)
    {
        if(data.status === "stopped")
        {
            return {
                ...data,
                status: "starting",
            }
        }

        return data;
    }

    function acceptStop(data, action)
    {
        return {
            ...data,
            status: "stopped"
        }
    }


    function acceptExecuteFrameTasks(data, action)
    {
        if(data.status === "starting")
            data.status = "running"

        data.currentFrame = data.currentFrame + 1;

        return action.payload.reduce((data, task) => {
            let acceptors = {
                "decrementTime": acceptDecrementTime,
                "scheduleMoles": acceptScheduleMoles,
                "moveMoleUp": acceptMoveMoleUp,
                "moveMoleDown": acceptMoveMoleDown,
                "endGame": acceptEndGame
            };

            if(task.type in acceptors)
            {
                return acceptors[task.type](
                    data,
                    task
                );
            }

            return data;
        }, data)
    }

    function acceptDecrementTime(data, task)
    {
        return {
            ...data,
            timeLeft: data.timeLeft - 1
        }
    }

    function acceptScheduleMoles(data, task)
    {
        const futureFrameTasks = [
            ...data.futureFrameTasks,
            ...task.payload
        ]

        return {
            ...data,
            futureFrameTasks
        }
    }

    function acceptMoveMoleUp(data, task)
    {
        if(data.status === 'running')
        {
            data.moles[task.payload.moleId].status = 'up'

            let futureFrameTasks = data.futureFrameTasks.filter(item => {
                return !(item.type === task.type
                    && item.payload.moleId === task.payload.moleId
                    && item.payload.frame === task.payload.frame)
            });

            data.futureFrameTasks = futureFrameTasks
        }

        return data
    }

    function acceptWhackMole(data, action)
    {
        if(data.status === 'running')
        {
            data.score = data.score + 1;

            let futureFrameTasks = data.futureFrameTasks.filter(task => {
                return !(task.type === "moveMoleDown"
                    && task.payload.moleId === action.payload.moleId)
            })

            data.futureFrameTasks = futureFrameTasks;
            data.moles[action.payload.moleId].status = 'down';
        }
        
        return data
    }

    function acceptMoveMoleDown(data, task)
    {
        if(data.status === 'running')
        {
            data.moles[task.payload.moleId].status = 'down'

            const futureFrameTasks = data.futureFrameTasks.filter(item => {
                return !(item.type === task.type
                    && item.payload.moleId === task.payload.moleId
                    && item.payload.frame === task.payload.frame)
            });

            data.futureFrameTasks = futureFrameTasks
        }

        return data
    }

    function acceptEndGame(data, task)
    {
        data.status = 'gameOver';

        return data
    }

    function downMoles()
    {
        return [
            { status: 'down', },
            { status: 'down', },
            { status: 'down', },

            { status: 'down', },
            { status: 'down', },
            { status: 'down', },

            { status: 'down', },
            { status: 'down', },
            { status: 'down', },
        ]
    }
}
