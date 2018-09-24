import React, { Component } from 'react'
import './App.css'

// bricks
import brickOneRed from './assets/bricks/1/red.svg'
import brickFourRed from './assets/bricks/4/red.svg'
import brickSixRed from './assets/bricks/6/red.svg'
import brickOnePerspectiveRed from './assets/bricks/1/_perspective/red.svg'
import brickTwoPerspectiveRed from './assets/bricks/2/_perspective/red.svg'
import brickFourPerspectiveRed from './assets/bricks/4/_perspective/red.svg'
import brickSixPerspectiveRed from './assets/bricks/6/_perspective/red.svg'

// badges
import perpendicular from './assets/badges/perpendicular.svg'
import edge from './assets/badges/edge.svg'
import summit from './assets/badges/summit.svg'
import pillar from './assets/badges/pillar.svg'
import hang from './assets/badges/hang.svg'

// rare events
import ballerina from './assets/rare-events/ballerina.svg'
import cutthroat from './assets/rare-events/cutthroat.svg'

import monsterTruck from './assets/rare-events/monster-truck.svg'
import minion from './assets/rare-events/minion.svg'
import bling from './assets/rare-events/bling.svg'
import spire from './assets/rare-events/spire.svg'

let mockData = {
  bricks: [
    {
      name: '1x1',
      image: brickOneRed,
      x: 1,
      y: 1,
      z: 3
    },
    {
      name: '1x4',
      image: brickFourRed,
      x: 1,
      y: 4,
      z: 3
    },
    {
      name: '1X6',
      image: brickSixRed,
      x: 1,
      y: 6,
      z: 3
    },
    {
      name: '2x1',
      image: brickOnePerspectiveRed,
      x: 2,
      y: 1,
      z: 3
    },
    {
      name: '2x2',
      image: brickTwoPerspectiveRed,
      x: 2,
      y: 2,
      z: 3
    },
    {
      name: '2x4',
      image: brickFourPerspectiveRed,
      x: 2,
      y: 4,
      z: 3
    },
    {
      name: '2X6',
      image: brickSixPerspectiveRed,
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
      compatibility: [3,4,5]
    },
    {
      id: 2,
      name: 'edge',
      image: edge,
      compatibility: [3,4,5]
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
    },
    {
      id: 5,
      name: 'hang',
      image: hang,
      compatibility: [1,2]
    }
  ],
  rareEvents: [
    {
      name: 'Ballerina',
      defenition: 'Remove 4 bricks from the base of your Legomon (if the construction gets to fragile, remove the rest from the next layer and so on until 4 bricks are peeled of).',
      image: ballerina
    },
    {
      name: 'Cutthroat',
      defenition: 'Split your Legomon vertically into two equally tall parts (place them with 2 dots of LEGO apart).',
      image: cutthroat
    },
    {
      name: 'Monster Truck',
      defenition: 'Put 2 pair of wheels on your monster',
      image: monsterTruck
    },
    {
      name: 'Minion',
      defenition: 'equip the Legomon with a monster minion of choise',
      image: minion
    },
    {
      name: 'Bling',
      defenition: 'Pick 10 decorative pieces of Lego and make the Legomon shine!',
      image: bling
    },
    {
      name: 'Spire',
      defenition: 'Use 5 [?] pieces ... [rules] ... to create a tall spire anywhere on the Legomon.',
      image: spire
    }
  ]
}

class Header extends Component {

  render() {
    let title = 'Welcome to Legomon'
    let titleStyle = {
      display: 'inline-block',
      color: 'dimgray',
      fontSize: '2rem',
      fontFamily: 'monospace',
      margin: '1rem 0'
    }

    let brickCountStyle = {
      position: 'absolute',
      right: '0',
      top: '0',
      color: 'darkslategray',
      background: 'whitesmoke',
      padding: '10px',
      margin: '4px',
      border: '1px solid slategra'
    }

    return (
      <header style={{position: 'relative'}}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={brickCountStyle}>Brickcount: <span>{this.props.brickCount}</span></p>
      </header>
    )
  }
}

class NextBrickButton extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onNextBrickRequest()
  }

  render() {
    let buttonStyle = {
      padding: '16px',
      position: 'absolute',
      background: 'slategray',
      color: 'white',
      border: 'none',
      boxShadow: 'dimgrey 4px 5px 0px 1px',
      left: '-10px',
      opacity: '0.7',
      cursor: 'pointer',
      outline: 'none',
      zIndex: '10'
    }

    return (
      <button disabled={this.props.loading} style={buttonStyle} onClick={this.handleClick}>
        <span>Next Brick</span>
      </button>
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
    return this.state.serverdata.bricks && Math.floor(Math.random() * this.state.serverdata.bricks.length)
  }

  renderBrick(brickData) {
    let styleImage = {
      minHeight: '15vh',
      maxWidth: '30vw'
    }

    let styleDimensionsWrapper = {
      position: 'absolute',
      width: '100%',
      top: '0',
      color: 'slategray'
    }

    let styleDimension = {
      margin: '0 1rem'
    }

    return brickData.image ?
      <div className="current-lego-brick">
        <img style={styleImage} src={brickData.image} alt="Current Lego Brick" />
        <p style={styleDimensionsWrapper}>
          <span style={styleDimension}>x: {brickData.x}</span>
          <span style={styleDimension}>y: {brickData.y}</span>
          <span style={styleDimension}>z: {brickData.z}</span>
        </p>
      </div>
      : brickData.name
  }

  render() {
    let defaultStyle = {
      background: 'whitesmoke',
      padding: '10vh 0',
      minHeight: '17vh',
      position: 'relative'
    }


    let randomIndex = this.getRandomBrickIndex()
    let brickData = this.state.serverdata.bricks && this.state.serverdata.bricks[randomIndex]
    let brick = brickData && this.renderBrick(brickData)

    return (
      <div style={defaultStyle}>
        {!this.props.loading ? this.state.serverdata.bricks && brick : <Loader />}
      </div>
      
    )
  }
}

class LegoBrick extends AbstractLegoBrick {}

class Badge extends Component {

  constructor(props) {
    super(props)
    this.state = { serverdata: {} }
    this.badgeData = []
    this.getBadgeData = this.getBadgeData.bind(this)
  }

  componentDidMount() {
    this.setState({serverdata: mockData})
  }

  getBadgeData(badges, currentBadges = [], noBadgeMultiplier = 1.25) {
    let indexCount = badges.length * noBadgeMultiplier
    let randomBadgeIndex = Math.floor(Math.random() * indexCount)
    let randomBadge = badges[randomBadgeIndex]

    if(randomBadge) {
      currentBadges.push( randomBadge )

      let nextSetOfBadges = badges.filter(b => {
        return randomBadge.compatibility.includes(b.id)
      })

      currentBadges = this.getBadgeData(nextSetOfBadges, currentBadges, noBadgeMultiplier * 1.5)
    }

    this.badgeData = currentBadges

    return currentBadges
  }

  render() {

    let styleBadge = {
      margin: '1rem',
      display: 'inline-block'
    }

    let styleImage = {
      borderRadius: '50%',
      border: '2px solid lightgray',
      boxShadow: 'lightgrey 1px 1px 4px 1px inset'
    }

    let styleName = {
      fontWeight: 'bold',
      fontSize: '1.5em',
      lineHeight: '1em',
      color: 'rgba(144, 144, 144, 0.2)',
      textShadow: '1px 3px 2px white, 0 0 0 #dcdcdc, 1px 3px 2px white'
    }

    let styleNoRules = {
      display: 'inline-block',
      padding: '70px',
      color: 'slategray'
    }

    let results = (this.state.serverdata.badges && !this.props.loading) ? this.getBadgeData(this.state.serverdata.badges) : this.badgeData

    return (
      <div className="Badge-badges" style={{minHeight: '165px'}}>
        {
          (this.state.serverdata.badges && results.length !== 0)  ? results.map(result => {
            return (
            <div key={result.id} className="Badge-badge" style={styleBadge} data-loading={this.props.loading ? 'loading' : ''}>
              <img
                src={result.image} 
                alt={result.name} 
                style={styleImage}
                className="Badge-image" />
              <div className="Badge-name" style={styleName}>{result.name}</div>
            </div>
            )
          }) : <span style={styleNoRules}>Legomon anarchy, no rulez!</span>
        }
      </div>
    )
  
  }
}

class RareEvent extends Component {

  constructor(props) {
    super(props)
    this.state = {serverdata: {}}
  }

  componentDidMount() {
    this.setState({serverdata: mockData})
  }

  getRareEvent(rareEvents) {
    let randomIndex = Math.floor(Math.random() * rareEvents.length)
    return rareEvents[randomIndex]
  }

  render() {
    let defaultStyle = {
      position: 'absolute',
      left: '0px',
      top: '0px',
      right: '0px',
      bottom: '0px',
      background: 'lightslategray',
      padding: '10rem',
      color: 'white'
    }

    let defaultStyleImage = {
      borderRadius: '50%',
      border: '2px solid lightgray',
      margin: '1rem',
      boxShadow: 'lightgrey 1px 1px 4px 1px inset',
      background: 'white'
    }

    let defaultStyleAside = {
      position: 'absolute',
      right: '-80px',
      top: '50px',
      transform: 'rotate(35deg)',
      background: 'white',
      color: 'slategray',
      padding: '10px 120px',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    }

    let rareEvent = this.state.serverdata.rareEvents && this.getRareEvent(this.state.serverdata.rareEvents)
    
    return (
      <div style={defaultStyle}>
        {
          rareEvent &&
          <div>
            <aside style={defaultStyleAside}>Rare Event</aside>
            <h2>{rareEvent.name}</h2>
            <img src={rareEvent.image} alt={rareEvent.name} style={defaultStyleImage} />
            <p>{rareEvent.defenition}</p>
          </div>
        }
      </div>
    )
  }
}

class Loader extends Component {

  render() {
    return (
      <div className="Loader">
        <div className="Loader__bar"></div>
        <div className="Loader__bar"></div>
        <div className="Loader__bar"></div>
        <div className="Loader__bar"></div>
        <div className="Loader__bar"></div>
        <div className="Loader__ball"></div>
      </div>
    )
  }
}

class Help extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState((x) => { return {active: !this.state.active} })
  }

  render() {
    let styleHelpButton = {
      background: 'white',
      color: 'red',
      outline: 'none',
      position: 'absolute',
      right: '0',
      cursor: 'pointer',
      // right: '-10px',
      top: '277px',
      borderRadius: '50%',
      minWidth: '10vw',
      minHeight: '10vw',
      border: '2px solid red',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      zIndex: '10'
    }

    let styleHelpBody = {
      display: 'none',
      position: 'absolute',
      backgroundColor: 'darkslategray',
      color: 'white',
      bottom: '0px',
      padding: '1rem',
      fontFamily: 'monospace',
      textAlign: 'initial',
      width: '60vw',
      top: '0',
      zIndex: '20',
      right: '-9999px'
    }

    let styleHelpBodyActive = {
      display: 'initial',
      right: '0'
    }

    console.log(this.state.active);

    return (
      <div className="Help-wrapper">
        <button style={styleHelpButton} onClick={this.handleClick}>?</button>
        <div style={this.state.active ? {...styleHelpBody, ...styleHelpBodyActive} : styleHelpBody}>
          <h3>Rules</h3>
          <ol>
            <li>Find the big Lego brick shown above in your own pile of Lego</li>
            <li>Place this brick upon your Legomon acording to the rule badges</li>
            <li>Spin the randomizer to get the next brick</li>
          </ol>     
        </div>
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.handleNextBrick = this.handleNextBrick.bind(this)
    this.state = {
      brickCount: 1,
      loadingNextBrick: false
    }

    this.title = 'Legomon'

    this.rareEventBrickLowerLimit = 20
    this.rareEventChance = 0.1

    // [[test]] rare events
    // this.rareEventBrickLowerLimit = 1
    // this.rareEventChance = 0.5
  }

  componentDidMount() {
    document.title = this.title
  }

  handleNextBrick() {
    let increment = 1
    let loadDuration = 900

    this.setState(state => (
      { loadingNextBrick: true }
    ))

    document.title = this.title + ` - Loading`

    // find a way to animate through React.
    // why? to wait for animation to finnish to trigger setState as a callback
    setTimeout(() => {
      this.setState(state => (
        { 
          brickCount: state.brickCount + increment,
          loadingNextBrick: false
        }
      ))

      document.title = this.title

    }, loadDuration)

  }

  render() {
    let rareEvent = (this.state.brickCount >= this.rareEventBrickLowerLimit && this.rareEventChance > Math.random() && !this.state.loadingNextBrick)
    return (
      <div className="App">
        <Header brickCount={this.state.brickCount} />
        <NextBrickButton loading={this.state.loadingNextBrick} onNextBrickRequest={this.handleNextBrick} />
        <Help />
        {
          rareEvent ?
          <RareEvent />
          : 
          <div>
            <LegoBrick loading={this.state.loadingNextBrick} />
            <Badge loading={this.state.loadingNextBrick} />
          </div>
        }
      </div>
    )
  }
}

export default App
