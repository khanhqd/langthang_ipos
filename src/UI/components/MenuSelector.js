import React, { Component } from 'react';
import {
    View, StyleSheet, FlatList, Dimensions, TextInput, TouchableOpacity, Text
} from 'react-native';
import PropTypes from 'prop-types';
import MenuItem from '../elements/MenuItem';
import VarHelper from '../../utils/VarHelper';

const { height, width } = Dimensions.get('window')

export default class MenuSelector extends Component {
    state = {
        content: '',
        menu: [],
        full_menu: []
    }
    componentDidMount() {
        this.setState({
            menu: this.props.menu,
            full_menu: this.props.menu
        })
    }
    onFilterChange(text) {
        this.setState({ content: text }, () => {
            let arr = text.split(" ")
            let listMenu = this.state.full_menu
            for (let i = 0; i < arr.length; i++) {
                listMenu = listMenu.filter((item) => {
                    return VarHelper.change_alias(item.short_name).indexOf(VarHelper.change_alias(arr[i])) != -1
                })
            }
            this.setState({
                menu: listMenu
            })
        })
    }
    renderItem = ({ item, index }) => {
        return (
            <MenuItem
                onPress={() => this.props.onAddItem(item)}
                data={item}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Tìm nhanh ...'}
                        value={this.state.content}
                        // selectionColor={STYLE.COLOR.PRIMARY}
                        // placeholderTextColor={STYLE.COLOR.GREY}
                        onChangeText={(text) => this.onFilterChange(text)}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity
                        onPress={() => this.onFilterChange("")}
                        style={{
                            width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
                            borderColor: 'black',
                            borderWidth: 1,
                        }}>
                        <Text>Xóa</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    enableEmptySections={true}
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    data={this.state.menu}
                    renderItem={this.renderItem}
                    style={{ flex: 1 }}
                    numColumns={3}
                />
            </View>
        );
    }

}

MenuSelector.propTypes = {
    onAddItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        // height: height / 2 - 30,
        width: '50%',
        borderWidth: 1,
        borderColor: 'grey',
        borderTopWidth: 0,
        // shadowOpacity: 0.2
    },
    input: {
        height: 50,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'grey',
        color: 'black',
        marginHorizontal: 15,
    },
})