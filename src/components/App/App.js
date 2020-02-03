import React, { Component } from "react";

import "./App.css";

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import ErrorIndicator from "../ErrorIndicator";
import PeoplePage from "../PeoplePage";
import SwapiService from "../../services/SwapiService";

import ItemList from '../ItemList';
import Row from "../Row";
import ItemDetails, { Record } from "../ItemDetails";

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

    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;
    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageURL={getPersonImage}>
        <Record field='gender' label='Gender'/>
        <Record field='eyeColor' label='Eye Color'/>
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails itemId={5} getData={getStarship} getImageURL={getStarshipImage}>
        <Record field='model' label='Model'/>
        <Record field='length' label='Length'/>
        <Record field='costInCredits' label='Cost'/>
      </ItemDetails>
    );

    return (
      <div>
        <Header />
        {planet}

        <button
          className='toggle-planet btn btn-warning btn-lg'
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
{/*
        <PeoplePage />

*/}
        <Row left = {starshipDetails} right={personDetails}/>
      </div>
    );
  }
}

export default App;
