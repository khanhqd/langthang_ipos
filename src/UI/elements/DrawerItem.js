import React from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Text
} from 'react-native';
import PropTypes from 'prop-types';
import STYLE from '../../constants/style';

const DrawerItem = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Image 
                style={styles.icon}
                source={props.icon}
            />
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

DrawerItem.propTypes = {
    icon: Image.propTypes.source,
    title: PropTypes.string,
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingLeft: 5,
        paddingRight: 5,
        // borderBottomWidth: 1,
        borderColor: 'white'
    },
    icon: {
        height: 40,
        width: 40,
        marginBottom: 20,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    title: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
})

export default DrawerItem;