import React, { Component } from "react";
import "./PeoplePage.css";

import ItemList from "../ItemList";
import PersonDetails from "../ItemDetails";
import ErrorBoundary from "../ErrorBoundary";
import SwapiService from "../../services/SwapiService";
import Row from "../Row";

class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: null,
  };

  onPersonSelected = selectedPerson => {
    this.setState({ selectedPerson });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundary>
    );

    return (
        <Row left={itemList} right={personDetails} />
    );
  }
}

export default PeoplePage;
