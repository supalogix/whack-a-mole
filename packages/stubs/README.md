# How to use stubs

In order to ease testing we provide stubs for application state. We generate
application state by manually simulating actions that a user might perform.
We also restrict ourselves to creating stub states by transitioning 
through actions. This is called a markov process.

Use the graphviz diagram below to document and visualize the dependencies

```graphviz
digraph finite_state_machine {
    pad = 0.25

    stub1 -> stub2 [ label = "actions.start" ]
    stub2 -> stub3 [ label = "actions.executeTaskFrame" ]
    stub3 -> stub4 [ label = "actions.pause" ]
    stub4 -> stub5 [ label = "actions.start" ]
    stub4 -> stub6 [ label = "actions.reset" ]
    stub3 -> stub7 [ label = "actions.whackMole" ]
}
```