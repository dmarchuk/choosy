import React, { Component } from 'react';

import { Image, StyleSheet } from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../home/index.ios';
import Search from '../search/index.ios';
import Upload from '../upload/index.ios';
import Create from "../create/index.ios";
import Picker from "../picker/index.ios";

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
    },
    Picker: {
        screen: Picker,
        navigationOptions: {
            headerTitle: (
                <Image source={require('../../assets/img/logo/logo.png')} style={styles.logo} />
            ),
            headerStyle: {
                height: 55
            }
        }
    },
});

export const Tabs = TabNavigator({
    Home: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => <Icon name="home" size={25} color={tintColor}/>,
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({tintColor}) => <Icon name="search" size={25} color={tintColor}/>
        },
    },
    Create: {
        screen: Create,
        navigationOptions: {
            tabBarLabel: 'Create',
            tabBarIcon: ({tintColor}) => <Icon name="add" size={25} color={colors.armagnac} />
        },
    },
    Voted: {
        screen: Upload,
        navigationOptions: {
            tabBarLabel: 'Voted',
            tabBarIcon: ({tintColor}) => <Icon name="touch-app" size={25} color={tintColor}/>
        },
    },
    Profile: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => <Icon name="person" size={25} color={tintColor}/>
        },
    },
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: colors.realRed,
            style: {
                height: 40
            }
        }
    }
);