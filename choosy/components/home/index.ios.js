'use strict';

import React, {Component} from 'react';
import {
    ScrollView
} from 'react-native';

import Post from '../post/index.ios';

export default class Home extends Component {
    render() {
        return (
            <ScrollView>
                <Post choices="3" />
                <Post choices="2" />
                <Post choices="4" />
            </ScrollView>
        );
    }
}

module.exports = Home;