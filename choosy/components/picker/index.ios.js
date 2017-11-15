import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    NativeModules,
    DeviceEventEmitter,
    ActivityIndicator,
    Modal,
    TouchableOpacity,
    Button,
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import settings from '../../helpers/settings/index';
import UUID from '../../helpers/uuid/index';

const RNUploader = NativeModules.RNUploader;

export default class Picker extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let headerRight = (
            <Button title="Next" onPress={params.uploadImages ? params.uploadImages : () => null} />
        );
        return {headerRight};
    };

    constructor(props) {
        super(props);
        this._getSelectedImages = this._getSelectedImages.bind(this);
        this._uploadImages = this._uploadImages.bind(this);

        this.state = {
            uploading: false,
            showUploadModal: false,
            uploadProgress: 0,
            uploadTotal: 0,
            uploadWritten: 0,
            uploadStatus: undefined,
            cancelled: false,
            images: [],
        }
    }

    _getSelectedImages(selected, allSelected) {
        this.setState({images: selected});
    }

    _uploadImages() {
        let files = this.state.images.map((file) => {
            return {
                name: 'images',
                filename: UUID + '.png',
                filepath: file.uri,
                filetype: 'image/png',
            }
        });

        let opts = {
            url: settings.API_URL + '/post/',
            files: files
        };

        this.setState({ uploading: true, showUploadModal: true, });
        RNUploader.upload(opts, (err, res) => {
            console.log(opts)
            console.log(err)
            console.log(res)
            if (err) {
                console.log(err);
                return;
            }

            let status = res.status;
            let responseString = res.data;

            console.log('Upload complete with status ' + status);
            console.log(responseString);
            this.setState({uploading: false, uploadStatus: status, images: []});
        });
    }

    _closeUploadModal() {
        this.setState({showUploadModal: false, uploadProgress: 0, uploadTotal: 0, uploadWritten: 0, images: [], cancelled: false,});
    }

    _cancelUpload() {
        RNUploader.cancel();
        this.setState({uploading: false, cancelled: true});
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
            let bytesWritten = data.totalBytesWritten;
            let bytesTotal = data.totalBytesExpectedToWrite;
            let progress = data.progress;
            this.setState({uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten});
        });

        this.props.navigation.setParams({ uploadImages: this._uploadImages });
    }

    uploadProgressModal() {
        let uploadProgress;

        if (this.state.cancelled) {
            uploadProgress = (
                <View style={{margin: 5, alignItems: 'center',}}>
                    <Text style={{marginBottom: 10,}}>
                        Upload Cancelled
                    </Text>
                    <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (!this.state.uploading && this.state.uploadStatus) {
            uploadProgress = (
                <View style={{margin: 5, alignItems: 'center',}}>
                    <Text style={{marginBottom: 10,}}>
                        Upload complete with status: { this.state.uploadStatus }
                    </Text>
                    <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
                        <Text>{ this.state.uploading ? '' : 'Close' }</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.uploading) {
            uploadProgress = (
                <View style={{alignItems: 'center',}}>
                    <Text style={ styles.title }>Uploading { this.state.images.length } Image{ this.state.images.length == 1 ? '' : 's' }</Text>
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.centering, {height: 80}]}
                        size="large"/>
                    <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
                    <Text style={{fontSize: 11, color: 'gray', marginTop: 5,}}>
                        { ( this.state.uploadWritten / 1024 ).toFixed(0) }/{ ( this.state.uploadTotal / 1024 ).toFixed(0) } KB
                    </Text>
                    <TouchableOpacity style={ [styles.button, {marginTop: 5}] } onPress={ this._cancelUpload.bind(this) }>
                        <Text>{ 'Cancel' }</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return uploadProgress;
    }

    render() {
        return (
            <View style={styles.container}>

                <Modal
                    animationType={'fade'}
                    transparent={false}
                    visible={this.state.showUploadModal}>

                    <View style={styles.modal}>
                        {this.uploadProgressModal()}
                    </View>

                </Modal>

                <CameraRollPicker callback={this._getSelectedImages} selected={this.state.images} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    modal: {
        margin: 50,
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'lightyellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = Picker;