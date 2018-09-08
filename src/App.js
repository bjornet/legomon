import React, { Component } from 'react';
import './App.css';

// bricks
import brickTwoRed from './assets/bricks/2/red.svg'
import brickFourRed from './assets/bricks/4/red.svg'
import brickSixRed from './assets/bricks/6/red.svg'

// badges
import summit from './assets/badges/summit.svg'
import edge from './assets/badges/edge.svg'
import pillar from './assets/badges/pillar.svg'
import perpendicular from './assets/badges/perpendicular.svg'


let mockData = {
  bricks: [
    {
      name: '2x2',
      image: brickTwoRed, // use xyz instead of this name
      x: 2,
      y: 2,
      z: 3
    },
    {
      name: '2x4',
      image: brickFourRed,
      x: 2,
      y: 4,
      z: 3
    },
    {
      name: '2X6',
      image: brickSixRed,
      x: 2,
      y: 6,
      z: 3
    }
  ],
  badges: [
    {
      id: 1,
      name: 'perpendicular',
      image: perpendicular,
      compatibility: [2,3,4]
    },
    {
      id: 2,
      name: 'edge',
      image: edge,
      compatibility: [1,3,4]
    },
    {
      id: 3,
      name: 'summit',
      image: summit,
      compatibility: [1,2]
    },
    {
      id: 4,
      name: 'pillar',
      image: pillar,
      compatibility: [1,2]
    }
  ]
}

let renderBrick = function renderBrick(brickData) {
  let defaultImgStyle = {
    minHeight: '20vh'
  }
  return brickData.image ? <img style={defaultImgStyle} src={brickData.image} alt="Current Lego Brick" /> : brickData.name
}

let getRandomBrickIndex = function getRandomBrickIndex() {
  // console.log('getRandomBrickIndex', Math.floor((Math.random() * mockData.bricks.length)))
  return Math.floor((Math.random() * mockData.bricks.length))
}

class AbstractLegoBrick extends Component {

  constructor(props) {
    super(props)
    this.state = {serverdata: {}}
  }

  componentDidMount() {
    this.setState({serverdata: mockData})
  }

  render() {
    let defaultStyle = {
      background: 'whitesmoke',
      padding: '4rem 0'
    }
    let brickData = this.state.serverdata.bricks && this.state.serverdata.bricks[this.props.index]
    let brick = brickData && renderBrick(brickData)

    return (
      <div style={defaultStyle}>
        {this.state.serverdata.bricks && brick}
      </div>
    )
  }
}

class LegoBrick extends AbstractLegoBrick {}

class Badges extends Component {

  render() {

    let defaultStyle = {
      borderRadius: '50%',
      border: '2px solid lightgray',
      margin: '1rem',
      boxShadow: 'lightgrey 1px 1px 4px 1px inset'
    }

    let getBadgeData = function getBadgeData(badges, currentBadges = [], noBadgeMultiplier = 1.25) {
      let indexCount = badges.length * noBadgeMultiplier
      let randomBadgeIndex = Math.floor((Math.random() * indexCount))
      let randomBadge = badges[randomBadgeIndex]

      if(randomBadge) {
        currentBadges.push( randomBadge )

        let nextSetOfBadges = badges.filter(b => {
          return randomBadge.compatibility.includes(b.id)
        })

        currentBadges = getBadgeData(nextSetOfBadges, currentBadges, noBadgeMultiplier * 1.5)
      }

      return currentBadges
    }

    let getBadges = function getBadges() {
      /**
       * TODO
       * 
       * 1. Count badges
       * 2. Decide on how many badges to present 
       *    (in case of 4 badges: often only 1, likly to get 2 or 0, unlikly to get 3)
       * 3. Get random index from that count
       * 4. Fetch badge from the randomizer
       * 5. Generate Html and return it
       * 
       *     {
       *       id: 1,
       *       name: 'perpendicular',
       *       compatibility: [2,3,4]
       *     }
       */
      let allBadges = mockData.badges
      let badges = getBadgeData(allBadges)

      return badges
    }



    let results = getBadges()
    return (
      <div className="badges">
        {results.map(function(result) {
          return <img key={result.id} src={result.image} alt={result.name} style={defaultStyle}/>;
        })}
      </div>
    )
  
  }

}

class App extends Component {

  render() {
    let title = 'Welcome to Legomon';
    let titleStyle = {
      color: 'dimgray',
      fontSize: '2rem',
      fontFamily: 'monospace',
      margin: '1rem 0'
    };

    return (
      <div className="App">
        <header style={titleStyle}>{title}</header>
        <LegoBrick index={getRandomBrickIndex()}/>
        <Badges/>
      </div>
    );
  }
}

export default App;
