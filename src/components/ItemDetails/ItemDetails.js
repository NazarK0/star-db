import React, { Component } from "react";

import SwapiService from '../../services/SwapiService';

import './ItemDetails.css';

const Record = ({item, field, label}) => {
  console.log(item)
  return (
    <li className='list-group-item'>
      <span className='term'>{label} </span>
      <span>{item[field]}</span>
    </li>
  );
}

export { Record };

class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
    error: false,
  };

  swapiService = new SwapiService();

  onError = () => {
    this.setState({
      error: true,
    });
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageURL } = this.props;

    if (!itemId) {
      return;
    }
    
    getData(itemId)
      .then((item) => {
       this.setState({item, 
        image: getImageURL(item),
        error: false });
  })
      .catch(this.onError);
  }

  render() {
    if (!this.state.item) {
      return <span>Select item from a list</span>;
    }
    const { item, image } = this.state;
    console.log(image);

    return (
      <div className='item-details card'>
        <ItemView item={item} image = {image} children={this.props.children} />
      </div>
    );
  }
};

const ItemView = ({ item, image, children}) => {
  const { name } = item;
  return (
    <React.Fragment>
      <img className='item-image' alt={name} src={image} />
      <div className='card-body'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          {React.Children.map(children, child => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default ItemDetails;