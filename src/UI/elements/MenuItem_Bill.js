import React from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Text
} from 'react-native';
import PropTypes from 'prop-types';
import GLOBAL from '../../constants/style';
import VarHelper from '../../utils/VarHelper';

const MenuItem_Bill = props => {
    let item = props.data
    let imageSource = item.image ? { uri: item.image } : require('@assets/logo.jpg')
    return (
        <View style={styles.ViewMenu_Row}>
            <View style={styles.ViewMenu_Row_Inner}>
                <TouchableOpacity style={styles.ViewMenu_Touch} onPress={() => { }}>
                    <View style={styles.ViewMenu_Cover}>
                        <Image source={imageSource} style={styles.ViewMenu_CoverImg} />
                    </View>
                    <View style={styles.ViewMenu_Info}>
                        <Text style={styles.ViewMenu_InfoTitle} numberOfLines={2}>
                            {item.item_name}
                        </Text>
                        <Text style={styles.ViewMenu_InfoPrice} numberOfLines={1}>
                            {VarHelper.number_format(parseInt(item.price), '.', '.')} đ
                        </Text>
                    </View>
                </TouchableOpacity>
                {item.quantity && item.quantity > 0 ?
                    <View style={styles.ViewMenu_Select}>
                        <TouchableOpacity style={styles.ViewMenu_Count} onPress={() => props.removeItemCart()}>
                            <Image style={[styles.ViewMenu_Count_Img, { tintColor: 'black' }]} source={require('@assets/icons/ic-remove.png')} />
                        </TouchableOpacity>
                        <View style={styles.ViewMenu_Count_View}>
                            <Text style={styles.ViewMenu_Count_Txt}>{item.quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.ViewMenu_Count} onPress={() => props.addItemCart()}>
                            <Image style={[styles.ViewMenu_Count_Img, { tintColor: 'black' }]} source={require('@assets/icons/ic-plus.png')} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.ViewMenu_Select}>
                        <TouchableOpacity style={styles.ViewMenu_SelectBuy} onPress={() => props.addItemCart()}>
                            <Image style={styles.ViewMenu_SelectBuy_Img} source={require('@assets/icons/ic-add.png')} />
                            <Text style={styles.ViewMenu_SelectBuy_Txt}>Thêm</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View style={styles.ViewMenu_Line}></View>
        </View>
    )
}

MenuItem_Bill.propTypes = {

};

const styles = StyleSheet.create({
    container: {
    },
    ViewMenu_Row_Inner: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 15,
        marginRight: 15,
    },
    ViewMenu_Row_Inner: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 15,
        marginRight: 15,
    },
    ViewMenu_Line: {
        height: 1,
        borderTopWidth: 0.5,
        borderTopColor: GLOBAL.COLOR.BORDER,
        flex: 1,
    },
    ViewMenu_Touch: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ViewMenu_Cover: {
        width: 60,
        height: 60,
    },
    ViewMenu_CoverImg: {
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        resizeMode: 'cover',
    },
    ViewMenu_Info: {
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        justifyContent: 'center',
    },
    ViewMenu_InfoSale: {
        backgroundColor: '#7ED321',
        borderRadius: 3,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 3,
        paddingRight: 3,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    ViewMenu_InfoTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
        backgroundColor: 'transparent',
        color: GLOBAL.COLOR.TEXT,
    },
    ViewMenu_Select: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewMenu_Count: {
        backgroundColor: '#F0F1F6',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewMenu_Count_Img: {
        width: 40,
        height: 40,
    },
    ViewMenu_Count_View: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 15,
        marginLeft: 3,
        marginRight: 3,
    },
    ViewMenu_Count_Txt: {
        fontSize: 18,
        fontWeight: '600',
        color: GLOBAL.COLOR.PRIMARY,
    },
    ViewMenu_SelectBuy: {
        backgroundColor: '#F0F1F6',
        borderRadius: 12,
        height: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2,
        paddingRight: 12,
    },
    ViewMenu_SelectBuy_Img: {
        width: 24,
        height: 24,
    },
    ViewMenu_SelectBuy_Txt: {
        color: GLOBAL.COLOR.PRIMARY,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
})

export default MenuItem_Bill;