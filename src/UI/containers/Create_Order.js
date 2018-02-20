import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView, Dimensions, ActivityIndicator
} from 'react-native';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import NavBar from '../elements/NavBar';
import MenuItem_Bill from '../elements/MenuItem_Bill';
import MenuSelector from '../components/MenuSelector';
import IposHelper from '../../services/Firebase/Ipos';
const { width, height } = Dimensions.get("window")

class Create_Order extends Component {
    state = {
        menu: [],
        cart_list: [],
        isLoading: false
    }
    componentDidMount() {
        // this.setState({ menu: this.props.navigation.state.params.menu })
        if (this.props.navigation.state.params.bill_data) {
            this.setState({ cart_list: this.props.navigation.state.params.bill_data.items })
        }
    }
    onAddItem(data) {
        let cart_list = this.state.cart_list
        if (cart_list.filter((item) => { return item.id == data.id }).length > 0) {
            //đã có trong menu
            for (let i = 0; i < cart_list.length; i++) {
                if (cart_list[i].id == data.id) {
                    cart_list[i].quantity = !!cart_list[i].quantity ? cart_list[i].quantity + 1 : 1
                    break;
                }
            }
        } else {
            let newData = data
            newData.quantity = 1
            cart_list.push(newData)
        }
        this.setState({ cart_list })
    }
    onRemoveItem(data) {
        let cart_list = this.state.cart_list
        for (let i = 0; i < cart_list.length; i++) {
            if (cart_list[i].id == data.id) {
                if (cart_list[i].quantity == 1) {
                    cart_list = cart_list.filter((item) => { return item.id != data.id })
                } else {
                    cart_list[i].quantity = cart_list[i].quantity - 1
                }
                break;
            }
        }
        this.setState({ cart_list })
    }
    addOneMore(data) {
        let cart_list = this.state.cart_list
        for (let i = 0; i < cart_list.length; i++) {
            if (cart_list[i].id == data.id) {
                cart_list[i].quantity += 1
                break;
            }
        }
        this.setState({ cart_list })
    }
    onCreateOrder() {
        if (this.state.cart_list.length == 0) {
            alert('Chưa chọn đồ!')
            return;
        }
        if (!this.state.isLoading) {
            this.setState({ isLoading: true })
            if (this.props.navigation.state.params.bill_data)
                IposHelper.editOrder(this.state.cart_list, this.props.navigation.state.params.bill_data.key).then((data) => {
                    if (data == 'success') {
                        this.props.navigation.goBack()
                        this.setState({ isLoading: false })
                    }
                }).catch((e) => { console.log(e) })
            else
                IposHelper.createOrder(this.state.cart_list).then((data) => {
                    if (data == 'success') {
                        this.props.navigation.goBack()
                        this.setState({ isLoading: false })
                    }
                }).catch((e) => { console.log(e) })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="Tạo order"
                    leftBtnText="Hủy"
                    leftIconPress={() => this.props.navigation.goBack()}
                    rightBtnText={this.props.navigation.state.params.bill_data ? 'Sửa' : "Tạo"}
                    rightIconPress={() => this.onCreateOrder()}
                    backgroundColor={"transparent"}
                    statusbarColor={"transparent"}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <ScrollView>
                        {this.state.cart_list.map((item, index) => {
                            return (
                                <MenuItem_Bill
                                    key={index}
                                    data={item}
                                    removeItemCart={() => this.onRemoveItem(item)}
                                    addItemCart={() => this.addOneMore(item)}
                                />
                            )
                        })}
                    </ScrollView>
                    <MenuSelector
                        menu={this.props.navigation.state.params.menu}
                        onAddItem={(data) => { this.onAddItem(data) }}
                    />
                </View>
                {this.state.isLoading &&
                    <View style={{ position: 'absolute', width: width, height: height, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator
                            color="black"
                            size="large"
                        />
                    </View>
                }
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

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Create_Order)