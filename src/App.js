import React, { Component } from "react";
import { Route } from "react-router-dom";
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import "./App.css";


class App extends Component {
  render() {
    return (
      <div className="App h-100">
        <main className="h-100">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
