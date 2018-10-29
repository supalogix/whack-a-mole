let initialState = require("./stub4");
let nullState = require("./helpers/null-state");
let Model = require("@bottomline/model");
let Actions = require("@bottomline/actions");

let model = Model(
    nullState,
    initialState);

let actions = Actions(
    model.present);

actions.reset()

module.exports = model.data


