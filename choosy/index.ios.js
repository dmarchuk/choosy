import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import Navigation from './components/navigation/index';

export default class choosy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };
  }
  render() {
    return (
      <Navigation />
    );
  }
}

AppRegistry.registerComponent('choosy', () => choosy);
