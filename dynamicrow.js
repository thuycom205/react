import React, {useState, useCallback} from 'react';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  Form,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
  Select,
} from '@shopify/polaris';
class DItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item:{
      duration : 1,
      unit :'hour',
      price : 10
    }};

 
  }

  static getDerivedStateFromProps(props, state) {
   return {item: props.value };
 }

  onChangePrice( e) {
    let oldPirce = this.state.item;
    oldPirce.price = e;
    this.setState({item: oldPirce})

   
  }

  onChangeUnit( ev) {
      // let oldPirce = this.state.item;
      // oldPirce.price = e;
      // this.setState({item: oldPirce})
  
     
    }
  onRemoveItem( e)  {
console.log(e);   
this.props.onRemove(e);
  }

  render() {
    const durationName = "reantalprice[]['duration'][]";
    const priceName = "reantalprice[]['price'][]";
    console.log(this);

    const options = [
      {label: 'Minute', value: 'minute'},
      {label: 'Day', value: 'day'},
    ];
      return (
          <tr>
             
               <td>
              <TextField
                value={this.state.item.price}
                label=""
                placeholder="example@email.com"
                onChange={(ev) => this.onChangePrice( ev)}
              />
              </td>
              <td>
              <Select
                label=""
                options={options}
                onChange={(ev) => this.onChangeUnit(ev)}
                value={this.state.item.unit}
              />
                </td>
                <td>
              <TextField
                value={this.state.item.price}
                label=""
                placeholder="example@email.com"
                onChange={(ev) => this.onChangePrice( ev)}
              />
              </td>
              <td> <button  onClick={(ev) => this.onRemoveItem(this.props.value)}>Remove</button></td>
          </tr>
      );
  }
}



class Dtable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      count: 72,
      prices: this.props.defaultValue
  };

  // this.setState({
  //   count: 72,
  //   prices:this.props.value
  // }
    
  //);
  }

  componentDidMount() {
    console.log('rpc');
    // return window.rpc.query({
    //     model: 'sale.order',
    //     method: 'search_read',
    //     args: [
    //       [['user_id', '=', [10]]],
    //       ['id', 'name', 'created_date', 'partner_id'],
    //   ],
    // }, {
    //     shadow: true,
    // }).then(function (credit) {
    //     console.log('credit');
    //     console.log(credit);
    // });
  //   window.odoo.define('frontdesk.rental', function (require) {
  //     'use strict';
  //     var core = require('web.core');
  //     require('web.dom_ready');
  
  // //var AbstractAction = require('web.Widget');
  
  // //var x = new AbstractAction();
  
  //     var rpc = require('web.rpc');
  //     console.log('rpc');
  //     return rpc.query({
  //         model: 'project.project',
  //         method: 'read',
  //         args: [0],
  //     }, {
  //         shadow: true,
  //     }).then(function (credit) {
  //         console.log('credit');
  //     });
  //     console.log(' end rpc');

  
  // });
  

  }
  handleOnchange(item) {
    // item.price = 78;
    // this.setState({
    //   count:current_id,
    //   prices: prices,
     
    // });
  }

  handleDurationChange() {

  }

  handlePriceChange(item) {
  }
  handleOnRemove(item){
  let  prices  = this.state.prices;
  let newPrices =[];
  for (var i = 0; i < prices.length ; i++) {
    console.log(prices[i].id);

    console.log(prices[i].id);
    if (item.id != prices[i].id) {
      newPrices.push( prices[i]);
     
        
    } else {
      alert('remove complate');
    }

  }
  
  this.setState({
    prices  : newPrices
    });

  }
  createTable() {
    return  this.state.prices.map((item, key) =>
             <DItem value={item} key={item.id}  onChange={() => this.handleOnchange(item)}  onRemove={() => this.handleOnRemove(item)} />
         )
   }

   shoot() {
   let prices = this.state.prices;
    let current_id = this.state.count + 1;
   prices.push({id: current_id, duration: 1, unit:'minute' , price: 0});
   this.setState({
    count:current_id,
    prices: prices,
   
  });

  this.props.onChange(this.state.prices);

  //window.core.bus.trigger('shooted', 'barcode1');

}
  render() {

   
    return (
      <table className="game">
        <thead>
          <tr>
            <th>Duration</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Action</th>

          </tr>
        </thead>
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
