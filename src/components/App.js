import React from 'react';
import '../App.css';
import Grid from './Grid.js';
import Display from './Display.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Display/>
        <Grid/>
      </div>
    );
  }
}

export default App;