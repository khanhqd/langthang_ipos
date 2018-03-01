import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, ImageBackground, Text, StatusBar
} from 'react-native';
import Orientation from 'react-native-orientation';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import NavBar from '../elements/NavBar';
import IposHelper from '../../services/Firebase/Ipos';
import Chart from 'react-native-chart';

const { width, height } = Dimensions.get("window")
const data = [[
	[0, 1],
	[1, 3],
	[3, 7],
	[4, 9],
]];

class Admin extends Component {
    state = {

    }
    componentDidMount() {
        Orientation.lockToPortrait()
        StatusBar.setBarStyle("light-content")
    }

    render() {
        return (
            <ImageBackground
                source={require('@assets/background.png')}
                style={styles.container}>
                <View style={styles.header_container}>
                    <View style={styles.header_itemContainer}>
                        <Text style={[styles.header_bigText, { color: '#50BE52' }]}>8.000.000</Text>
                        <Text style={styles.header_subText}>Tổng thu tháng này</Text>
                    </View>
                    <View style={styles.header_itemContainer}>
                        <Text style={styles.header_bigText}>8.000.000</Text>
                        <Text style={styles.header_subText}>Tổng chi tháng này</Text>
                    </View>
                </View>

                <Chart
                    style={{ width: 400, height: 400 }}
					data={data}
					verticalGridStep={5}
					type="bar"
					showDataPoint={true}
					color={['#e1cd00']}
                />

            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header_container: {
        height: 70,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
    },
    header_itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_bigText: {
        color: '#FF3366',
        fontWeight: '700',
        fontSize: 19
    },
    header_subText: {
        color: 'white',
        fontSize: 15,
        marginTop: 5
    }
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Admin)