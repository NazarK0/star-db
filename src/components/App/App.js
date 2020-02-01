import React, { Component } from "react";

import "./App.css";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import ErrorIndicator from "../ErrorIndicator";
import PeoplePage from "../PeoplePage";
import SwapiService from "../../services/SwapiService";

import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails'

class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? (
      <RandomPlanet />
    ) : null;

    return (
      <div>
        <Header />
        {planet}

        <button
          className='toggle-planet btn btn-warning btn-lg'
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>

        <PeoplePage />
       
      </div>
    );
  }
}

export default App;
