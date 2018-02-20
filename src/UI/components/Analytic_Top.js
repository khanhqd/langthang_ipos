import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class Analytic_Top extends Component {
    render() {
        let props = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                onPress={()=>props.onPressTab(0)}
                style={props.selected_tab == 0 ? styles.analytic_container_active : styles.analytic_container}>
                    <Text style={styles.textNormal}>Đang</Text>
                    <Text style={styles.redText}>{this.props.doing_counter}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>props.onPressTab(1)}
                style={props.selected_tab == 1 ? styles.analytic_container_active : styles.analytic_container}>
                    <Text style={styles.textNormal}>Đã thu</Text>
                    <Text style={styles.greenText}>{this.props.done_counter}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>props.onPressTab(2)}
                style={props.selected_tab == 2 ? styles.analytic_container_active : styles.analytic_container}>
                    <Text style={styles.textNormal}>Khoản{`\n`} chi</Text>
                    {/* <Text style={styles.redText}>{this.props.empty_table}</Text> */}
                </TouchableOpacity>
            </View>
        );
    }

}

Analytic_Top.propTypes = {
    doing_counter: PropTypes.number,
    done_counter: PropTypes.number,
    empty_table: PropTypes.number,
    selected_tab: PropTypes.number
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    analytic_container: {
        flex: 1,
        height: '100%',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    analytic_container_active: {
        flex: 1,
        width: '100%',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        // borderRightWidth: 0,
        borderColor: 'green'
    },
    redText: {
        color: 'red',
        fontSize: 18,
        marginLeft: 10,
    },
    greenText: {
        color: 'green',
        fontSize: 18,
        marginLeft: 10,
    },
    textNormal: {
        textAlign: 'center',
        width: 70,
        fontWeight: 'bold'
    }
})