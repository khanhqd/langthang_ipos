import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Badge } from 'native-base';

const BG_COLOR = 'white'
const PRIMARY_COLOR = '#FF6265'
const SECOND_COLOR = 'rgb(13,159,103)'

class Table extends Component {
    state = {
        orderList: this.props.orderList || []
    }
    componentWillReceiveProps(props) {
        if (props.orderList) {
            let list = props.orderList || []
            this.setState({
                orderList: list
            })
        }
    }
    render() {
        let onTableList = this.state.orderList.filter((item) => { return (Number(item.table) == this.props.id) })
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress(onTableList)}
            >
                <Image
                    style={[styles.table, { tintColor: onTableList.length > 0 ? SECOND_COLOR : 'white' }]}
                    source={require('@assets/icons/table.png')} />
                <View style={{ position: 'absolute' }}>
                    {onTableList.map((item, index) => {
                        if (index == 2) return <Text key={index} style={styles.textMore}>+ {onTableList.length - 2} đơn nữa</Text>
                        if (index > 2) return null
                        return (
                            <Badge key={`${this.props.id}_${index}`} style={styles.badge}>
                                <Text style={styles.badgeText}>{item.items.length} đồ-{item.money / 1000}K</Text>
                            </Badge>
                        )
                    })}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    table: {
        width: 80,
        height: 70,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    badge: {
        marginTop: 2
    },
    badgeText: {
        color: 'white',
        fontSize: 13,
    },
    textMore: { 
        color: 'white', 
        fontSize: 12, 
        marginTop: 2 
    }
}

export default Table;