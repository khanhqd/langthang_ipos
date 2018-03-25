import React from 'react';
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';

const BG_COLOR = 'white'
const SECOND_COLOR = 'rgb(13,159,103)'
const OrderItem = props => {
    return (
        <View style={styles.container}>
            <View style={{
                height: 50,
                width: 193,
                justifyContent: 'center',
                paddingLeft: 15
            }}>
                <Text style={{ fontSize: 17 }}>{props.item.short_name}</Text>
            </View>
            <View style={styles.containerIcon}>
                <TouchableOpacity
                    onPress={props.on_LeftPress}
                    style={{ padding: 20 }}>
                    <Text style={styles.iconText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerNumber}>
                <Text style={{ fontSize: 20 }}>{props.item.quantity}</Text>
            </View>
            <View style={styles.containerIcon}>
                <TouchableOpacity
                    onPress={props.on_RightPress}
                    style={{ padding: 20 }}>
                    <Text style={styles.iconText}>+</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = {
    container: {
        flexDirection: 'row',
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: 'rgb(239,239,239)',
        marginTop: 1,
    },
    containerIcon: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECOND_COLOR
    },
    containerNumber: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }

}
export default OrderItem;