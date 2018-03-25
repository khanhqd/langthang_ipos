import React, { Component } from 'react';
import {
    Image, View, StyleSheet, Platform, TouchableOpacity, Text
} from 'react-native';
import PropTypes from 'prop-types';
import GLOBAL from '../../constants/style';

const NavBar = props => {
    return (
        <View>
            {Platform.OS == 'ios' &&
                <View style={{ height: 20, width: '100%', backgroundColor: props.statusbarColor || '#4A4F70' }} />
            }
            <View style={[styles.container, { backgroundColor: props.backgroundColor || '#4A4F70' }]}>
                <TouchableOpacity
                    onPress={props.leftIconPress}
                    style={styles.btnContainer}
                >
                    {props.leftBtnText ?
                        <Text
                            numberOfLines={1}
                            style={[styles.btnText, { marginLeft: 10, width: 50 }]}
                        >
                            {props.leftBtnText}
                        </Text>
                        :
                        <Image
                            resizeMode="contain"
                            source={props.leftIcon}
                            style={{ width: 18, height: 18 }}
                        />
                    }
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={props.rightIconPress}
                    style={[styles.btnContainer, { width: 80 }]}
                >
                    {props.children}
                </TouchableOpacity>
            </View>
        </View>
    )
}

NavBar.propTypes = {
    statusbarColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    leftIcon: Image.propTypes.source,
    rightIcon: Image.propTypes.source,
    leftIconPress: PropTypes.func,
    rightIconPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnText: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: GLOBAL.COLOR.BORDER,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: GLOBAL.COLOR.TEXT,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnText: {
        color: GLOBAL.COLOR.TEXT,
        fontSize: 14,
        textAlign: 'center'
    },
    btnContainer: {
        width: 40,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default NavBar;