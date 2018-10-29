let initialState = require("./stub2");
let nullState = require("./helpers/null-state");
let Model = require("@bottomline/model");
let Actions = require("@bottomline/actions");

let model = Model(
    nullState,
    initialState);

let actions = Actions(
    model.present);

actions.executeFrameTasks([
    {
        type: "decrementTime",
    },
    {
        type: "scheduleMoles",
        payload: [
            {
                type: "moveMoleUp",
                payload: {
                    moleId: 0,
                    frame: 3
                }
            },
            {
                type: "moveMoleDown",
                payload: {
                    moleId: 0,
                    frame: 4
                }
            }
        ]
    }
]);

module.exports = model.data


