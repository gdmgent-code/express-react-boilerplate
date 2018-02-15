import React, { Component } from 'react';

class DigitalClock extends Component {
  constructor(props) {
    super(props);

    this.state = { date: this.makeLocalDate() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((prevState, props) => ({
      date: this.makeLocalDate(),
    }));
  }

  makeLocalDate() {
    const now = new Date();
    const utc = now.getTimezoneOffset() / 60;
    const diff = parseInt(this.props.utc) + utc;
    now.setHours(now.getHours() + diff);
    return now;
  }

  render() {
    return (
      <div>
        <h2>It is s{this.state.date.toLocaleTimeString()} in {this.props.city}.</h2>
      </div>
    );
  }
}

export default DigitalClock;
