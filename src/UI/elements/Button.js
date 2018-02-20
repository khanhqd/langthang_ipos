import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import VarHelper from '../../utils/VarHelper';

const Button = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

Button.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'black',
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
})

export default Button;