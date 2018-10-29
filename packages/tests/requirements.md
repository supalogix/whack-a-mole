# Requirements

## Requirement 1
```gherkin
When the player first opens the page
Then the game shall be in a stopped state.
```

## Requirement 2
```gherkin
When the player clicks on the start button for the first time
Then the game shall start.
```

## Requirement 3
```gherkin
Given the player is playing the game
When the player clicks the stop button
Then the game should stop
```

## Requirement 4
```gherkin
When the player is playing the game
Then the game should decrement the timer every second.
```

## Requirement 5
```gherkin
When the player is playing the game
Then the game shall make moles randomly appear and disappear.
```

## Requirement 6
```gherkin
Given the player is playing the game 
When the player hits a mole
Then the game shall increment the score by one.
```

## Requirement 7
```gherkin
Given the player has paused the game
When the player restarts the game
Then the game shall restart itself 
```

## Requirement 8
```gherkin
Given the player has paused the game
When the player presses the start button
Then the game shall resume
```