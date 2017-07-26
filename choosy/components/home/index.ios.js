'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#765432',
  }
});

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Here is supposed to be Home/Feed.
        </Text>
      </View>
    );
  }
}

module.exports = Home;