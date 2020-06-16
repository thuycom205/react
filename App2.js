import React, {useCallback, useState} from 'react';
import {Avatar, Card, ChoiceList, Filters, RangeSlider, ResourceList, TextField, TextStyle} from '@shopify/polaris';

export default function ResourceListFiltersExample(props) {
    
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const [accountStatus, setAccountStatus] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const [items, setItems] = useState(null);

  const handleItemsChange = useCallback(
    (value) =>  {
      setSelectedItems(value);
      console.log(value);
      console.log('prop item');
      console.log(window.rentalItems);
      

      if (window.rentalItems != null && window.rentalItems != undefined) {
        window.rentalSOCheckedE = [];
      
      for (var i = 0 ; i < window.rentalItems.length ; i++) {
        var item =window.rentalItems[i];
        if (value != null & value!= undefined) 
        for (var j = 0; j < value.length; j ++) {
          if (item.id == value[j]) {
            var name  = item.name;
            console.log('name of select item');
  
            console.log(name);
            // var name = 'S00022';
            var searchTd =  'td:contains(' + name + ')';
            var targetElement = jQuery(searchTd).prev().find('input');
             window.rentalSOCheckedE.push(targetElement.attr('id'));

              if (jQuery(searchTd).prev().find('input').attr('checked') != 'checked') {
                jQuery(searchTd).prev().find('input').trigger('click');
                jQuery(searchTd).prev().find('input').attr('checked', 'checked');
              }
            


            
  
  
          }
        }
       
      }
      //end of for
      jQuery('td').find('input').each(function(index, element) {
        if (  jQuery(element).attr('checked') == 'checked') {
          var idAttr = jQuery(element).attr('id');
          if (window.rentalSOCheckedE.indexOf(idAttr) !== -1) {
                console.log(idAttr);
          } else {
            jQuery(element).removeAttr('checked');
            jQuery(element).trigger('click');

          }
        }
       });
    }
     },
    [],
  );
  const handleAccountStatusChange = useCallback(
      function(value) { 
        // window.core.bus.trigger('menu_item_clicked', '__filter__24');
        jQuery('.o_menu_item[data-id="__filter__24"]').trigger('click');

        setAccountStatus(value); } ,
    // (value) => setAccountStatus(value),
    [],
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value) =>{
      setQueryValue(value);

      // jQuery('input[role="searchbox"]').typetype(
      //   'Text to append',
      //   {
      //     e: 0.04, // error rate. (use e=0 for perfect typing)
      //     t: 100, // interval between keypresses
      //     keypress: function (){
      //       // called after every keypress (this may be an erroneous keypress!)
      //     },
      //     callback: function (){
      //       // the `this` keyword is bound to the particular element.
      //     }
      //   }
      // );
      window.rental_filter_keyword =value;
      window.core.bus.trigger('react_search', '__filter__24');

    } ,
    [],
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(null),
    [],
  );
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const promotedBulkActions = [
    {
      content: 'Export',
      onAction: () => {
        var theText = 'Export';
        var searchTd =  'a:contains(' + theText + ')';
          jQuery(searchTd).trigger('click');
        console.log('Todo: implement bulk export')
       },
    },
  ];
  const bulkActions = [
    {
      content: 'Cancel',
      onAction: () => console.log('Todo: implement bulk cancel'),
    },
   
  
  ];

  const filters = [
    {
      key: 'accountStatus',
      label: 'Rental status',
      filter: (
        <ChoiceList
          title="Rental status"
          titleHidden
          choices={[
            {label: 'Todo today', value: 'enabled'},
            {label: 'Late', value: 'not invited'},
           
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'accountStatus',
      label: 'Pickup Date',
      filter: (
        <ChoiceList
          title="Pickup Date"
          titleHidden
          choices={[
            {label: 'April', value: 'enabled'},
            {label: 'March', value: 'not invited'},
           
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (!isEmpty(moneySpent)) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  return (
    <div style={{height: '568px'}}>
      <Card>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleFiltersClearAll}
            />
          }
          items={props.items}
          renderItem={(item) => {
            const {id, name} = item;
            const media = <Avatar customer size="medium" name={name} />;

            return (
              <ResourceList.Item
                id={id}
              
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
              </ResourceList.Item>
            );
          }}
          selectedItems={selectedItems}
          onSelectionChange={handleItemsChange}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
        />
      </Card>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return value.map((val) => `Customer ${val}`).join(', ');
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
