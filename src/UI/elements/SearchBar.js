import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const BG_COLOR = 'white'
const SECOND_COLOR = 'rgb(13,159,103)'
const SearchBar = props => {
    
    return (
        <View style={styles.container}>
            <Image
            style={styles.icon}
            source={require('@assets/icons/search.png')}
            />
            <TextInput 
            onChangeText={props.search}
            style={{width: '100%', height: 45}}
            placeholder='Tìm nhanh'/>
        </View>
    )
}

const styles = {
    container:{
        flexDirection: 'row',
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: 'grey'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 10,
        marginRight: 10
    }
    
}
export default SearchBar;