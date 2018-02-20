import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';

class Template extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
    },
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Template)