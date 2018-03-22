import React, { Component } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, FlatList } from 'react-native';

import NavBarman3 from '../elements/NavBarman3';
import OderItem from '../elements/OrderItem';
import SearchBar from '../elements/SearchBar';
import MenuItem2 from '../elements/MenuItem2';
import Button2 from '../elements/Button2';
import App from '../App'



export default class Langthang extends Component {
    state = {
        menu: [],
        selected: [],
        fullMenu: []
    }
    _keyExtractor = (item, index) => String(index)

    _onPress = (item) => {let selected1 = this.state.selected
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
            this.setState({ selected: selected1 },
                () => console.log(this.state.selected)
            )
        }

    }
    _renderItem = ({ item }) => (
        <MenuItem2
            item={item}
            onPress={()=> this._onPress(item)}
                
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
        <OderItem
            item={item}
            on_LeftPress={() => this._on_LeftPress(item)}
            on_RightPress={() => this._on_RightPress(item)}
        />
    );

    componentDidMount() {
        this.setState({ 
            menu: this.props.navigation.state.params.menu,
            fullMenu: this.props.navigation.state.params.menu,
        })
    }
    change_alias = (alias) => {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "");
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi 
        return str;
    }
    onChangeText = (data) => {
        let dulieu = this.state.fullMenu
        let dataSearched = dulieu.filter((item) => {
            let foo = this.change_alias(item.item_name)
            let bar = this.change_alias(data)
            return (foo.indexOf(bar) >= 0)
        });
        this.setState({
            menu: dataSearched
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <NavBarman3
                    leftIcon={require('@assets/icons/back.png')}
                    rightIcon={null}
                    title="Bàn 1"
                    onLeftPress={() => { this.props.navigation.goBack() }}
                />
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
                    button='Tạo đơn'
                />
            </View>
        )
    }
}

const styles = {



}