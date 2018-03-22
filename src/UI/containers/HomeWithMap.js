import React, { Component } from 'react';
import { View, Text, ImageBackground, AsyncStorage, StatusBar } from 'react-native';
import IposHelper from '../../services/Firebase/Ipos';
import Analytic_Bottom2 from '../components/Analytic_Bottom2';
import Table from '../elements/Table';

export default class HomeWithMap extends Component {
    state = {
        usedTableList: [1, 3, 5, 7, 9],
        menu: [],
        countPress: 0
    }
    componentDidMount() {
        StatusBar.setHidden(true)
        AsyncStorage.getItem("menu")
            .then((data) => {
                if (data) {
                    this.setState({ menu: JSON.parse(menu) })
                }
            }).catch((e) => { })
        IposHelper.getMenu().then((data) => {
            let menu = data.filter((item) => { return item != null })
            this.setState({ menu })
            AsyncStorage.setItem("menu", JSON.stringify(menu))
        })
    }
    toDetail(active) {
        if (active) {
            alert('active')
        } else {
            alert('inactive')
        }
    }
    onSecretPress() {
        this.setState({
            countPress: this.state.countPress + 1
        }, () => {
            if (this.state.countPress > 3) {
                this.props.navigation.navigate("Admin")
                this.setState({ countPress: 0 })
            }
        })
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('@assets/Bg2.jpg')}
            >
                <View style={styles.container}>
                    <View style={styles.topView}>
                        <View style={styles.topViewTop}>
                            <View style={styles.topleftTop}>
                                <View style={{ alignItems: 'center' }}>
                                    <Table id={1} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                                    <Table id={2} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                                </View>
                                <View style={styles.topViewBottom}>
                                    <Table id={3} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                                    <Table id={4} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                                </View>
                            </View>
                            <View style={styles.topRightTop}>
                                <Table id={5} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                                <View style={styles.quay}>
                                    <Text style={{ color: 'white' }}>Quầy</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.topViewBottom}>
                            <Table id={6} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            <Table id={7} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            <View
                                onTouchStart={() => this.onSecretPress()}
                                style={{ width: 80, height: '100%', borderLeftWidth: 1, borderColor: 'white' }}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.leftBottom}>
                            <View style={{ flex: 1 }}>
                                <Table id={8} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Table id={9} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            </View>
                        </View>
                        <View style={styles.centerBottom}>
                            <Table id={10} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            <Table id={11} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            <Table id={12} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                        </View>
                        <View style={styles.rightBottom}>
                            <Table id={13} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                            <Table id={14} usedTableList={this.state.usedTableList} onPress={(active) => this.toDetail(active)} />
                        </View>
                    </View>
                </View>
                <Analytic_Bottom2
                    not_paid={20}
                    money_counter={1000}
                    bill_counter={10}
                    onPressLeft={() => { }}
                    onPressCenter={() => { }}
                    onPressRight={() => { }}
                />
            </ImageBackground>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        margin: 5,
    },

    topView: {
        flex: 3,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    topViewTop: {
        flex: 2,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'white'
    },
    topViewBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    },
    topleftTop: {
        flex: 2,
    },
    topRightTop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomView: {
        flex: 2,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white'
    },
    leftBottom: {
        flex: 1,
        marginLeft: 20,
    },
    centerBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20
    },
    rightBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 1,
        width: '100%',
        borderColor: 'white'

    },
    imagebackground: {
        flex: 4,
        resizeMode: 'contain'
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'cover'
    },
    quay: {
        width: '100%',
        height: 80,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white'

    },
    imagebackground: {
        flex: 1,
        resizeMode: 'contain'
    },
}