import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView, Text, RefreshControl, AsyncStorage, ActivityIndicator, Dimensions, Keyboard, Alert
} from 'react-native';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import Analytic_Bottom from '../components/Analytic_Bottom';
import Analytic_Top from '../components/Analytic_Top';
import BillItem_Full from '../components/BillItem_Full';
import IposHelper from '../../services/Firebase/Ipos';
import firebase from 'react-native-firebase';
import VarHelper from '../../utils/VarHelper';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet'

var codePush = require('react-native-code-push');
const { width, height } = Dimensions.get("window")

class Home extends Component {
    state = {
        selected_tab: 0,
        menu: [],
        list_orders: [],
        contents: [],
        doing_list: [],
        done_list: [],
        money_counter: 0,
        order_counter: 0,
        list_khoanchi: [],
        refreshing: false,
        isLoading: false,
        selected_bill: {},
        countPress: 0
    }
    componentWillMount() {
        // firebase.auth().signInAnonymously()
        //     .then((a) => console.log('login firebaseee'))
        //     .catch((e) => { console.log(e) })
    }
    componentDidMount() {
        this.checkCodePush()
        this.setState({ isLoading: true })
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
        this.getData()
        setTimeout(() => {
            IposHelper.onNewOrder(data => {
                let list_orders;
                list_orders = VarHelper.uniqueArr([data, ...this.state.list_orders])
                let doing_list = list_orders.filter((item) => { return item.state == 'doing' })
                this.setState({
                    list_orders,
                    doing_list,
                });
                // if (this.state.selected_tab == 0) this.setState({ contents: doing_list })
            })
        }, 1000)
    }
    getData() {
        IposHelper.getOrders_today().then((data) => {
            if (data)
                this.setState({
                    list_orders: data,
                    doing_list: data.filter((item) => { return item.state == 'doing' }),
                    done_list: data.filter((item) => { return item.state == 'done' }),
                    isLoading: false,
                    // contents: data.filter((item) => { return item.state == 'doing' }),
                })
        })
        IposHelper.getAnalytic((data) => {
            // console.log(data)
            // { order_counter: 10, money_counter: 915000 }
            this.setState({
                order_counter: data.order_counter,
                money_counter: data.money_counter,
            })
        })
        IposHelper.getKhoanChi(data => {
            let list_khoanchi;
            list_khoanchi = VarHelper.uniqueArr([data, ...this.state.list_khoanchi])
            this.setState({
                list_khoanchi,
            });
        })
    }
    checkCodePush = () => {
        codePush.allowRestart();
        codePush.sync({ updateDialog: false, installMode: codePush.InstallMode.ON_NEXT_RESTART },
            (status) => {
                switch (status) {
                    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                        break;
                    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                        alert('Đang cập nhật phiên bản mới')
                        break;
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        break;
                    case codePush.SyncStatus.UP_TO_DATE:
                        codePush.notifyApplicationReady();
                        break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                        codePush.notifyApplicationReady();
                        break;
                    case codePush.SyncStatus.UNKNOWN_ERROR:
                        codePush.notifyApplicationReady();
                        break;
                }
            },
            ({ receivedBytes, totalBytes }) => {

            }
        );
    }

    onChangeTab(tab) {
        // switch (tab) {
        //     case 0:
        //         this.setState({
        //             contents: this.state.doing_list
        //         }, () => { this.setState({ selected_tab: tab }) })
        //         break;
        //     case 1:
        //         this.setState({
        //             contents: this.state.done_list
        //         }, () => { this.setState({ selected_tab: tab }) })
        //         break;
        //     case 2:
        //         this.setState({
        //             contents: this.state.list_khoanchi
        //         }, () => { this.setState({ selected_tab: tab }) })
        //         break;
        // }
        this.setState({ selected_tab: tab })
    }
    onCreateOrder() {
        if (this.state.selected_tab == 2)
            this.props.navigation.navigate('Create_KhoanChi')
        else
            this.props.navigation.navigate('Create_Order', {
                menu: this.state.menu
            })
    }
    onPressBill(data) {
        let newData = data
        newData.state = 'done'
        newData.check_out = new Date().getTime()

        IposHelper.changeStateToDone(data.key)
        IposHelper.payOrder(data)
        this.setState({
            doing_list: this.state.doing_list.filter((item) => { return item.key != data.key }),
            done_list: VarHelper.uniqueArr([newData, ...this.state.done_list]),
        }, () => {
            this.setState({
                list_orders: this.state.doing_list.concat(this.state.done_list),
                // contents: this.state.selected_tab == 0 ? this.state.doing_list : this.state.done_list
            })
        })
    }

    onEditBill(data) {
        this.props.navigation.navigate('Create_Order', {
            menu: this.state.menu,
            bill_data: data
        })
    }

    onDeleteBill(data) {
        Alert.alert(
            'Xóa bill',
            'Bạn có chắc chắn không?',
            [{
                text: 'Không',
                onPress: () => {}
            },
            {
                text: 'Xác nhận',
                onPress: () => {
                    IposHelper.deleteOrder(data.key)
                    this.setState({
                        doing_list: this.state.doing_list.filter((item) => { return item.key != data.key }),
                    }, () => {
                        this.setState({
                            list_orders: this.state.doing_list.concat(this.state.done_list),
                        })
                    })
                }
            }]
        );
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getData()
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 2000)
    }

    showActionSheet = (item) => {
        Keyboard.dismiss()
        this.setState({ selected_bill: item })
        this.ActionSheet.show()
    }

    handlePress(i) {
        switch (i) {
            case 1:
                this.onPressBill(this.state.selected_bill)
                break;
            case 2:
                this.onEditBill(this.state.selected_bill)
                break;
            case 3:
                this.onDeleteBill(this.state.selected_bill)
                break;
            default:
                break;
        }
    }

    onSecretPress() {
        this.setState({
            countPress: this.state.countPress + 1
        },() => {
            if (this.state.countPress > 3) {
                this.props.navigation.navigate("Admin")
                this.setState({ countPress: 0 })
            }
        })
    }

    render() {
        const options = ['Hủy', 'Thanh toán', 'Sửa', 'Xóa']
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {this.state.selected_tab == 2 ?
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                            style={{ flex: 1, padding: 15 }}>
                            {this.state.list_khoanchi.map((item, index) => {
                                return (
                                    <View style={{ margin: 10, marginRight: 0, marginBottom: 0, padding: 10, borderBottomColor: 'grey', borderWidth: 1 }} key={index}>
                                        <Text>Nội dung: {item.content}</Text>
                                        <Text>Người chi: {item.who_pay}</Text>
                                        <Text>Giá: {item.price}</Text>
                                        <Text>Ngày: {moment(item.timestamp).format('DD/MM')}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        :
                        this.state.selected_tab == 1 ?
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                style={{ flex: 1, padding: 15, }}>
                                {this.state.done_list.map((item, index) => {
                                    return (
                                        <BillItem_Full
                                            done={true}
                                            onPress={() => { }}
                                            key={index}
                                            data={item}
                                        />
                                    )
                                })}
                            </ScrollView>
                            :
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                                style={{ flex: 1, padding: 15, }}>
                                {this.state.doing_list.map((item, index) => {
                                    return (
                                        <BillItem_Full
                                            onPress={() => this.showActionSheet(item)}
                                            key={index}
                                            data={item}
                                        />
                                    )
                                })}
                            </ScrollView>
                    }
                    <Analytic_Top
                        doing_counter={this.state.doing_list.length}
                        done_counter={this.state.done_list.length}
                        empty_table={5}
                        selected_tab={this.state.selected_tab}
                        onPressTab={(tab) => this.onChangeTab(tab)}
                    />
                </View>
                <Analytic_Bottom
                    money_counter={this.state.money_counter}
                    bill_counter={this.state.order_counter}
                    onPressBtn={() => this.onCreateOrder()}
                    onSecretPress={() => this.onSecretPress()}
                />
                {this.state.isLoading &&
                    <View style={{ position: 'absolute', width: width, height: height, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator
                            color="black"
                            size="large"
                        />
                    </View>
                }
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={0}
                    onPress={this.handlePress.bind(this)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 20,
        backgroundColor: 'white',
        alignItems: 'center'
    },
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Home)