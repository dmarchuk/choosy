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
import settings from '../../helpers/settings/index';

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

        this.item = this.props.props;
    }

    render() {
        let choices = [];

        this.item.images.map((choice) => {
            let imageUrl = settings.API_URL + choice.compressed;
            choices.push(
                // post attribute is temporary
                <Choice key={choice.id} image={imageUrl} votedCount={this.item.likes.length} commentCount={this.item.comments.length} />
            )
        });

        return (
            <View>
                {/* Info container (profile image, username, location?) */}
                <View style={styles.infoContainer}>
                    <Image source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/d1/52/44/d15244cef95c4e8e865b1326d9c01d67--alexis-ren-instagram-i-smile.jpg'}}
                           style={styles.image}
                    />
                    <View style={styles.usernameContainer}>
                        <Text> {this.item._id} </Text>
                        <Text style={styles.location}> {this.item.created_at} </Text>
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