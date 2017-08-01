'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import Choice from '../choice/index.ios';
import Swiper from '../../node_modules/react-native-swiper';

let styles = StyleSheet.create({
    // Post information + user info
    image: {borderRadius: 0, width: 40, height: 40, marginHorizontal: 3, marginVertical: 3},
    infoContainer: {flexDirection: 'row', height: 46, alignSelf: 'stretch'},
    usernameContainer: {justifyContent: 'center', flexDirection: 'column'},
    location: {fontSize: 10},

    // Slider pagination
    pagination: {bottom: 5}
});

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Mocked data generation, unsplash is generating random images for us
        let choices = [];
        for (let i = 0; i < parseInt(this.props.choices); i++) {
            let mockedVoteCount = parseInt(this.props.choices) * (i + 1 + 13);
            let mockedCommentCount = parseInt(this.props.choices) * (i + 1 + 3);
            choices.push(
                <Choice key={i} image="https://dummyimage.com/400x400/c62230/ffffff" votedCount={mockedVoteCount} commentCount={mockedCommentCount} />
            )
        }

        return (
            <View>
                {/* Info container (profile image, username, location?) */}
                <View style={styles.infoContainer}>
                    <Image source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/d1/52/44/d15244cef95c4e8e865b1326d9c01d67--alexis-ren-instagram-i-smile.jpg'}}
                           style={styles.image}
                    />
                    <View style={styles.usernameContainer}>
                        <Text> Username </Text>
                        <Text style={styles.location}> Prague </Text>
                    </View>
                </View>

                {/* Post choices in slider */}
                <Swiper paginationStyle={styles.pagination} loop={false} height={435}>
                    {choices}
                </Swiper>

            </View>
        );
    }
}

module.exports = Post;