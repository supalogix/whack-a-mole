# How to use Whack-A-Mole for fun and profit

Whack-A-Mole is a simple javascript app designed to demonstrate my working 
knowledge of basic web development.

It is very bare-bones. It only uses styles for layout. I didn't bother
to make it look pretty. I provided sparse documentation, but the 
structure of the code and the variable names should provide enough
insight to my original intention.

You can build and serve the file with the following commands
```bash
yarn build
yarn serve
```

You can run unit tests with the following command
```bash
yarn test
```

## Theory of Operation

We manage state using the sam (state-action-model) pattern.  You can read about
it at the following website: http://sam.js.org/. I home-brewed an implementation
instead of using a framework. 

We use yarn workspaces so we can treat a directory structure like an npm
registry

We use markov models as the basis for our unit tests. This enables us to slowly
build and test the application in an incremental way.

We use the concept of a game loop and game frames to push the game forward 
because it's the most straight forward way to manage game state. A task
manager will create or remove tasks for future frames in the game, and a 
task executioner will execute the tasks for the respective frames.