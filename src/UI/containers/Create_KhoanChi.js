import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView
} from 'react-native';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import Input from '../elements/Input';
import Button from '../elements/Button';
import VarHelper from '../../utils/VarHelper';
import IposHelper from '../../services/Firebase/Ipos';
import NavBar from '../elements/NavBar';

class Create_KhoanChi extends Component {
    state = {
        noidungchi: '',
        sotien: "",
        nguoichi: '',
    }
    sendKhoanChi() {
        if (this.state.nguoichi == "" || this.state.sotien == "" || this.state.noidungchi == "") {
            alert('Hãy điền đủ thông tin')
            return;
        }
        let data = {
            payer: this.state.nguoichi,
            content: this.state.noidungchi,
            amount: this.state.sotien,
        }
        IposHelper.createKhoanChi(data).then((data)=>{
            if (data == 'success') {
                this.props.navigation.goBack()
            }
        }).catch((e)=>{console.log(e)})
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="Tạo khoản chi"
                    leftBtnText="Xóa"
                    leftIconPress={() => this.props.navigation.goBack()}
                    rightBtnText="Tạo"
                    rightIconPress={() => this.sendKhoanChi()}
                    backgroundColor={"transparent"}
                    statusbarColor={"transparent"}
                />
                <ScrollView style={{ flex: 1, padding: 15, }}>
                    <Input
                        title="Nội dung chi"
                        value={this.state.noidungchi}
                        onChangeText={(text) => this.setState({ noidungchi: text })}
                        height={60}
                        multiline={true}
                    />
                    <Input
                        title="Số tiền"
                        value={VarHelper.number_format(parseInt(VarHelper.change_alias(this.state.sotien)), '.', '.')}
                        onChangeText={(text) => this.setState({ sotien: text })}
                        keyboardType="numeric"
                        height={40}
                    />
                    <Input
                        title="Người chi"
                        value={this.state.nguoichi}
                        onChangeText={(text) => this.setState({ nguoichi: text })}
                        height={40}
                    />
                    <Button
                        title="THÊM"
                        onPress={() => this.sendKhoanChi()}
                    />
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Create_KhoanChi)