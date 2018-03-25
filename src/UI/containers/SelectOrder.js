import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView,
} from 'react-native';
import { List, ListItem, ActionSheet, Toast } from 'native-base';
import Helper from '../../services/Firebase/Ipos_v2';
import NavBar from '../elements/NavBar';
import moment from 'moment';
import Modal from "react-native-modal";
import PaymentPopup from '../components/PaymentPopup';
import FirebaseHelper from '../../services/Firebase/Ipos_v2';

var BUTTONS = ["Thanh toán", "Chi tiết", "Sửa order", "Xóa", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class SelectOrder extends Component {
    state = {
        showModal: false,
        selectedItem: {},
        orders: this.props.navigation.state.params.orders
    }
    componentDidMount() {
        Toast.show({
            text: 'Chọn 1 đơn để thanh toán hoặc chỉnh sửa',
            position: 'bottom',
            buttonText: 'Ok'
        })
    }
    onPressItem = (title, data) => {
        this.setState({ selectedItem: data }, () => {
            ActionSheet.show(
                {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: title
                },
                buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] }, () => this.handleAction(buttonIndex));
                }
            )
        })
    }
    handleAction(index) {
        switch (index) {
            case 0:
                this.thanhToanNgay()
                break;
            case 1:
                this.thanhToan()
                break;
            case 2:
                this.editOrder()
                break;
            case 3:
                this.deleteOrder()
                break;
            default:
                break;
        }
    }
    thanhToanNgay() {
        let order = this.state.selectedItem
        FirebaseHelper.paidOrder(order.key, order.money, false, "")
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
    thanhToan() {
        this.setState({ showModal: true })
    }
    editOrder() {
        let { menu, table } = this.props.navigation.state.params
        this.props.navigation.navigate("CreateOrder", { menu, table, oldOrder: this.state.selectedItem, onSuccess: () => this.onCreateOrderSuccess() })
    }
    removePaid() {
        let removeId = this.state.selectedItem.key
        this.setState({
            orders: this.state.orders.filter((item) => { return item.key != removeId })
        })
    }
    onCreateOrder() {
        let { menu, table } = this.props.navigation.state.params
        this.props.navigation.navigate("CreateOrder", { menu, table, onSuccess: () => this.onCreateOrderSuccess() })
    }
    onCreateOrderSuccess() {
        setTimeout(() => {
            this.props.navigation.goBack()
        }, 100)
    }
    deleteOrder() {
        FirebaseHelper.changeOrderState(this.state.selectedItem.key, 'delete')
            .then(() => {
                Toast.show({
                    text: 'Xóa thành công',
                    position: 'bottom',
                    buttonText: 'Ok'
                })
                this.props.navigation.goBack()
            }).catch((e) => { })
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="Chọn order"
                    leftBtnText="Back"
                    leftIconPress={() => this.props.navigation.goBack()}
                    rightBtnText="Thêm"
                    rightIconPress={() => this.onCreateOrder()}
                    backgroundColor={"white"}
                    statusbarColor={"white"}
                />
                {this.state.orders &&
                    <List>
                        {this.state.orders.map((item, index) => {
                            let time = moment(item.checkin).format('HH:mm')
                            return (
                                <View key={index}>
                                    <ListItem
                                        onPress={() => this.onPressItem(`Checkin ${time} - ${item.items.length} đồ - ${item.money / 1000}K`, item)}
                                    >
                                        <Text style={{ fontWeight: 'bold' }}>  Checkin {time}   -   {item.items.length} đồ   -   {item.money / 1000}K</Text>
                                    </ListItem>
                                    <List style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
                                        {item.items.map((order_item, index) => {
                                            return (
                                                <ListItem
                                                    onPress={() => this.onPressItem(`Checkin ${time} - ${item.items.length} đồ - ${item.money / 1000}K`, item)}
                                                    key={`or_${index}`} style={{ justifyContent: 'space-between', borderBottomWidth: 0 }}>
                                                    <Text>{order_item.quantity}</Text>
                                                    <Text>{order_item.item_name}</Text>
                                                    <Text>{order_item.price / 1000}K</Text>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </View>
                            )
                        })}
                    </List>
                }
                <Modal
                    backdropOpacity={0.3}
                    isVisible={this.state.showModal}
                    onBackdropPress={() => this.setState({ showModal: false })}
                >
                    <PaymentPopup
                        onSuccess={() => {
                            this.setState({ showModal: false })
                            this.props.navigation.state.params.refresh()
                            this.removePaid()
                        }}
                        order={this.state.selectedItem}
                    />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})