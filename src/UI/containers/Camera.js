import React, { Component } from 'react';
import {
    View, StyleSheet, Text
} from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { Toast } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import moment from 'moment';
import * as firebase from 'firebase';

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const landmarkSize = 2;

class Camera extends Component {
    state = {
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        ratios: [],
        photoId: 1,
        showGallery: false,
        photos: [],
        faces: [],
        counter: 5,
        showCounter: false
    }
    onFacesDetected = ({ faces }) => {
        if (faces.length > 0) {
            if (this.state.showCounter) return;
            this.setState({ showCounter: true }, () => {
                Toast.show({
                    text: 'Chỉnh cho khuôn mặt vào chỉnh giữa màn hình, giữ yên điện thoại trong giây lát',
                    position: 'bottom',
                })
                this.takePictureInterval = setInterval(() => {
                    if (this.state.counter > 0) this.setState({ counter: Number(this.state.counter) - 1 })
                    if (this.state.counter == 0) {
                        clearInterval(this.takePictureInterval)
                        this.setState({ counter: null })
                        this.takePicture()
                    }
                }, 1000)
            })
        }
        this.setState({ faces })
    }
    onFaceDetectionError = state => console.warn('Faces detection error:', state);
    renderLandmarks() {
        return (
            <View style={styles.facesContainer} pointerEvents="none">
                {this.state.faces.map(this.renderLandmarksOfFace)}
            </View>
        );
    }
    renderLandmarksOfFace(face) {
        const renderLandmark = position =>
            position && (
                <View
                    style={[
                        styles.landmark,
                        {
                            left: position.x - landmarkSize / 2,
                            top: position.y - landmarkSize / 2,
                        },
                    ]}
                />
            );
        return (
            <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPosition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
            </View>
        );
    }
    renderFaces() {
        return (
            <View style={styles.facesContainer} pointerEvents="none">
                {this.state.faces.map(this.renderFace)}
            </View>
        );
    }
    renderFace({ bounds, faceID, rollAngle, yawAngle }) {
        return (
            <View
                key={faceID}
                transform={[
                    { perspective: 600 },
                    { rotateZ: `${rollAngle.toFixed(0)}deg` },
                    { rotateY: `${yawAngle.toFixed(0)}deg` },
                ]}
                style={[
                    styles.face,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            >
                {/* <Text style={styles.faceText}>ID: {faceID}</Text>
            <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
            <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text> */}
            </View>
        );
    }
    renderCounter() {
        return (
            <View style={{ position: 'absolute', alignSelf: 'center', bottom: 80 }}>
                {this.state.counter < 4 &&
                    <Text style={{ color: 'white', fontSize: 25 }}>{String(this.state.counter)}</Text>
                }
            </View>
        )
    }
    takePicture = async function () {
        if (this.camera) {
            this.camera.takePictureAsync().then(data => {
                console.log('data: ', data);
                if (data.uri) this.uploadToFirebase(data.uri)
            });
        }
    };
    uploadToFirebase(uri) {
        this.setState({ isLoading: true })
        let filePath = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let createdAt = new Date().getTime()
        let date = moment().format('DDMMYYYY')
        let blobURI = RNFetchBlob.wrap(filePath);
        Blob
            .build(blobURI, { type: 'image/png' })
            .then((blob) => {
                var uploadTask = firebase.storage().ref().child(`${date}/${this.props.user_infor.phone_number}/${createdAt}`).put(blob)
                uploadTask.on('state_changed', (snapshot) => {
                }, (e) => {
                    alert('Đã xảy ra sự cố khi up ảnh!')
                    this.setState({ isLoading: false })
                }, () => {
                    if (uploadTask.snapshot.downloadURL) {
                        this.setState({ linkImage: `${date}/${this.props.user_infor.phone_number}/${createdAt}` })
                        return uploadTask.snapshot.downloadURL
                    }
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                    }}
                    onMountError={(e) => alert('errro')}
                    type='front'
                    ratio={this.state.ratio}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                    onFacesDetected={this.onFacesDetected}
                    onFaceDetectionError={this.onFaceDetectionError}
                    focusDepth={this.state.depth}
                >
                    {this.renderFaces()}
                    {this.renderLandmarks()}
                    {this.renderCounter()}
                </RNCamera>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Camera)