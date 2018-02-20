import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import VarHelper from '../../utils/VarHelper';

export default class Analytic extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.analytic_container}>
                    <Text>Tổng số đơn</Text>
                    <Text style={styles.redText}>{this.props.bill_counter}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.onPressBtn()} style={styles.analytic_container}>
                    <View style={styles.floatBtn_container}/>
                </TouchableOpacity>
                <View style={styles.analytic_container}>
                    <Text>Tổng doanh thu</Text>
                    <Text style={styles.greenText}>{VarHelper.number_format(parseInt(this.props.money_counter), '.', '.')}</Text>
                </View>
            </View>
        );
    }
    
}

Analytic.propTypes = {
    bill_counter: PropTypes.number,
    money_counter: PropTypes.number,
    onPressBtn: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    analytic_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    floatBtn_container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black'
    },
    redText: {
        color: 'red',
        fontSize: 18,
    },
    greenText: {
        color: 'green',
        fontSize: 18,
    },
})