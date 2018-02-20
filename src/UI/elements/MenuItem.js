import React from 'react';
import {
    View, StyleSheet, TouchableOpacity, Image, Text, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import GLOBAL from '../../constants/style';
import VarHelper from '../../utils/VarHelper';

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const width = Math.max(heightScreen, widthScreen)
const height = Math.min(heightScreen, widthScreen)

const MenuItem = props => {
    let item = props.data
    let imageSource = item.image ? { uri: item.image } : require('@assets/logo.jpg')
    return (
        <View style={styles.ViewMenu_Row_Inner}>
            <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
                <View style={styles.ViewMenu_Cover}>
                    <Image source={imageSource} style={styles.ViewMenu_CoverImg} />
                </View>
                <View style={styles.ViewMenu_Info}>
                    <Text style={styles.ViewMenu_InfoTitle} numberOfLines={2}>
                        {item.short_name}
                    </Text>
                    <Text style={styles.ViewMenu_InfoPrice} numberOfLines={1}>
                        {VarHelper.number_format(parseInt(item.price), '.', '.')} đ
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

MenuItem.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewMenu_Row_Inner: {
        width: width/6 - 15,
        // height: width/3 - 15,        
        marginTop: 10,
        marginLeft: 10,
    },
    ViewMenu_Line: {
        height: 1,
        borderTopWidth: 0.5,
        borderTopColor: GLOBAL.COLOR.BORDER,
        flex: 1,
    },
    ViewMenu_Cover: {
        width: width/6 - 15,
        height: width/6 - 15,
    },
    ViewMenu_CoverImg: {
        width: width/6 - 15,
        height: width/6 - 15,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        resizeMode: 'cover',
    },
    ViewMenu_Info: {
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 14,
        fontWeight: '600',
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

export default MenuItem;