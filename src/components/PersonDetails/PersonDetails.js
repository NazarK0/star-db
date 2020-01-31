import React, { Component } from "react";

import SwapiService from '../../services/SwapiService';

import './PersonDetails.css';
import Spiner from "../Spiner";

class PersonDetails extends Component {
  state = {
    person: null,
    loading: true,
    error: false,
  };

  swapiService = new SwapiService();

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onPersonLoaded = person => {
    this.setState({ person, loading: false, error: false });
  };



  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  render() {
    if (!this.state.person) {
      return <span>Select person from a list</span>;
    }
    const { person, loading } = this.state;

    const spinner = loading ? <Spiner /> : null;
    const content = loading ? null : <PersonView person={person} />;

    return (
      <div className='person-details card'>
        {spinner}
        {content}
      </div>
    );
  }
};

const PersonView = ({ person }) => {
    const { id, name, gender, birthYear, eyeColor } = person;
  return (
    <React.Fragment>
      <img
        className='person-image'
        alt={name}
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />
      <div className='card-body'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Gender </span>
            <span>{gender}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Birth Year </span>
            <span>{birthYear}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Eye Color </span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default PersonDetails;