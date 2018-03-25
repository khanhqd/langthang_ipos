import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import VarHelper from '../../utils/VarHelper';

const BG_COLOR = 'white'
const PRIMARY_COLOR = '#FF6265'
const SECOND_COLOR = 'rgb(13,159,103)'
const TITLE_COLOR = 'rgb(208,193,158)'

const MenuItem2 = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={{ fontSize: 17 }}>{props.item.short_name}</Text>
                <Text style={{ fontSize: 17 }}>{VarHelper.number_format(parseInt(props.item.price), '.', '.')} đ</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgb(239,239,239)',
        justifyContent: 'space-between'
    }
}
export default MenuItem2;

