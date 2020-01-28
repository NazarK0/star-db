class SwapiService {
  _apiBase = "https://swapi.co/api/";
  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(
        `Could not fetch ${url}, received ${response.status}`
      );
    }
    return await response.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`people/`);
    return res.results;
  }

  getPerson(id) {
    return this.getResource(`people/${id}/`);
  }
}

const swapi = new SwapiService();
swapi.getAllPeople()
.then(body => console.log(body));
