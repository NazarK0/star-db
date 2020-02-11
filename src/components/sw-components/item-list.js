import React from "react";
import ItemList from "../ItemList";
import { WithData, WithSwapiService, compose, withChildFunction } from "../HocHelpers";

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => (
  <span>
    {name} ({model})
  </span>
);

const mapPersonMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPeople,
  };
};

const mapPlanetMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPlanets,
  };
};

const mapStarshipMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllStarships,
  };
};

const PersonList = compose(
  WithSwapiService(mapPersonMethodsToProps),
  WithData,
  withChildFunction(renderName))
  (ItemList);

const PlanetList = compose(
  WithSwapiService(mapPlanetMethodsToProps),
  WithData,
  withChildFunction(renderName))
  (ItemList);

const StarshipList = compose(
  WithSwapiService(mapStarshipMethodsToProps),
  WithData,
  withChildFunction(renderModelAndName))
  (ItemList);

export { PersonList, PlanetList, StarshipList };
