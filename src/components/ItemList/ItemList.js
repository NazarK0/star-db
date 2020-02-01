import React, { Component } from "react";

import Spiner from "../Spiner";

import "./ItemList.css";

class ItemList extends Component {
  state = {
    itemList: null,
  };

  renderItems(arr) {
    return arr.map(item => {
      const {id} = item;
      const label = this.props.children(item);

      return (
        <li
          className='list-group-item'
          key={id}
          onClick={() => this.props.onItemSelected(id)}>
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spiner />;
    }

    const items = this.renderItems(itemList);

    return <ul className='item-list'>{items}</ul>;
  }

  componentDidMount() {
    const { getData } = this.props;

    getData().then(itemList => {
      this.setState({
        itemList,
      });
    });
  }
}

export default ItemList;
