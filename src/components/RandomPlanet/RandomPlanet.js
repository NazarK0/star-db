import React, { Component } from "react";
import PropTypes from 'prop-types';
import SwapiService from "../../services/SwapiService";
import ErrorIndicator from "../ErrorIndicator";

import "./RandomPlanet.css";
import Spiner from "../Spiner";

class RandomPlanet extends Component {
  constructor(props) {
    super(props);

    const {updateInterval} = props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  swapiService = new SwapiService();

  static defaultProps = {
  updateInterval: 60*1000,
};

static propTypes ={
  updateInterval: PropTypes.number
}

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false, error: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className='random-planet jumbotron rounded'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img
        className='planet-image'
        alt={name}
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div className='planet-content'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Population </span>
            <span>{population}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Rotation Period </span>
            <span>{rotationPeriod}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Diametr </span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default RandomPlanet;
