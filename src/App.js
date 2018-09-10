import React, { Component } from 'react'
import './App.css'

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

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onNextBrickRequest();
  }

  render() {
    let title = 'Welcome to Legomon'
    let titleStyle = {
      display: 'inline-block',
      color: 'dimgray',
      fontSize: '2rem',
      fontFamily: 'monospace',
      margin: '1rem 0'
    }
    let buttonStyle = {
      padding: '16px',
      position: 'absolute',
      background: 'slategray',
      color: 'white',
      border: 'none',
      boxShadow: 'dimgrey 4px 5px 0px 1px',
      left: '-10px',
      bottom: '-33px',
      opacity: '0.7',
      cursor: 'pointer',
      outline: 'none'
    }

    return (
      <div style={{position: 'relative'}}>
        <button style={buttonStyle} onClick={this.handleClick}>
          Next Monster Brick
        </button>
        <h1 style={titleStyle}>{title}</h1>
      </div>
    )
  }
}

class AbstractLegoBrick extends Component {

  constructor(props) {
    super(props)
    this.state = {serverdata: {}}
  }

  componentDidMount() {
    this.setState({serverdata: mockData})
  }

  getRandomBrickIndex() {
    return this.state.serverdata.bricks && Math.floor((Math.random() * this.state.serverdata.bricks.length))
  }

  render() {
    let defaultStyle = {
      background: 'whitesmoke',
      padding: '10vh 0'
    }

    let renderBrick = function renderBrick(brickData) {
      let defaultImgStyle = {
        minHeight: '15vh'
      }
      return brickData.image ? <img style={defaultImgStyle} src={brickData.image} alt="Current Lego Brick" /> : brickData.name
    }
    let randomIndex = this.getRandomBrickIndex()
    let brickData = this.state.serverdata.bricks && this.state.serverdata.bricks[randomIndex]
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

  constructor(props) {
    super(props)
    this.state = {serverdata: {}}
  }

  componentDidMount() {
    this.setState({serverdata: mockData})
  }

  render() {

    let defaultStyle = {
      borderRadius: '50%',
      border: '2px solid lightgray',
      margin: '1rem',
      boxShadow: 'lightgrey 1px 1px 4px 1px inset'
    }

    let getBadgesData = function getBadgeData(badges, currentBadges = [], noBadgeMultiplier = 1.25) {
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

    let results = this.state.serverdata.badges && getBadgesData(this.state.serverdata.badges)

    return (
      <div className="badges" style={{minHeight: '140px'}}>
        {this.state.serverdata.badges && results.map(function(result) {
          return <img key={result.id} src={result.image} alt={result.name} style={defaultStyle}/>
        })}
      </div>
    )
  
  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.handleNextBrick = this.handleNextBrick.bind(this);
  }

  handleNextBrick() {
    this.setState({updatedXxx: Date.now()});
  }

  render() {
    let footerStyle = {
      backgroundColor: 'darkslategray',
      color: 'white',
      minHeight: '200px',
      bottom: '0px',
      padding: '1rem',
      fontFamily: 'monospace',
      textAlign: 'initial'
    }


    return (
      <div className="App">
        <Header onNextBrickRequest={this.handleNextBrick} />
        <LegoBrick />
        <Badges/>
        <footer style={footerStyle}>
          <h3>Rules</h3>
          <ol>
            <li>Find the big Lego brick shown above in your own pile of Lego</li>
            <li>Place this brick upon your Legomon acording to the rule badges</li>
            <li>Spin the randomizer to get the next brick</li>
          </ol>     
        </footer>
      </div>
    )
  }
}

export default App
