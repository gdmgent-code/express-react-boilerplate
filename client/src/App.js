import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

import Header from './common/components/Header/Header';
import DigitalClock from './common/components/DigitalClock/DigitalClock';
import Avatar from './modules/avatar/components/Avatar';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nmd_message: null,
      nmd_lecturers: null,
      patterns: '010000001011000001111010100101111110010111011001000111001111011101111111000101011001010011011111110001011100111101110111011001000001011111100100000111101011010000001011'
    }

    this.callApi('/api/v1/nmd')
      .then(res => this.setState({ nmd_message: res.message }))
      .catch(err => console.log(err));

    this.callApi('/api/v1/nmd/lecturers')
      .then(res => this.setState({ nmd_lecturers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        this.setState((prevState, props) => ({
          patterns:
            [
              this.generateAvatarPatternString(13),
              this.generateAvatarPatternString(5)
            ],
        }));
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  generateAvatarPatternString = (n) => {
    let patternStr = '';
    let reflectionPatternStr = '';
		const patternLength = Math.ceil(n / 2);
		for(let i = 0; i < n * patternLength; i += 1) {
			patternStr += Math.round(Math.random());
		}
		for(let i = 0; i < (patternLength - 1); i += 1) {
			reflectionPatternStr = patternStr.substring((i * n), (i * n) + n) + reflectionPatternStr;
		}
		return patternStr + reflectionPatternStr;
  }

  callApi = async (endPoint) => {
    const response = await fetch(endPoint);
    const body = await response.json();

    if (response.status !== 200) throw Error(body);

    return body;
  }

  render() {
    let listItems = 'No lecturers present';
    if (this.state.nmd_lecturers != null) {
      listItems = this.state.nmd_lecturers.map((lecturer, index) => {
        return (
          <List.Item key={index}>
            <Image avatar src="/assets/images/avatar/small/rachel.png" />
            <List.Content>
              <List.Header>{ lecturer.firstname } { lecturer.lastname }</List.Header>
              <List.Description>More to come.</List.Description>
            </List.Content>
          </List.Item>);
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Header />
        <DigitalClock utc="-6" city="New York" />
        <DigitalClock utc="1" city="Ghent" />
        <DigitalClock utc="2" city="Istanbul" />
        <Avatar size={Math.sqrt(this.state.patterns[0].length)} pattern={this.state.patterns[0]} />
        <Avatar size={Math.sqrt(this.state.patterns[1].length)} pattern={this.state.patterns[1]} />
        <p className="App-intro">{ this.state.nmd_message }</p>
        <List>{ listItems }</List>
      </div>
    );
  }
}

export default App;
