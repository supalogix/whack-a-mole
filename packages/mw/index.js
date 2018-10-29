let actions = require("@bottomline/actions");

module.exports = () => {
    let timer = null;

    return model => {
        if(model.data.status === "starting")
        {
            timer = setInterval(() => {
                actions(model.present)
                    .executeFrameTasks(
                        createFrameTasks(model.data))
            }, 1000)
        }
        else if(
            model.data.status === "stopped"
            || model.data.status === "gameOver")
        {
            clearInterval(timer)
        }
    }
}

function createFrameTasks(data)
{
    let tasks = [
        {
            type: "decrementTime"
        },
    ]

    tasks.push(ScheduleFutureTasks(data))
    tasks = tasks.concat(ExecuteScheduledTasks(data))

    if(data.timeLeft === 1)
    {
        tasks.push({
            type: "endGame"
        })
    }

    return tasks;
}

function ExecuteScheduledTasks(data)
{
    return data.futureFrameTasks.filter(task => {
        if(task.type === "moveMoleUp"
            && task.payload.frame === data.currentFrame)
        {
            return true;
        }

        if(task.type === "moveMoleDown"
            && task.payload.frame === data.currentFrame)
        {
            return true;
        }

        return false;
    })
}

function ScheduleFutureTasks(data)
{
    let tasks = []
    let moles = findMolesNotScheduled(
        data.futureFrameTasks);

    moles.forEach(mole => {
        let upDelta = Math.ceil(Math.random() * 4);
        let downDelta = Math.ceil(Math.random() * 4);

        let upFrame = data.currentFrame 
            + upDelta
        let downFrame = data.currentFrame 
            + upDelta 
            + downDelta

        tasks.push({
            type: "moveMoleUp",
            payload: {
                moleId: mole,
                frame: upFrame
            }
        })
        tasks.push({
            type: "moveMoleDown",
            payload: {
                moleId: mole,
                frame: downFrame
            }
        })
    })

    return {
        type: "scheduleMoles",
        payload: tasks
    }
}

/**
 * While the game runs, we need to find the moles
 * not scheduled so we can schedule them again
 * in the future
 * @param {Array} scheduledTasks 
 */
function findMolesNotScheduled(
    scheduledTasks) 
{
    let set = createMoleSet()
    scheduledTasks.forEach(task => {
        let isValid = task.type === "moveMoleUp"
            || task.type === "moveMoleDown"

        if(isValid)
        {
            set.delete(task.payload.moleId)
        }
    })

    return [...set]
}

/**
 * We need a utility function to generate 
 * a set that represents all the moles
 */
function createMoleSet()
{
    let set = new Set();
    for(let i = 0; i < 9; i++)
        set.add(i);

    return set;
}