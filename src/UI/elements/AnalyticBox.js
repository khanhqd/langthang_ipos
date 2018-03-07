import React from 'react';
import {
    View, StyleSheet, TextInput, Text
} from 'react-native';
import PropTypes from 'prop-types';
import VarHelper from '../../utils/VarHelper';

const AnalyticBox = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.number}>{props.value}</Text>
        </View>
    )
}

AnalyticBox.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginRight: 0,
        padding: 10,
        borderColor: 'rgb(190,207,212)',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 15,
        fontWeight: '600'
    },
    number: {
        fontSize: 20,
        fontWeight: '600'
    }
})

export default AnalyticBox;