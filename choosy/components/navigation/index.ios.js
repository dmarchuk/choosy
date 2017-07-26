import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS
} from 'react-native';

import Home from '../home/index.ios';
import Search from '../search/index.ios';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }
    render() {
        return (
            <TabBarIOS
                tintColor="black"
                // barTintColor=""
                selectedTab={this.state.selectedTab}>

                <Icon.TabBarItemIOS
                    title="Home"
                    iconName="home"
                    selectedIconName="home"
                    selected={this.state.selectedTab === 'home'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'home',
                        });
                    }}>
                    <Home />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Search"
                    iconName="search"
                    selectedIconName="search"
                    selected={this.state.selectedTab === 'more'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'more',
                        });
                    }}>
                    <Search />
                </Icon.TabBarItemIOS>

                 <Icon.TabBarItemIOS
                    title="Create"
                    iconName="add"
                    iconColor="green"
                    selectedIconColor="green"
                    selectedIconName="add"
                    renderAsOriginal={true}
                    >
                    <Search />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Voted"
                    iconName="touch-app"
                    selectedIconName="touch-app"
                    >
                    <Search />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="Profile"
                    iconName="person"
                    selectedIconName="person"
                    >
                    <Search />
                </Icon.TabBarItemIOS>


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
    marginTop: 40
  },
});

module.exports = Navigation;