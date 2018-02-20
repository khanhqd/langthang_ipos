import React, { Component } from 'react';
import {
    View, StyleSheet, Text, Dimensions, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import VarHelper from '../../utils/VarHelper';

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const width = Math.max(heightScreen, widthScreen)

export default class BillItem_Full extends Component {
    render() {
        let data = this.props.data
        let time1 = moment(data.timestamp).format('DD/MM')
        let time2 = moment(data.timestamp).format('HH:mm')
        let time3 = data.check_out ? moment(data.check_out).format('HH:mm') : ''
        return (
            <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={this.props.onPress}>
                <View style={styles.date_container}>
                    <Text style={[styles.greyText,{ fontSize: 15 }]}>{time1}</Text>
                    {this.props.done && <Text style={[styles.redText,{ fontSize: 15 }]}>out: {time3}</Text>}
                    <Text style={[styles.greyText,{ fontSize: 15 }]}>{time2}</Text>
                </View>
                {!!data.items && data.items.map((item, index) => {
                    return (
                        <View style={styles.item_container} key={index}>
                            <View style={styles.title_container}>
                                <Text style={styles.titleText}>{item.item_name}</Text>
                            </View>
                            <View style={styles.quantity_container}>
                                <Text style={styles.greyText}>{item.quantity}</Text>
                            </View>
                            <View style={styles.price_container}>
                                <Text style={styles.greyText}>{VarHelper.number_format(parseInt(item.price), '.', '.')}đ</Text>
                            </View>
                        </View>
                    )
                })}
                <View style={[styles.item_container, { borderBottomWidth: 0, marginTop: 15 }]}>
                    <View style={styles.title_container}>
                        <Text style={[styles.titleText, { fontWeight: 'bold' }]}>Tổng tiền</Text>
                    </View>
                    <View style={[styles.price_container, { flex: 3 }]}>
                        <Text style={[styles.greenText, { fontWeight: 'bold', fontSize: 17 }]}>{VarHelper.number_format(parseInt(data.price), '.', '.')}đ</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}

BillItem_Full.propTypes = {
    listItem: PropTypes.array,
    totalPrice: PropTypes.number
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        shadowOpacity: 0.2,
        // elevation: 2,
        marginTop: 10,
        marginLeft: 10,
        width: (width - 120)/2,
    },
    greyText: {
        color: 'grey',
        fontSize: 15,
    },
    redText: {
        color: 'red',
        fontSize: 15,
    },
    greenText: {
        color: 'green',
        fontSize: 15,
    },
    titleText: {
        color: 'black',
        fontSize: 18,
    },
    item_container: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    title_container: {
        flex: 6,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    quantity_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    price_container: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    date_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }
})