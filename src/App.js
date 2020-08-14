import React, { Component } from 'react';
import Header from './Components/UI/Header';
import Aux from './HOC/Auxillary/Auxillary';
import Tracker from './Components/Tracker/Tracker';

class App extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <Tracker />
      </Aux>
    );
  }
}

export default App;
