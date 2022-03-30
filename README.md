This is the software side of a project to be able to play digital Magic the Gathering akin to real table top play!
It works by having a robust simulator of Magic the Gathering that lets you do most everything you could do in paper.

Limitations:
There is no rules engine, this software trusts that the user understands the game and can play, because this software
if used to play against paper cards can't see those paper cards any realistic rule engine is impossible. The goal of this
software is to have helper functions that help you do very common tasks (e.g. tapping or untapping a card).

Board set up:
```
| Command Zone | Attack and Stack (temporary)            |
|--------------|-----------------------------------------|
| Deck         | Creatures                               |
| Graveyard    | Non-Creature Permanents                 |
| Exile        | Hand (until exported to another window) |
```

To do:
  Add a second window for private information (for example: hand, deck searches, etc.)
  Add deck helper functions such as but not limited to, draw, mill, scry.
  Separate the attacking area of the board from the stack.
  Add non-commander formats