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
                <TouchableOpacity onPress={() => this.props.onPressLeft()} style={styles.analytic_container}>
                    <Text style={styles.titleText}>Chưa thanh toán</Text>
                    <Text style={styles.greenText}>{VarHelper.number_format(parseInt(this.props.not_paid), '.', '.')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPressCenter()} style={styles.analytic_container}>
                    <Text style={styles.titleText}>Tổng đơn</Text>
                    <Text style={styles.greenText}>{this.props.bill_counter}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onPressRight()} style={[styles.analytic_container, { borderRightWidth: 0 }]} activeOpacity={1}>
                    <Text style={styles.titleText}>Tổng thu</Text>
                    <Text style={styles.greenText}>{VarHelper.number_format(parseInt(this.props.money_counter), '.', '.')}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

Analytic.propTypes = {
    not_paid: PropTypes.number,
    money_counter: PropTypes.number,
    bill_counter: PropTypes.number,
    onPressLeft: PropTypes.func,
    onPressCenter: PropTypes.func,
    onPressRight: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    analytic_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'grey',
        height: '100%'
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
        fontSize: 19,
    },
    titleText: {
        color: 'grey',
        fontWeight: '500',
        marginBottom: 10,
        fontSize: 15,
        textAlign: 'center'
    }
})