import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class DrawerMenu extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
    
}

DrawerMenu.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
})