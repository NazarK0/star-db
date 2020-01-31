import React, { Component } from "react";

import SwapiService from '../../services/SwapiService';
import Spiner from '../Spiner'

import './ItemList.css';

class ItemList extends Component {

  swapiService = new SwapiService()

  state = {
    peopleList: null,
  }

  renderItems(arr){
    return arr.map(({ id, name }) => {
      return (
        <li className='list-group-item' key={id}
          onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      )
    })
  }


  render(){
    const {peopleList} = this.state;

    if(!peopleList){
      return <Spiner/>
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className='item-list'>
        {items}
      </ul>
    );
  }

  componentDidMount(){
    this.swapiService.getAllPeople()
    .then((peopleList) => {
      this.setState({
        peopleList
      })
    })
  }
};

export default ItemList;
