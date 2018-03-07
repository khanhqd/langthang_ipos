import React from 'react';
import {
    View, StyleSheet, TextInput, Text
} from 'react-native';
import PropTypes from 'prop-types';
import VarHelper from '../../utils/VarHelper';

const AnalyticList = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.data.map((item, index) => {
                return (
                    <View key={index} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 5,
                    }}>
                        <Text>AAAAAAA</Text>
                        <Text>12</Text>
                    </View>
                )
            })}
        </View>
    )
}

AnalyticList.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: 'rgb(190,207,212)',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 10,
    },
    number: {
        fontSize: 20,
        fontWeight: '600'
    }
})

export default AnalyticList;