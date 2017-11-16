import React, {Component} from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    NativeModules,
    Modal,
    DeviceEventEmitter,
    ActivityIndicator,
} from 'react-native';
import Camera from 'react-native-camera';

const {width, height} = Dimensions.get('window');

import colors from '../../helpers/colors/index';
import settings from '../../helpers/settings/index';
import UUID from '../../helpers/uuid/index';
const RNUploader = NativeModules.RNUploader;

export default class Create extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fit,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false,
            previews: [],
            uploading: false,
            showUploadModal: false,
            uploadProgress: 0,
            uploadTotal: 0,
            uploadWritten: 0,
            uploadStatus: undefined,
            cancelled: false,
        };
    }

    _uploadImages = () => {
        let files = this.state.previews.map((file) => {
            return {
                name: 'images',
                filename: UUID + '.png',
                filepath: file.mediaUri,
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
            this.setState({uploading: false, uploadStatus: status, previews: []});
        });
    }

    _closeUploadModal() {
        this.setState({showUploadModal: false, uploadProgress: 0, uploadTotal: 0, uploadWritten: 0, previews: [], cancelled: false,});
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

    uploadProgressModal = () => {
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
                    <Text style={ styles.title }>Uploading { this.state.previews.length } Image{ this.state.previews.length == 1 ? '' : 's' }</Text>
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

    takePicture = () => {
        if (this.camera) {
            this.camera.capture()
                .then((data) => {
                    console.log(data)
                    let previews = this.state.previews;
                    previews.push(data);
                    this.setState({previews: previews});
            })
            .catch(err => console.error(err));
        }
    }

    startRecording = () => {
        if (this.camera) {
            this.camera.capture({mode: Camera.constants.CaptureMode.video})
                .then((data) => console.log(data))
                .catch(err => console.error(err));
            this.setState({
                isRecording: true
            });
        }
    }

    stopRecording = () => {
        if (this.camera) {
            this.camera.stopCapture();
            this.setState({
                isRecording: false
            });
        }
    }

    switchType = () => {
        let newType;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType,
            },
        });
    }

    get typeIcon() {
        let icon;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = require('./assets/ic_camera_rear_white.png');
        } else if (this.state.camera.type === front) {
            icon = require('./assets/ic_camera_front_white.png');
        }

        return icon;
    }

    switchFlash = () => {
        let newFlashMode;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
    }

    clearPreviews = () => {
        this.setState({previews: []});
    }

    get flashIcon() {
        let icon;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = require('./assets/ic_flash_auto_white.png');
        } else if (this.state.camera.flashMode === on) {
            icon = require('./assets/ic_flash_on_white.png');
        } else if (this.state.camera.flashMode === off) {
            icon = require('./assets/ic_flash_off_white.png');
        }

        return icon;
    }

    render() {
        const {navigate} = this.props.navigation;
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

                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    onFocusChanged={() => {
                    }}
                    onZoomChanged={() => {
                    }}
                    defaultTouchToFocus
                    mirrorImage={false}
                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <TouchableOpacity
                        style={styles.typeButton}
                        onPress={this.switchType}
                    >
                        <Image
                            source={this.typeIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={this.switchFlash}
                    >
                        <Image
                            source={this.flashIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <View style={[styles.bottomOverlayPreviews]}>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                            {this.state.previews.map((image) => {
                                return <Image key={UUID()} source={{uri: image.mediaUri}} style={styles.thumbnail}/>
                            })}
                        </View>
                    </View>
                    <View style={[styles.bottomOverlayButtons]}>
                        {
                            !this.state.isRecording
                            &&
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={this.takePicture}
                            >
                                <Image
                                    source={require('./assets/ic_photo_camera_36pt.png')}
                                />
                            </TouchableOpacity>
                            ||
                            null
                        }
                        <View style={styles.buttonsSpace}/>
                        {
                            !this.state.isRecording
                            &&
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={this.startRecording}
                            >
                                <Image
                                    source={require('./assets/ic_videocam_36pt.png')}
                                />
                            </TouchableOpacity>
                            ||
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={this.stopRecording}
                            >
                                <Image
                                    source={require('./assets/ic_stop_36pt.png')}
                                />
                            </TouchableOpacity>
                        }
                        <View style={styles.customButtons}>
                            <Text style={styles.upload} onPress={() =>
                                navigate('Picker')
                            }>[Browse]</Text>
                            <Text style={styles.upload} onPress={this._uploadImages}>[Upload]</Text>
                            <Text style={styles.upload} onPress={this.clearPreviews}>[Clear]</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    upload: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 5,
        fontSize: 11,
        margin: 5,
        textAlign: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        paddingTop: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.stBarts
    },
    bottomOverlay: {
        bottom: 0,
        height: 252,
        backgroundColor: colors.stBarts,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    bottomOverlayPreviews: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomOverlayButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButtons: {
        flexDirection: 'column',
    },
    thumbnail: {
        width: 73,
        height: 73,
        borderWidth: 1,
        borderColor: '#DDD',
        margin: 5,
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
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
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
});

module.exports = Create;