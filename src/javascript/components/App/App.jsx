import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import styles from './styles.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.appBox}>
        <Header />
        <h2>hello world</h2>
      </div>
    );
  }
}

App.propTypes = {
};
