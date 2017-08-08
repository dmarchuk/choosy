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
import ScrollableTabView, {DefaultTabBar} from '../../node_modules/react-native-scrollable-tab-view';
import UsersSearchList from './users.ios';
import renderIf from '../../helpers/renderif';

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
            showsCancelButton: false,
            showResults: false
        };
        this.showCancelButton = this.showCancelButton.bind(this);
    }

    showCancelButton() {
        this.setState({
            showsCancelButton: true,
            showResults: true
        });
    }

    render() {
        // TODO: Mocking post images, should be changed to getting data from https://randomuser.me/api/?results=50
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
                    onBlur={() => this.setState({
                        showResults: false
                    })}
                    showsCancelButton={this.state.showsCancelButton}
                    searchBarStyle="minimal"
                    tintColor="black"
                />

                {/* Here is supposed to be list of posts in "discovery", showing depending on state.showResults */}
                {renderIf(!this.state.showResults,
                    <ScrollView contentContainerStyle={styles.postsWrapper} automaticallyAdjustContentInsets={false} contentInset={{bottom: 50}}>
                        {mockedImages}
                    </ScrollView>
                )}

                {/* Results of search tabbed content, showing depending on state.showResults */}
                {renderIf(this.state.showResults,
                    <ScrollableTabView
                        style={{marginTop: 0, padding: 0, height: 10}}
                        renderTabBar={() => <DefaultTabBar style={{padding: 0, height: 35}} />}
                    >
                        <UsersSearchList tabLabel='Top' />
                        <UsersSearchList tabLabel='People' />
                        <UsersSearchList tabLabel='Categories' />
                        <UsersSearchList tabLabel='Tags' />
                    </ScrollableTabView>
                )}

            </View>
        );
    }
}

module.exports = Search;