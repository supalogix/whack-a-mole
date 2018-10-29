module.exports = (display) => {
    let view = {};

    let createAction = (type, props) => {
        const _props = JSON.stringify(props);
        return `return actions.${type}(${_props});`
    }

    // This is code duplication. It should be 
    // abstracted out, but ain't no-one got time
    // for that.
    view.init = function(data) {
        let actions = {
            onStart: createAction('start', {}),
            onStop: createAction('stop', {}),
            onReset: createAction('reset', {}),
            createOnWhackMole: (moleId) => 
                createAction('whackMole', {moleId})
        };
        return view.render(data, actions) ;
    }

    view.render = function(data, actions) {
        const children = data.moles.map((mole, i) => { 
            const status = (mole.status === 'up')
                ? 'M'
                : '&nbsp;';

            const onClick = (mole.status === 'up')
                ? actions.createOnWhackMole(i)
                : 'return false';

            return `<div 
                class="mole"
                onClick="${onClick}"
                id="mole-${i}">
                    ${status}
            </div>`
        }).join('');

        const startClass = StartClass(data.status)
        const stopClass = StopClass(data.status)
        const resetClass = ResetClass(data.status)

        return (`
                <div 
                    id="info_board" 
                    class="info_board">
                    <div 
                        id="status" 
                        class="info">
                            Status: ${data.status}
                    </div>
                    <div 
                        id="time" 
                        class="info">
                            Time Left: ${data.timeLeft}
                    </div>
                    <div 
                        id="score" 
                        class="info">
                            Score: ${data.score}
                    </div>
                </div>
                <div 
                    id="controls" 
                    class="controls">
                    <div 
                        id="start" 
                        class="${startClass}"
                        onClick="${actions.onStart}">
                            Start
                    </div>
                    <div 
                        id="stop" 
                        class="${stopClass}"
                        onClick="${actions.onStop}">
                            Stop
                    </div>
                    <div 
                        id="reset" 
                        class="${resetClass}"
                        onClick="${actions.onReset}">
                            Reset
                    </div>
                </div>
                <div id="cabinet">
                    ${children}
                </div>
            `);

    }

    //display the state representation
    view.display = display;

    return view;
}

function StartClass(status)
{
    if(status === "stopped")
        return "button"
    else
        return "button--disabled"
}

function StopClass(status)
{
    switch(status)
    {
        case "running":
        case "starting":
            return "button"
        default:
            return "button--disabled"

    }
}

function ResetClass(status)
{
    switch(status)
    {
        case "gameOver":
        case "stopped":
            return "button"
        default:
            return "button--disabled"

    }
}