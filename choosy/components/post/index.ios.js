'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

let styles = StyleSheet.create({
    container: {backgroundColor: 'white', paddingTop: 10},
    image: {borderRadius: 20, width: 40, height: 40, marginHorizontal: 3, marginVertical: 3},
    infoContainer: {flexDirection: 'row', height: 45, alignSelf: 'stretch'},
    usernameContainer: {justifyContent: 'center', flexDirection: 'column'},
    location: {fontSize: 10},
    itemImageContainer: {flexDirection: 'row', height: 40, alignSelf: 'stretch'},
    like: {marginHorizontal: 5, marginVertical: 5, marginLeft: 20},
    comment: {marginHorizontal: 10, marginVertical: 5},
    share: {marginHorizontal: 10, marginVertical: 5},
    seperator: {height: 1, alignSelf: 'stretch', marginHorizontal: 10, backgroundColor: 'rgba(0, 0, 0, 0.2)'},
    footer: {marginVertical: 5, alignSelf: 'stretch', marginHorizontal: 10, flexDirection: 'column'},
    likeCount: {flexDirection: 'row', alignItems: 'center', marginLeft: 2},
    commentItem: {fontSize: 10, color: 'rgba(0, 0, 0, 0.5)', marginTop: 5},
    captionContainer: {marginTop: 2, flexDirection: 'row', alignItems: 'center'},
    captionText: {fontSize: 12, fontWeight: 'bold'},
    text: {fontSize: 12, color: 'black'},
});

const {width, height} = Dimensions.get('window');

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.doubleTap = this.doubleTap.bind(this);

        this.state = {
            isLiked: false,
            lastPress: 0,
            animation: false,
        }
    }

    render() {
        //noinspection JSSuspiciousNameCombination
        return (
            <View style={styles.container}>

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

                {/* Image */}
                <TouchableOpacity onPress={this.doubleTap} activeOpacity={1}>
                    <Image
                        style={{height: width}}
                        resizeMode='contain'
                        source={{uri: 'https://d75ljpmh88vxs.cloudfront.net/web/images/lens_flare_inspiration_square.jpg'}}
                    />
                </TouchableOpacity>

                {/* Comment and share buttons */}
                <View style={styles.itemImageContainer}>
                    <TouchableOpacity style={styles.comment} onPress={() => alert('Comment')}>
                        <Icon name="comment" size={30} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.share} onPress={() => alert('Share')}>
                        <Icon name="share" size={30} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.seperator}/>

                {/* More info about the post */}
                <View style={styles.footer}>
                    <View style={styles.likeCount}>
                        <Icon name="touch-app" size={12} color="black"/>
                        <Text style={styles.text}> 12 voted </Text>
                    </View>
                    <TouchableOpacity style={{width: 100}} onPress={() => alert('Comments list')}>
                        <Text style={styles.commentItem}> 50 comments </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    doubleTap() {
        let delta = new Date().getTime() - this.state.lastPress;
        if (delta < 500) {
            //DoubleTap
            this.setState({
                lastPress: new Date().getTime(),
                isLiked: true,
                animation: true,
            });
            // LayoutAnimation.easeInEaseOut();
            alert('Double tapped');
            setTimeout(() => {
                this.setState({animation: false})
            }, 1500);
            return;
        }
        this.setState({
            lastPress: new Date().getTime()
        })
    }
}

module.exports = Post;