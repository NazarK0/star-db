export default class DummySwapiService {
  _people = [
    {
      id: 1,
      name: "Ivan",
      gender: "male",
      birthYear: "1996",
      eyeColor: "blue",
    },
    {
      id: 2,
      name: "Oleg",
      gender: "male",
      birthYear: "2006",
      eyeColor: "gray",
    },
    {
      id: 3,
      name: "Ira",
      gender: "female",
      birthYear: "1999",
      eyeColor: "green",
    },
    {
      id: 4,
      name: "Daryna",
      gender: "female",
      birthYear: "2001",
      eyeColor: "green",
    },
  ];

  _planets = [
    {
      id: 1,
      name: "Earth",
      population: 7000000,
      rotationPeriod: 24,
      diameter: 64000,
    },
    {
      id: 5,
      name: "Saturn",
      population: 0,
      rotationPeriod: 324,
      diameter: 780000,
    },
    {
      id: 3,
      name: "Venus",
      population: 0,
      rotationPeriod: 25,
      diameter: 53000,
    },
  ];

  _starships = [
    {
      id: 11,
      name: "dragon",
      model: "I",
      manufacturer: "Space X",
      costInCredits: "145000000",
      length: 43,
      crew: 2,
      passengers: 0,
      cargoCapacity: 5800,
    },
    {
      id: 2,
      name: "NASA starship",
      model: "67b",
      manufacturer: "NASA USA",
      costInCredits: "995000000",
      length: 443,
      crew: 24,
      passengers: 90,
      cargoCapacity: 70800,
    },
  ];

  getAllPeople = async() => {
    return await this._people;
  };

  getPerson = async id => {
    return await this._people.find((item )=> id === item.id ) ;
  };

  getAllPlanets = async() => {
    return await this._planets;
  };

  getPlanet = async id => {
    return await this._planets.find(item => id === item.id);
  };

  getAllStarships = async() => {
    return await this._starships;
  };

  getStarship = async id => {
    return await this._starships.find(item => id === item.id);
  };

  getPersonImage = ({ id }) => {
    return `https://picsum.photos/200/300`;
  };

  getStarshipImage = ({ id }) => {
    return `https://picsum.photos/200/300`;
  };

  getPlanetImage = ({ id }) => {
    return `https://picsum.photos/200/300`;
  };
}
