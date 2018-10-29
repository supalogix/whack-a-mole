let expect = require("chai").expect;
let stubs = require("@bottomline/stubs");

it("requirement 1", () => {
    expect(stubs.stub1.status).to.equal("stopped");
})

it("requirement 2", () => {
    expect(stubs.stub2.status).to.equal("starting");
    expect(stubs.stub3.status).to.equal("running");
})

it("requirement 3", () => {
    expect(stubs.stub4.status).to.equal("stopped");
})

it("requirement 4", () => {
    expect(stubs.stub3.timeLeft).to.equal(29);
    expect(stubs.stub3.currentFrame).to.equal(1);
})

it("requirement 5", () => {
    expect(stubs.stub3.futureFrameTasks).to.deep.equal([
        {
            "type": "moveMoleUp",
            "payload": {
                "moleId": 0,
                "frame": 3
            }
        },
        {
            "type": "moveMoleDown",
            "payload": {
                "moleId": 0,
                "frame": 4
            }
        }
    ])
})

it("requirement 6", () => {
    expect(stubs.stub7.score).to.equal(1);
})

it("requirement 7", () => {
    expect(stubs.stub6.status).to.equal("stopped");
})

it("requirement 8", () => {
    expect(stubs.stub5.status).to.equal("starting");
})