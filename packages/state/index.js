let nullView = {
    display: () => {}
};

module.exports = (view = nullView, middlewares = []) => {
    let state =  {};

    state.represent = function(model) {
        let representation = 'oops... something went wrong, the system is in an invalid state' ;

        representation = getRepresentation(
            view, 
            model.data);

        view.display(representation) ;
    }

    state.postProcessAction = (model) => {
        middlewares.forEach(mw => mw(model));
    }

    state.learn = function(model) {
        state.represent(model)
        state.postProcessAction(model) ;
    }

    return state;
}

function createAction (type, props) 
{
    const _props = JSON.stringify(props);
    return `return actions.${type}(${_props});`
}

function getRepresentation(view, data)
{
    let actions = {
        onStart: createOnStart(data.status),
        onStop: createOnStop(data.status),
        onReset: createOnReset(data.status),
        createOnWhackMole: (moleId) => 
            createAction('whackMole', moleId)
    };

    return view.render(data, actions);
}

function createOnStart(status)
{
    if(status === "stopped")
        return createAction('start', {})
    
    return 'return false;'
}

function createOnStop(status)
{
    if(status === "running")
        return createAction('stop', {})
    
    return 'return false;'
}

function createOnReset(status)
{
    if(status === "stopped"
        || status === "gameOver")
        return createAction('reset', {})
    
    return 'return false;'
}