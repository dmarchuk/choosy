'use strict';

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

let styles = StyleSheet.create({
    loadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

import Post from '../post/index.ios';
import renderIf from '../../helpers/renderif';

import settings from '../../helpers/settings/index';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const url = settings.API_URL + '/post/';
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.data : [...this.state.data, ...res.data],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    render() {
        return (
            <View>
                {renderIf(this.state.loading,
                    <Text style={styles.loadingText}>Loading...</Text>
                )}

                {renderIf(!this.state.loading,
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            // TODO: Make a separate component
                            <View style={styles.infoContainer}>
                                <Post props={item} />
                            </View>
                        )}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={this.renderSeparator}
                        contentInset={{bottom: 50, top: 20}}
                    />
                )}
            </View>
        );
    }
}

module.exports = Home;