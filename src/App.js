import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Wish you were here?</h1>
        </header>
        <Map />
        <Footer />
      </div>
    );
  }
}

export default App;
