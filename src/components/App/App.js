import React, { Component } from "react";
import "./App.css";
import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import ErrorIndicator from "../ErrorIndicator";
import {DummySwapiService, SwapiService} from "../../services";
import ErrorBoundary from "../ErrorBoundary";
import {SwapiServiceProvider} from '../swapi-service-context';
import { PeoplePage, PlanetsPage, StarshipsPage } from "../Pages";

class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log("current service", Service.name);
      return {
        swapiService: new Service()
      }
    });    
  }

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
      <RandomPlanet updateInterval = {false} />
    ) : null;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className='stardb-app'>
            <Header onServiceChange={this.onServiceChange}/>
            {planet}
            <button
              className='toggle-planet btn btn-warning btn-lg'
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <PeoplePage/>
            <PlanetsPage/>
            <StarshipsPage/>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
