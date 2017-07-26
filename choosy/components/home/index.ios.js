'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Post from '../post/index.ios';

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});

export default class Home extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Post/>
        <Post/>
        <Post/>
      </ScrollView>
    );
  }
}

module.exports = Home;