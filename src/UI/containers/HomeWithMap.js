import React, { Component } from 'react';
import { View, Text, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
import { ActionSheet } from 'native-base';
import IposHelper from '../../services/Firebase/Ipos';
import Analytic_Bottom2 from '../components/Analytic_Bottom2';
import Table from '../elements/Table';
import FirebaseHelper from '../../services/Firebase/Ipos_v2';
import VarHelper from '../../utils/VarHelper';
import Modal from "react-native-modal";
import PaymentPopup from '../components/PaymentPopup';

var BUTTONS = ["Thanh toán", "Chi tiết", "Sửa order", "Xóa", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class HomeWithMap extends Component {
    state = {
        menu: [],
        countPress: 0,
        list_orders: [],
        not_paids: [],
        selectedItem: {},
        showModal: false,
        totalMoney: 0
    }
    componentDidMount() {
        StatusBar.setHidden(true)
        AsyncStorage.getItem("menu")
            .then((data) => {
                if (data) {
                    this.setState({ menu: JSON.parse(menu) })
                }
            }).catch((e) => { })
        IposHelper.getMenu().then((data) => {
            let menu = data.filter((item) => { return item != null })
            this.setState({ menu })
            AsyncStorage.setItem("menu", JSON.stringify(menu))
        })
        this.getOrderToday()
        setTimeout(() => {
            FirebaseHelper.onNewOrder(data => {
                let list_orders;
                list_orders = VarHelper.uniqueArr([data, ...this.state.list_orders])
                this.setState({
                    list_orders,
                    not_paids: list_orders.filter((item) => { return item.state != 'paid' }),
                }, () => console.log(this.state.not_paids));
            })
        }, 1000)
    }
    getOrderToday() {
        FirebaseHelper.getOrders_today().then((data) => {
            if (data) {
                this.setState({
                    list_orders: data,
                    not_paids: data.filter((item) => { return item.state != 'paid' }),
                    isLoading: false,
                }, () => console.log(this.state.not_paids))
                let paids = data.filter((item) => { return item.state == 'paid' })
                let totalMoney = 0
                for (let i = 0; i< paids.length; i ++) {
                    totalMoney = totalMoney + Number(paids[i].paid)
                }
                this.setState({ totalMoney })
            }
        })
    }
    handleAction(index) {
        switch (index) {
            case 0:
                this.thanhToan()
                break;
            case 1:
                this.chuyenBan()
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
    thanhToan() {
        this.setState({ showModal: true })
    }
    toDetail(active, table) {
        if (active.length > 0) {
            this.props.navigation.navigate("SelectOrder", { orders: active, menu: this.state.menu, table, refresh: () => this.getOrderToday() })
        }
        // else if (active.length == 1) {
        //     this.setState({ selectedItem: active[0] })
        //     ActionSheet.show(
        //         {
        //             options: BUTTONS,
        //             cancelButtonIndex: CANCEL_INDEX,
        //             destructiveButtonIndex: DESTRUCTIVE_INDEX,
        //         },
        //         buttonIndex => {
        //             this.setState({ clicked: BUTTONS[buttonIndex] }, () => this.handleAction(buttonIndex));
        //         }
        //     )
        // }
        else {
            this.props.navigation.navigate("CreateOrder", { menu: this.state.menu, table })
        }
    }
    onSecretPress() {
        this.setState({
            countPress: this.state.countPress + 1
        }, () => {
            if (this.state.countPress > 3) {
                this.props.navigation.navigate("Admin")
                this.setState({ countPress: 0 })
            }
        })
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('@assets/Bg2.jpg')}
            >
                <View style={styles.container}>
                    <View style={styles.topView}>
                        <View style={styles.topViewTop}>
                            <View style={styles.topleftTop}>
                                <View style={{ alignItems: 'center' }}>
                                    <Table id={1} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 1)} />
                                    <Table id={2} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 2)} />
                                </View>
                                <View style={styles.topViewBottom}>
                                    <Table id={3} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 3)} />
                                    <Table id={4} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 4)} />
                                </View>
                            </View>
                            <View style={styles.topRightTop}>
                                <Table id={5} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 5)} />
                                <View style={styles.quay}>
                                    <Text style={{ color: 'white' }}>Quầy</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topViewBottom}>
                            <Table id={6} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 6)} />
                            <Table id={7} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 7)} />
                            <View
                                onTouchStart={() => this.onSecretPress()}
                                style={{ width: 80, height: '100%', borderLeftWidth: 1, borderColor: 'white' }}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.leftBottom}>
                            <View style={{ flex: 1 }}>
                                <Table id={8} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 8)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Table id={9} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 9)} />
                            </View>
                        </View>
                        <View style={styles.centerBottom}>
                            <Table id={10} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 10)} />
                            <Table id={11} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 11)} />
                            <Table id={12} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 12)} />
                        </View>
                        <View style={styles.rightBottom}>
                            <Table id={13} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 13)} />
                            <Table id={14} orderList={this.state.not_paids} onPress={(active) => this.toDetail(active, 14)} />
                        </View>
                    </View>
                </View>
                <Analytic_Bottom2
                    not_paid={this.state.not_paids.length}
                    money_counter={this.state.totalMoney}
                    bill_counter={this.state.list_orders.length}
                    onPressLeft={() => { }}
                    onPressCenter={() => { }}
                    onPressRight={() => { }}
                />
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
            </ImageBackground>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        margin: 5,
    },

    topView: {
        flex: 3,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    topViewTop: {
        flex: 2,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'white'
    },
    topViewBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    },
    topleftTop: {
        flex: 2,
    },
    topRightTop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomView: {
        flex: 2,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white'
    },
    leftBottom: {
        flex: 1,
        marginLeft: 20,
    },
    centerBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20
    },
    rightBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 1,
        width: '100%',
        borderColor: 'white'

    },
    imagebackground: {
        flex: 4,
        resizeMode: 'contain'
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'cover'
    },
    quay: {
        width: '100%',
        height: 80,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white'

    },
    imagebackground: {
        flex: 1,
        resizeMode: 'contain'
    },
}