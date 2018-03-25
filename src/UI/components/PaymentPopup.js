import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView, KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { Toast, Button, Card, CardItem, Body, Text, H2, CheckBox, List, ListItem, H3, Form, Input, Label, Item, Content } from 'native-base';
import FirebaseHelper from '../../services/Firebase/Ipos_v2';

export default class PaymentPopup extends Component {
    state = {
        showModal: false,
        discount: false,
        paid: null,
        discount_note: ""
    }
    thanhToan = () => {
        if (this.state.discount && (this.state.discount_note.length == 0 || !this.state.paid)) {
            Toast.show({
                text: 'Nhập thiếu dữ liệu',
                position: 'bottom',
                buttonText: 'Ok'
            })
            return;
        }
        if (this.state.paid > 1000) {
            Toast.show({
                text: 'Nhập sai định dạng số tiền',
                position: 'bottom',
                buttonText: 'Ok'
            })
            return;
        }
        let order = this.props.order
        FirebaseHelper.paidOrder(order.key, this.state.paid || order.money, this.state.discount, this.state.discount_note)
            .then(() => {
                Toast.show({
                    text: 'Thanh toán thành công',
                    position: 'bottom',
                    buttonText: 'Ok'
                })
                FirebaseHelper.countProduct(order.items)
                this.props.onSuccess()
            }).catch((e) => { })
    }
    render() {
        let order = this.props.order
        return (
            <View style={{ height: 500, width: 300, alignSelf: 'center' }}>
                <Card>
                    <CardItem>
                        <Body style={{ alignItems: 'center' }}>
                            <H2 style={{ color: "rgb(13,159,103)" }}>Thanh toán</H2>
                            <ScrollView style={{ maxHeight: 400, width: '100%' }}>
                                <List style={{ width: '100%' }}>
                                    {order.items.map((item, index) => {
                                        return (
                                            <ListItem key={index} style={{ justifyContent: 'space-between' }}>
                                                <Text>{item.quantity}</Text>
                                                <Text>{item.item_name}</Text>
                                                <Text>{item.price / 1000}K</Text>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 15 }}>
                                <H3>Tổng</H3><H3>{order.money / 1000}K</H3>
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%', padding: 10, paddingBottom: 0 }}>
                                <CheckBox checked={this.state.discount} onPress={() => this.setState({ discount: !this.state.discount })} />
                                <Text style={{ marginLeft: 20 }}>Giảm giá</Text>
                            </View>
                            {this.state.discount &&
                                <View style={{ width: '100%' }}>
                                    <Item floatingLabel>
                                        <Label>Thực thu</Label>
                                        <Input value={this.state.paid} onChangeText={(text) => this.setState({ paid: text })} keyboardType="number-pad" />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label>Lí do</Label>
                                        <Input value={this.state.discount_note} onChangeText={(text) => this.setState({ discount_note: text })} />
                                    </Item>
                                </View>
                            }
                        </Body>
                    </CardItem>
                </Card>
                <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, flexDirection: 'row' }}>
                    <Button block success style={{ width: '100%' }} onPress={this.thanhToan}><Text> Thanh toán </Text></Button>
                </View>
            </View>
        );
    }

}

PaymentPopup.propTypes = {

};

const styles = StyleSheet.create({
    container: {
    },
})