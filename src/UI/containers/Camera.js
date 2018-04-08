import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';

class Camera extends Component {
    state = {
    }
    onPressItem() {

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
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Camera)