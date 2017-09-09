import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import { Tabs } from './components/navigation/index';

export default class choosy extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tabs />
    );
  }
}

AppRegistry.registerComponent('choosy', () => choosy);
