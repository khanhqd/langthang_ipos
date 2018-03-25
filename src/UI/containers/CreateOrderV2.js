import React, { Component } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from 'native-base';

import NavBarWithChild from '../elements/NavBarWithChild';
import OrderItem from '../elements/OrderItem';
import SearchBar from '../elements/SearchBar';
import MenuItem2 from '../elements/MenuItem2';
import Button2 from '../elements/Button2';
import VarHelper from '../../utils/VarHelper';
import FirebaseHelper from '../../services/Firebase/Ipos_v2';

const Item = Picker.Item;
const tableList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export default class CreateOrder extends Component {
    state = {
        menu: [],
        selected: [],
        fullMenu: [],
        table: null,
    }
    _keyExtractor = (item, index) => String(index)

    _onPress = (item) => {
        let selected1 = this.state.selected
        let aaa = selected1.filter((data) => { return data.id == item.id })
        if (aaa.length > 0) {
            for (let i = 0; i < selected1.length; i++) {
                if (selected1[i].id == item.id) {
                    selected1[i].quantity += 1
                }
            }
            this.setState({ selected: selected1 })
        }
        else {
            let foo = item
            foo.quantity = 1
            selected1.push(foo)
            this.setState({ selected: selected1 })
        }

    }
    _renderItem = ({ item }) => (
        <MenuItem2
            item={item}
            onPress={() => this._onPress(item)}

        />
    );
    _on_LeftPress = (item) => {
        if (item.quantity < 2) {
            let abc = this.state.selected.filter((data) => { return data.id != item.id })
            this.setState({ selected: abc })
        }
        else {
            let selected1 = this.state.selected
            for (let i = 0; i < selected1.length; i++) {
                if (selected1[i].id == item.id) {
                    selected1[i].quantity -= 1
                }
            }
            this.setState({ selected: selected1 })
        }
    }
    _on_RightPress = (item) => {
        let selected1 = this.state.selected
        for (let i = 0; i < selected1.length; i++) {
            if (selected1[i].id == item.id) {
                selected1[i].quantity += 1
            }
        }
        this.setState({ selected: selected1 })
    }
    _renderItem_selected = ({ item }) => (
        <OrderItem
            item={item}
            on_LeftPress={() => this._on_LeftPress(item)}
            on_RightPress={() => this._on_RightPress(item)}
        />
    );

    componentDidMount() {
        let { menu, table, oldOrder } = this.props.navigation.state.params
        this.setState({
            menu,
            fullMenu: menu,
            table: table
        })
        if (this.props.navigation.state.params.oldOrder) {
            this.setState({ selected: oldOrder.items })
        }
    }

    onChangeText = (text) => {
        let arr = text.split(" ")
        let listMenu = this.state.fullMenu
        for (let i = 0; i < arr.length; i++) {
            listMenu = listMenu.filter((item) => {
                return VarHelper.change_alias(item.short_name).indexOf(VarHelper.change_alias(arr[i])) != -1
            })
        }
        this.setState({
            menu: listMenu
        })
        // let dulieu = this.state.fullMenu
        // let dataSearched = dulieu.filter((item) => {
        //     let foo = VarHelper.change_alias(item.item_name)
        //     let bar = VarHelper.change_alias(data)
        //     return (foo.indexOf(bar) >= 0)
        // });
        // this.setState({
        //     menu: dataSearched
        // })
    }

    createOrder() {
        if (this.state.isLoading) return;
        let { oldOrder, onSuccess } = this.props.navigation.state.params
        this.setState({ isLoading: true }, () => {
            let data = {
                table: this.state.table,
                items: this.state.selected,
                money: VarHelper.getTotalMoney(this.state.selected)
            }
            if (oldOrder) {
                FirebaseHelper.editOrder(data, oldOrder.key)
                    .then(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.goBack()
                        if (typeof(onSuccess) == 'function') onSuccess()
                    }).catch((e) => { console.log(e) })
            } else {
                FirebaseHelper.createOrder(data)
                    .then(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.goBack()
                        if (typeof(onSuccess) == 'function') onSuccess()
                    }).catch((e) => {
                        alert(e.toString())
                        this.setState({ isLoading: false })
                    })
            }
        })
    }

    onValueChange(value) {
        this.setState({
            table: value
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <NavBarWithChild
                    leftIcon={require('@assets/icons/back.png')}
                    title="Tạo order"
                    leftIconPress={() => this.props.navigation.goBack()}
                    backgroundColor={"white"}
                    statusbarColor={"white"}
                >
                    <Picker
                        mode="dropdown"
                        placeholder="Bàn 0"
                        note={false}
                        selectedValue={this.state.table}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        {tableList.map((item, index) => {
                            return (
                                <Item label={`Bàn ${item}`} value={item} key={index} />
                            )
                        })}
                    </Picker>
                </NavBarWithChild>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.selected}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem_selected}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <SearchBar
                            search={this.onChangeText}
                        />
                        <FlatList
                            data={this.state.menu}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                </View>
                <Button2
                    onPress={() => this.createOrder()}
                    button={this.props.navigation.state.params.oldOrder ? 'Sửa đơn' : 'Tạo đơn'}
                />
                {this.state.isLoading &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <ActivityIndicator color="green" />
                    </View>
                }
            </View>
        )
    }
}
