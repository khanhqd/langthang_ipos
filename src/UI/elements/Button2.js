import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BG_COLOR = 'white'
const PRIMARY_COLOR = '#FF6265'
const SECOND_COLOR = 'rgb(13,159,103)'
const Button2 = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={styles.view_button}>
            <Text style={styles.text_button}>{props.button}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = {
    text_button:{
        color: 'white',
        fontSize: 20
    },
    view_button: {
        backgroundColor: SECOND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    }
}

export default Button2;