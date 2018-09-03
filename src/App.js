import React, { Component } from 'react';
import './App.css';

let mockData = {
  bricks: [
    {
      name: '2x2',
      x: 2,
      y: 2,
      z: 3
    },
    {
      name: '2x4',
      x: 2,
      y: 4,
      z: 3
    },
    {
      name: '2X6',
      x: 2,
      y: 6,
      z: 3
    }
  ]
}

let renderBrick = function renderBrick(brickData) {
  return brickData.name
}

let getRandomBrickIndex = function getRandomBrickIndex() {
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
      color: 'green',
      fontSize: '4rem'
    }




    let brickData = this.state.serverdata.bricks && this.state.serverdata.bricks[this.props.index]
    let brick = brickData && renderBrick(brickData)

    return (
      <div style={defaultStyle}>lego</div>,
      <div>{this.state.serverdata.bricks && brick}</div>
    )
  }
}

class LegoBrick extends AbstractLegoBrick {

}

class App extends Component {

  render() {
    let title = 'Welcome to Legomon';
    let titleStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: '4rem'
    };

    return (
      <div className="App">
        <header style={titleStyle}>{title}</header>
        <LegoBrick index={getRandomBrickIndex()}/>
      </div>
    );
  }
}

export default App;
