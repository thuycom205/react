import React, {useCallback, useState} from 'react';
import {Avatar, Card, ChoiceList, Filters, RangeSlider, ResourceList, TextField, TextStyle} from '@shopify/polaris';

export default function ResourceListFiltersExample(props) {
    

  const [accountStatus, setAccountStatus] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const [items, setItems] = useState(null);

  const handleItemsChange = useCallback(
    (value) => setItems(value),
    [],
  );
  const handleAccountStatusChange = useCallback(
      function(value) { 
        window.core.bus.trigger('menu_item_clicked', '__filter__24');

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
    (value) => setQueryValue(value),
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
