# Lego brick defenition:
- http://brickarchitect.com/scale/

# React
- 5 steps: HOW TO BUILD A REACT APP: https://reactjs.org/docs/thinking-in-react.html
- RENDER GETS TRIGGERED. HOW AND WHY: http://lucybain.com/blog/2017/react-js-when-to-rerender/

# Redux (handle state / store)
- https://redux.js.org/

# CSS
- try css-in-js: https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc
- redo height declaration. Make sure the layout does not give a jumpy impression

# Bricks
- update brickCount accordingly to data in rareEvent
    * ie: 
    * `ballerina` has to hold an absolute value for how many bricks should be removed (total - ballerinaRemoveAmount)
    * `cuttroath` does not remove any bricks

- Find a way to write out if the depth [x-axis] is a [1] or a [2]


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

## Perpendicular

## Summit

## Pillar
- rework illustration to support putting brick below ground lvl as well

## Edge

## Hang

# Rare Events
- instead of Bricks and Badges
- eg. 
    `Cut in half!`:     Split the Legomon vertically into two equally tall parts (place them with 2 dots of LEGO apart).
    `Ballerina`:        Remove half of the bricks that touches ground.
    `Lego Man`:         Place a Lego Character anywhere on the Legomon
    `Wheels`:           Place wheels on the legomon
    `10xdecoration`:    Pick any arty bricks and decorate the Legomon with 'em!
