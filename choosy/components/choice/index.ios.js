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
    // Container of postInfo (post block under the image containing all action buttons and information about the post item)
    postInfoContainer: {flexDirection: 'row', alignContent: 'space-between'},

    // Action buttons
    actions: {flexDirection: 'row', height: 40, flex: 1, alignSelf: 'flex-start', alignItems: 'flex-start'},
    vote: {marginLeft: 2, marginVertical: 2},
    comment: {marginLeft: 2, marginVertical: 5},
    share: {marginLeft: 2, marginVertical: 5},

    // Info about the post item (vote count and number of comments)
    info: {marginVertical: 0, flex: 1, alignSelf: 'center', alignItems: 'flex-end', marginHorizontal: 10},
    voteCount: {flexDirection: 'row', alignItems: 'flex-start'},
    voteText: {fontSize: 16, color: 'black'},
    commentText: {fontSize: 10, color: 'rgba(0, 0, 0, 0.5)'}
});

const {width, height} = Dimensions.get('window');

export default class Choice extends Component {
    constructor(props) {
        super(props);
        this.doubleTap = this.doubleTap.bind(this);

        this.state = {
            lastPress: 0
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Image */}
                <TouchableOpacity onPress={this.doubleTap} activeOpacity={1}>
                    <Image
                        style={{height: width}}
                        resizeMode='contain'
                        source={{uri: this.props.image}}
                    />
                </TouchableOpacity>

                {/* Comment and share buttons */}
                <View style={styles.postInfoContainer}>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.vote} onPress={() => alert('Voted')}>
                            <Icon name="touch-app" size={30} color="black"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.comment} onPress={() => alert('Comment')}>
                            <Icon name="comment" size={30} color="black"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.share} onPress={() => alert('Share')}>
                            <Icon name="share" size={30} color="black"/>
                        </TouchableOpacity>
                    </View>

                    {/* More info about the choice */}
                    <View style={styles.info}>
                        <View style={styles.voteCount}>
                            <Icon name="touch-app" size={16} color="black"/>
                            <Text style={styles.voteText}> {this.props.votedCount} voted </Text>
                        </View>
                        <TouchableOpacity onPress={() => alert('Comments list')}>
                            <Text style={styles.commentText}> {this.props.commentCount} comments </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    doubleTap() {
        let delta = new Date().getTime() - this.state.lastPress;
        if (delta < 500) {
            //DoubleTap
            this.setState({
                lastPress: new Date().getTime()
            });
            // LayoutAnimation.easeInEaseOut();
            alert('Voted count: ' + this.props.votedCount);
            return;
        }
        this.setState({
            lastPress: new Date().getTime()
        })
    }
}

module.exports = Choice;