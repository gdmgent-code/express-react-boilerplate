import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { List, Image } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nmd_message: null,
      nmd_lecturers: null
    }

    this.callApi('/api/v1/nmd')
      .then(res => this.setState({ nmd_message: res.message }))
      .catch(err => console.log(err));

    this.callApi('/api/v1/nmd/lecturers')
      .then(res => this.setState({ nmd_lecturers: res }))
      .catch(err => console.log(err));
  }
  callApi = async (endPoint) => {
    const response = await fetch(endPoint);
    const body = await response.json();

    if (response.status !== 200) throw Error(body);

    return body;
  }
  render() {
    let listItems = `No lecturers present`;
    if(this.state.nmd_lecturers != null) {
      listItems = this.state.nmd_lecturers.map((lecturer, index) => 
        <List.Item key={ index }>
          <Image avatar src='/assets/images/avatar/small/rachel.png' />
          <List.Content>
            <List.Header as='a'>{ lecturer.firstname } { lecturer.lastname }</List.Header>
            <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
          </List.Content>
        </List.Item>
      );
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{ this.state.nmd_message }</p>
        <List>{ listItems }</List>
      </div>
    );
  }
}

export default App;
