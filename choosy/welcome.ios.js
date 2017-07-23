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

class More extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          This could be your second tab
        </Text>
      </View>
    );
  }
}

module.exports = More;