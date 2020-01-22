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
  Select
} from '@shopify/polaris';
import {ImportMinor} from '@shopify/polaris-icons';

import Game from  './tictactoe';
import Dtable from  './dynamicrow';
import { func } from 'prop-types';

class Item extends React.Component {
  render() {
      return (
          <div>
              <p>{this.props.item.name}</p>
              <p>{this.props.item.color}</p>
              <p>${this.props.item.price}</p>
          </div>
      );
  }
}


class Car extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      shop: [
          {id: 35, name: 'jumper', color: 'red', price: 20},
          {id: 42, name: 'shirt', color: 'blue', price: 15},
          {id: 56, name: 'pants', color: 'green', price: 25},
          {id: 71, name: 'socks', color: 'black', price: 5},
          {id: 72, name: 'socks', color: 'white', price: 5},
      ],
      prices: [
        {id: 35, duration: 1, unit: 'minute', price: 20},
        {id: 42, duration: 2, unit: 'day', price: 15},
        {id: 56, duration: 3, unit: 'day', price: 25},
        {id: 71, duration: 4, unit: 'day', price: 5},
        {id: 72, duration: 5, unit: 'day', price: 5},
    ]
  };
  }

  shoot() {
        alert("what");

    var self = this;
    self.state.cart = ['Mustang'];
  
  }
  createTable() {
   return  this.state.shop.map((item, key) =>
            <Item item={item} key={item.id} />
        )
  }

  weird() {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }

  fieldTable() {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }


  render() {

    return (
      <div>
      {this.createTable()}
      <button onClick={() =>this.shoot}> Add</button>
      </div>
    );
  }
}

function RandomList() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.random() * 100
      }
    ]);
  };

  const removeItem = () => {
    var newI =[];
   for (var i = 1; i < items.length; i++)  {
      var newI = items[i];
    }

    setItems(
      [newI]
      
    );
  };

  return (
    <>
      <button onClick={addItem}>Add a number</button>
      <button onClick={removeItem}>Remove a number</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </>
  );
}
export default function App() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [checkboxes, setCheckboxes] = useState([]);
  const [connected, setConnected] = useState(false);

  const [deliveryType, setDeliveryType] =  useState('pickup');
  const [rentalPrices, setRentalPrices] = useState([{id: 35, duration: 1, unit: 'minute', price: 200},
  {id: 42, duration: 2, unit: 'day', price: 150},]);

  const handleRentalPricesChange = useCallback(
    (value) => {
      //setRentalPrices(value);
       alert('value of dynamic row is changed') ;
       alert(value);
       console.log(value);
       setRentalPrices(value);
    },
    [],
  );

  const handleDeliveryTypeChange = useCallback(
    (value) => {
      
       alert(value);
      
       setDeliveryType(value);
    },
    [],
  );

  const handleFirstChange = useCallback((value) => setFirst(value), []);
  const handleLastChange = useCallback((value) => setLast(value), []);
  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleCheckboxesChange = useCallback(

    (value) => setCheckboxes(value),
    [],
  );

  const toggleConnection = useCallback(
    () => {
      setConnected(!connected);
    },
    [connected],
  );
  const handleSubmit = useCallback((_event) => {
    event.preventDefault();
   
    var data= {
      email: email,
      rentalPrices: rentalPrices
    };
    console.log(data);
  }, []);

  const breadcrumbs = [{content: 'Sample apps'}, {content: 'webpack'}];
  const primaryAction = {content: 'New product'};
  const secondaryActions = [{content: 'Import', icon: ImportMinor}];

  const choiceListItems = [
    {label: 'I accept the Terms of Service', value: 'false'},
    {label: 'I consent to receiving emails', value: 'false2'},
  ];

  const accountSectionDescription = connected
    ? 'Disconnect your account from your Shopify store.'
    : 'Connect your account to your Shopify store.';

  const accountMarkup = connected ? (
    <DisconnectAccount onAction={toggleConnection} />
  ) : (
    <ConnectAccount onAction={toggleConnection} />
  );
  const deliveryOptions = [
    {label: 'Local Pickup', value: 'pickup'},
    {label: 'Shipping', value: 'shipping'},
  
  ];

  return (
    <Page
      title="Polaris"
      breadcrumbs={breadcrumbs}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Layout>
        <Layout.AnnotatedSection
          title="Style"
          description="Customize the style of your checkout"
        >
          <SettingToggle
            action={{
              content: 'Customize Checkout',
            }}
          >
            Upload your store’s logo, change colors and fonts, and more.
          </SettingToggle>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Account"
          description={accountSectionDescription}
        >
          {accountMarkup}
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Form"
          description="A sample form using Polaris components."
        >
        <Layout.AnnotatedSection
          title="Delivery type"
          description="Define delivery type."
        ></Layout.AnnotatedSection>
          <Form onSubmit={handleSubmit}>
          <Card sectioned>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={first}
                  label="First name"
                  placeholder="Tom"
                  onChange={handleFirstChange}
                />
                <TextField
                  value={last}
                  label="Last name"
                  placeholder="Ford"
                  onChange={handleLastChange}
                />
              </FormLayout.Group>

              <TextField
                value={email}
                label="Email"
                placeholder="example@email.com"
                onChange={handleEmailChange}
              />

              <ChoiceList
                allowMultiple
                choices={choiceListItems}
                selected={checkboxes}
                onChange={handleCheckboxesChange}
              />

              <Button primary>Submit</Button>
              <Button submit>Submit</Button>

             
              <Dtable defaultValue={rentalPrices} onChange={handleRentalPricesChange} />
              <RandomList />
            </FormLayout>
          </Card>
          <Card sectioned>
            <FormLayout>
            <Select
            label="Delivery type"
            options={deliveryOptions}
            onChange={handleDeliveryTypeChange}
            value={deliveryType}
             />
              <TextField
                label="Lead time"

               />

              <TextField
                label="Lead time"

               />
                <TextField
                label="Pickup address"

               />
                <TextField
                label="Pickup Longitude"

               />
                 <TextField
                label="Pickup Latitude"

               />
            </FormLayout>
          </Card>
          </Form>

        </Layout.AnnotatedSection>

        <Layout.Section>
          <FooterHelp>
            For more details on Polaris, visit our{' '}
            <Link url="https://polaris.shopify.com">style guide</Link>.
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function ConnectAccount({onAction}) {
  return (
    <AccountConnection
      action={{content: 'Connect', onAction}}
      details="No account connected"
      termsOfService={
        <p>
          By clicking Connect, you are accepting Sample’s{' '}
          <Link url="https://polaris.shopify.com">Terms and Conditions</Link>,
          including a commission rate of 15% on sales.
        </p>
      }
    />
  );
}

function DisconnectAccount({onAction}) {
  return (
    <AccountConnection
      connected
      action={{content: 'Disconnect', onAction}}
      accountName="Tom Ford"
      title={<Link url="http://google.com">Tom Ford</Link>}
      details="Account id: d587647ae4"
    />
  );
}
