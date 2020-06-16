import React, {useState, useCallback} from 'react';

import ResourceListFiltersExample from  './App2';
import { func } from 'prop-types';
class OrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  _onRenderRows(data) {
    var self = this;

    console.log('------>');
    console.log(data);
    var newitem = [];
    data.map(function(val) {
      newitem.push(val['data']) ;
    }) ;
    
    self.setState({
      isLoaded: true,
      items: newitem
    });
    this.forceUpdate();

  }
  componentDidMount() {
    var self = this;
   // window.core.bus.on('renderRows', this, this._onRenderRows);

    let itemx = [];
    itemx.push({id: '1' , name : 'S001'});
         self.setState({
            isLoaded: true,
            items: itemx
          });
      console.log('rpc');
      // return window.rpc.query({
      //     model: 'sale.order',
      //     method: 'search_read',
      //     args: [
      //       [['user_id', '=', [10]]],
      //       ['id', 'name',  'partner_id'],
      //   ],
      // }, {
      //     shadow: true,
      // }).then(function (items) {
      //     console.log('credit');
      //     console.log(items);
          
      //     self.setState({
      //       isLoaded: true,
      //       items: items
      //     });
      // });
  
    
  
  
  }

  render() {
    // items = [];
    // items.push({id: '1' , name : 'S001'});
    //      self.setState({
    //         isLoaded: true,
    //         items: items
    //       });
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      window.rentalItems = items;

      return (
        
        
         <ResourceListFiltersExample items={items} />
        
      );
    }
  }
}

export default OrderApp;
