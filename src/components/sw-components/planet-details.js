import React from "react";
import ItemDetails, { Record } from "../ItemDetails";
import { WithSwapiService } from "../HocHelpers";

const PlanetDetails = props => {
  return (
    <ItemDetails {...props}>
      <Record field='population' label='Population' />
      <Record field='rotationPeriod' label='Rotation Period' />
      <Record field='diameter' label='Diameter' />
    </ItemDetails>
  );
};

const mapMethodsToProps = swapiService => {
  return {
    getData: swapiService.getPlanet,
    getImageURL: swapiService.getPlanetImage,
  };
};

export default WithSwapiService(mapMethodsToProps)(PlanetDetails);