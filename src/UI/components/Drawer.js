import React, { Component } from 'react';
import {
    View, StyleSheet, ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import DrawerItem from '../elements/DrawerItem';

export default class DrawerMenu extends Component {
    onPressItem(key) {
        this.props.navigation.navigate(key)
    }
    render() {
        return (
            <ImageBackground
                source={(require('@assets/bg_drawer.png'))}
                style={styles.container}>
                <DrawerItem
                    icon={require('@assets/icons/ic_orders.png')}
                    title="Orders"
                    onPress={() => this.onPressItem('HomeWithMap')}
                />
                <DrawerItem
                    icon={require('@assets/icons/ic_staff.png')}
                    title="Nhân viên"
                    onPress={() => this.onPressItem('Staffs')}
                />
                <DrawerItem
                    icon={require('@assets/icons/ic_chart.png')}
                    title="Quản lý"
                    onPress={() => this.onPressItem('Admin')}
                />
            </ImageBackground>
        );
    }

}

DrawerMenu.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20
    },
})