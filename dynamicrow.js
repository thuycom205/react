import React, {useState, useCallback} from 'react';

class DItem extends React.Component {
  render() {
      return (
          <tr>
              <td>{this.props.item.name} <input type="text" value={this.props.item.name} /></td>
              <td>{this.props.item.color} <select onChange={this.props.onChange}> <option> minute</option> <option>hour</option><option>day</option></select></td>
              <td>${this.props.item.price} <input type="text" value={this.props.item.price} /></td>
          </tr>
      );
  }
}



class Dtable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      prices: [
        {id: 35, duration: 1, unit: 'minute', price: 20},
        {id: 42, duration: 2, unit: 'day', price: 15},
        {id: 56, duration: 3, unit: 'day', price: 25},
        {id: 71, duration: 4, unit: 'day', price: 5},
        {id: 72, duration: 5, unit: 'day', price: 5},
    ]
  };
  }
  handleOnchange(item) {
    alert(item.id);
  }
  createTable() {
    return  this.state.prices.map((item, key) =>
             <DItem item={item} key={item.id}  onChange={() => this.handleOnchange(item)}/>
         )
   }

   shoot() {

   this.setState({
    count: 2,
    prices: [
      {id: 35, duration: 1, unit: 'minute', price: 20},
      {id: 42, duration: 2, unit: 'day', price: 15},
      {id: 56, duration: 3, unit: 'day', price: 25},
      {id: 71, duration: 4, unit: 'day', price: 5},
      {id: 72, duration: 5, unit: 'day', price: 12225},
      {id: 75, duration: 5, unit: 'day', price: 1999999},

  ]
   
  });
}
  render() {
 

    return (
      <table className="game">
        <tbody>
      {this.createTable()}
      </tbody>
      <tfoot> 
      <tr><td> <button onClick={() =>this.shoot()}>add</button></td></tr>
      </tfoot>
      </table>
    );
  }
}
export default Dtable;
