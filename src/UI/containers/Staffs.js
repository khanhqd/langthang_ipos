import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import FirebaseHelper from '../../services/Firebase/Ipos_v2';
import { List, ListItem, Text } from 'native-base'

const demo = ['1','2']
class Staffs extends Component {
    state = {
        listStaffs: []
    }
    componentDidMount() {
        FirebaseHelper.getListStaff()
            .then((data) => {
                this.setState({ listStaffs: data })
            })
    }
    onPressItem(item) {
        this.props.navigation.navigate("Camera")
    }
    render() {
        return (
            <View style={styles.container}>
                <List style={{ width: '100%' }}>
                    {this.state.listStaffs.map((item, index) => {
                        return (
                            <ListItem key={index} onPress={()=>this.onPressItem(item)}>
                                <Text style={{ marginLeft: 20 }}>{item.name}</Text>
                            </ListItem>
                        )
                    })}
                </List>
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

export default connect(mapStateToProps)(Staffs)