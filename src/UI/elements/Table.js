import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const BG_COLOR = 'white'
const PRIMARY_COLOR = '#FF6265'
const SECOND_COLOR = 'rgb(13,159,103)'

const Table = props => {
    let active = props.usedTableList.filter((item) => { return (item == props.id) }).length > 0
    return (
        <TouchableOpacity
            onPress={() => props.onPress(active)}
        >
            <Image
                style={[styles.table, { tintColor: active ? SECOND_COLOR : 'white' }]}
                source={require('@assets/icons/table.png')} />
        </TouchableOpacity>
    )
}

const styles = {
    table: {
        width: 80,
        height: 70,
        resizeMode: 'contain',
        tintColor: 'white'
    }
}

export default Table;