import React, { Component } from 'react';
import {
    WebView, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, ImageBackground, Text, StatusBar
} from 'react-native';
import Orientation from 'react-native-orientation';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import NavBar from '../elements/NavBar';
import IposHelper from '../../services/Firebase/Ipos';
import Chart from 'react-native-chart';
import AnalyticBox from '../elements/AnalyticBox';
import AnalyticList from '../elements/AnalyticList';

const { width, height } = Dimensions.get("window")
const data = [[
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
]];

class Admin extends Component {
    state = {
        htmlHeight: 300,
        analyticList: [],
        selectedMonth: 2,
        listThu_7day: [],
        listChi_7day: [],
        listLai_7day: [],
        list_days: [],
        isLoading: false
    }
    componentDidMount() {
        Orientation.lockToPortrait()
        StatusBar.setBarStyle("light-content")
        this.getListAnalytic()
    }
    getListAnalytic(month) {
        this.setState({ isLoading: true })
        let today = new Date().getDate()
        let list_days = []
        let listThu_7day = []
        let listChi_7day = []
        let listLai_7day = []
        IposHelper.getAnalytic_month(month, (data) => {
            for (let i = 0; i < 7; i++) {
                let day = today - i
                if (day > 0) {
                    list_days = [`m${day}`, ...list_days]
                    if (data && data.hasOwnProperty(`d${day}`)) {
                        let money = data[`d${day}`].money_counter || 0
                        let pay = data[`d${day}`].pay_counter || 0
                        listThu_7day = [money, ...listThu_7day]
                        listChi_7day = [pay, ...listChi_7day]
                        listLai_7day = [money - pay, ...listLai_7day]
                    } else {
                        listThu_7day = [10, ...listThu_7day]
                        listChi_7day = [10, ...listChi_7day]
                        listLai_7day = [10, ...listLai_7day]
                    }
                }
            }
            this.setState({ listThu_7day, listChi_7day, listLai_7day, list_days },() => {
                this.setState({ isLoading: false })
            })
        })
    }
    onNavigationChange(event) {
        if (event.title) {
            const htmlHeight = Number(event.title)
            this.setState({ htmlHeight: htmlHeight });
        }
    }
    render() {
        return (
            <ImageBackground
                source={require('@assets/background.png')}
                style={styles.container}>
                {!this.state.isLoading ?
                    <ScrollView>
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
                        <View style={{ height: 330, backgroundColor: 'white', paddingTop: 10, margin: 10, borderRadius: 5, overflow: 'hidden' }}>
                            <Text style={{ marginLeft: 15 }}>Thu-chi-lãi 7 ngày trước</Text>
                            <WebView
                                ref={'webview'}
                                automaticallyAdjustContentInsets={true}
                                source={{
                                    html: `<html>
                        <head>
                        <meta name="description" content="Sample - Line and Bar">
                          <meta charset="utf-8">
                          <title>Line chart</title>
                          <script src="https://code.jquery.com/jquery-2.2.4.js"></script>
                          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.2/Chart.bundle.js"></script>
                          
                        </head>
                        
                        <body>
                            <div style="width: 100%">
                                <canvas id="canvas" height="280" width="${width - 40}"></canvas>
                            </div>
                        </body>
                        </html>
                        <script>
                            var barChartData = {
                                labels: ${this.state.list_days},
                                datasets: [{
                                    label: 'Thu',
                                    backgroundColor: "green",
                                    data: ${this.state.listThu_7day},
                                    borderColor: 'green',
                                    borderWidth: 2
                                }, {
                                    label: 'Chi',
                                    backgroundColor: "black",
                                    data: ${this.state.listChi_7day},
                                    borderColor: 'back',
                                    borderWidth: 2
                                }, ]
                        
                            };
                            var myBar = null;
                            window.onload = function() {
                                var ctx = document.getElementById("canvas").getContext("2d");
                                myBar = new Chart(ctx, {
                                    type: 'bar',
                                    data: barChartData,
                                    options: {
                                        responsive: true,
                                    }
                                });
                            };
                            window.location.hash = 1;
                            var calculator = document.createElement("div");
                            calculator.id = "height-calculator";
                            while (document.body.firstChild) {
                                calculator.appendChild(document.body.firstChild);
                            }
                            document.body.appendChild(calculator);
                            document.title = calculator.scrollHeight;
                        </script>
                        ` }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                decelerationRate="normal"
                                startInLoadingState={false}
                                scalesPageToFit={false}
                                scrollEnabled={false}
                                onNavigationStateChange={this.onNavigationChange.bind(this)}
                                contentContainerStyle={{ padding: 0, margin: 0, borderWidth: 0, borderRadius: 5 }}
                                renderError={(e) => {
                                    return (
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 14, color: 'black', marginTop: 20, textAlign: 'center' }}>
                                                Lỗi kết nối, vui lòng kiểm tra lại!
                                </Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                        <AnalyticList
                            title="Top 10 đồ bán chạy trong tháng"
                            data={["1", "2"]}
                        />
                        <AnalyticList
                            title="Lượng đồ tiêu thụ trong tháng"
                            data={["1", "2"]}
                        />
                    </ScrollView>
                    :
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View>
                }
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