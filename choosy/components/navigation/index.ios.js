import React, { Component } from 'react';

import { Image, StyleSheet } from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../home/index.ios';
import Search from '../search/index.ios';

import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../helpers/colors/index';

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        width: 100,
        resizeMode: 'contain'
    }
});


export const FeedStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: (
                <Image source={require('../../assets/img/logo/logo.png')} style={styles.logo} />
            ),
            headerStyle: {
                height: 55
            }
        }
    }
});

export const Tabs = TabNavigator({
    Home: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({tintColor}) => <Icon name="search" size={35} color={tintColor}/>
        },
    },
    Create: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Create',
            tabBarIcon: ({tintColor}) => <Icon name="add" size={35} color={colors.armagnac} />
        },
    },
    Voted: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Voted',
            tabBarIcon: ({tintColor}) => <Icon name="touch-app" size={35} color={tintColor}/>
        },
    },
    Profile: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => <Icon name="person" size={35} color={tintColor}/>
        },
    },
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: colors.realRed,
        }
    }
);