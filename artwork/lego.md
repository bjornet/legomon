# Lego brick defenition:
- http://brickarchitect.com/scale/

# React
- https://reactjs.org/docs/thinking-in-react.html

# TODO
- Cleanup function namings

# Bricks

# Badges
## Ruleset
- Many badges might appear at once
- Some badges are NOT compatable.
- List of compatable badges:
    * A (perpendicular): B, C, D
    * B (edge): A, C, D
    * C (summit): A, B
    * D (pillar): A, B
- Bricks must NOT be acompanied by a Badge

# Badges
## Perpendicular

## Summit

## Pillar
* TODO *
- redefine image so that it is clear that you cannot position one pillar piece next to another
- only allow X amount of pillar pieces per (X * Y) amount of pieces [eg. 4 pillars on 100 pieces or so...]

## Edge

## Hang


# DONE (Todos)
- find out how to trigger setState() on one compontent from another <button onClick={updateBrickAndBadges}">
    ANSWER: https://reactjs.org/docs/lifting-state-up.html
