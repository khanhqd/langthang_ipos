import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
//redux
import appReducer from "@redux/reducers";
import initialState from "@redux/initialState";
import storeFactory from "@redux/store";
import { Provider } from "react-redux";
import Orientation from 'react-native-orientation';
export const store = storeFactory(initialState);

import BaseContainer from "./BaseComponent";
import DrawerMenu from './components/DrawerMenu';
import Template from './containers/ContainerTemplate';
import Home from './containers/Home';
import Create_Order from './containers/Create_Order';
import Create_KhoanChi from './containers/Create_KhoanChi';
import Admin from './containers/Admin';

const width = Dimensions.get("window").width;

const Main = StackNavigator({
    Admin: {
        screen: Admin,
        navigationOptions: {
            header: null,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    Create_Order: {
        screen: Create_Order,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    Create_KhoanChi: {
        screen: Create_KhoanChi,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    
})

export default class App extends BaseContainer {
    componentDidMount() {
        // Orientation.lockToLandscape()
    }
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({

});