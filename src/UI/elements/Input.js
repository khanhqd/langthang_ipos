import React from 'react';
import {
    View, StyleSheet, TextInput, Text
} from 'react-native';
import PropTypes from 'prop-types';
import VarHelper from '../../utils/VarHelper';

const Input = props => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>{props.title}</Text>
            <TextInput
                style={[styles.input, { height: props.height || 25 }]}
                value={props.value}
                multiline={props.multiline}
                onChangeText={(text) => props.onChangeText(text)}
                keyboardType={props.keyboardType}
                underlineColorAndroid="transparent"
            />
        </View>
    )
}

Input.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 5,
        marginBottom: 15,
        borderColor: 'black',
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    input: {
        color: 'black',
        fontSize: 15,
        height: 25,
    }
})

export default Input;