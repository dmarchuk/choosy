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
    backgroundColor: '#123456',
  }
});

class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Here will be a search component!
        </Text>
      </View>
    );
  }
}

module.exports = Welcome;