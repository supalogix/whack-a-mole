let initialState = require("./stub3");
let nullState = require("./helpers/null-state");
let Model = require("@bottomline/model");
let Actions = require("@bottomline/actions");

let model = Model(
    nullState,
    initialState);

let actions = Actions(
    model.present);

actions.whackMole(1)

module.exports = model.data


