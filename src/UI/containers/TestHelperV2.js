import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Text
} from 'react-native';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import Helper from '../../services/Firebase/Ipos_v2';

let item_demo = {
    id: 'bacxiu',
    item_name: 'Bạc xỉu',
    price: 20000,
    quantity: 2,
    short_name: 'Bạc xỉu',
}

class TestHepler extends Component {
    getTotalMoney(data) {
        let amount = 0
        for (let i = 0; i < data.length; i++) {
            amount += data[i].price * data[i].quantity
        }
        return amount
    }
    createOrder() {
        let data = {
            table: 'a1',
            items: [item_demo],
            note: "",
            money: this.getTotalMoney([item_demo])
        }
        Helper.createOrder(data)
            .then(() => {
                alert('success')
            }).catch((e) => { console.log(e) })
    }
    editOrder() {
        let data = {
            table: 'a3',
            items: [item_demo],
            note: "",
            money: 1000,
            state: "waiting", //old,
            ts_date: "", //old,
            ts_year: "", //old,
            ts_month: "", //old,
        }
        let key_demo = "-L86Oc_M2ou9-0h-6VGq"
        Helper.editOrder(data, key_demo)
            .then(() => {
                alert('success')
            }).catch((e) => { console.log(e) })
    }
    paidOrder() {
        let data = {
            paid: 123000,
            discount: 1,
            discount_note: 'KM'
        }
        let key_demo = "-L86Oc_M2ou9-0h-6VGq"
        Helper.paidOrder(key_demo, data.paid, data.discount, data.discount_note)
            .then(() => {
                Helper.countProduct([item_demo])
                alert('success')
            }).catch((e) => { console.log(e) })
    }
    fireFunction = () => {
        this.paidOrder()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.fireFunction}
                    style={{ padding: 30, backgroundColor: 'green' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>FIRE</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(TestHepler)