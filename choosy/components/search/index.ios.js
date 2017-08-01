'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';

import SearchBar from '../../node_modules/react-native-search-bar';

const {width, height} = Dimensions.get('window');

let styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 0,
        flex: 1
    },
    postsWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingVertical: 0
    },
    post: {
        width: width / 3,
        height: width / 3,
        borderWidth: 1
    }
});

export default class Search extends Component {
    constructor(props) {
        super(props);

        // Hide cancel button by default
        this.state = {
            showsCancelButton: false
        };
        this.showCancelButton = this.showCancelButton.bind(this);
    }

    showCancelButton() {
        this.setState({
            showsCancelButton: true,
        });
    }

    render() {
        // Mocking post images
        let mockedImages = [];
        for (let i = 0; i < 50; i++) {
            mockedImages.push(
                <Image
                    key={i}
                    style={styles.post}
                    resizeMode='contain'
                    source={{uri: 'https://dummyimage.com/200x200/c62230/ffffff'}}
                />
            )
        }
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder='Search'
                    onFocus={this.showCancelButton}
                    showsCancelButton={this.state.showsCancelButton}
                    searchBarStyle="minimal"
                    tintColor="black"
                />

                {/* Here is supposed to be list of posts in "discovery" */}
                <ScrollView contentContainerStyle={styles.postsWrapper} automaticallyAdjustContentInsets={false} contentInset={{bottom: 50}}>
                    {mockedImages}
                </ScrollView>
            </View>
        );
    }
}

module.exports = Search;