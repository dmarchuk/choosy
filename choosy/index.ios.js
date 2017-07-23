/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import {Welcome} from './welcome.ios';
import {More} from './more.ios';

export default class choosy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };
  }
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'welcome'}
          systemIcon="featured"
          onPress={() => {
              this.setState({
                  selectedTab: 'welcome',
              });
          }}>
            <Text style={styles.instructions}>
                Vole
            </Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'more'}
          systemIcon="contacts"
          onPress={() => {
                this.setState({
                    selectedTab: 'more',
                });
          }}>
            <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+D or shake for dev menu
            </Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('choosy', () => choosy);
