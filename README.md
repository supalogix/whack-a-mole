# How to use Whack-A-Mole for fun and profit

Whack-A-Mole is a simple javascript app designed to demonstrate my working 
knowledge of basic web development.

It is very bare-bones. It only uses styles for layout. I didn't bother
to make it look pretty. I provided sparse documentation, but the 
structure of the code and the variable names should provide enough
insight to my original intention.

With the following commands you can (a) install, (b) build, and (c) serve the app
```bash
yarn install
yarn build
yarn serve
```

Alternatively, if you have docker installed then you can use docker compose to 
run a containerized build 
```
docker-compose up
```

We setup the docker-compose.yml file to map to the local machines 8080 port. 
Ensure that that port is available.

You can run unit tests with the following command
```bash
yarn install
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