import { Component } from 'react';
import firebase from 'react-native-firebase';
let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
let date = new Date().getDate();
let today = {
    ts_date: year + "-" + month + "-" + date,
    ts_month: year + "-" + month,
    ts_year: year
}

class Helper extends Component {
    getOrders_today = () => new Promise((resolve, reject) => {
        firebase.database().ref("ver2").child("orders").orderByChild("ts_date").equalTo(today.ts_date).once("value", snapshot => {
            let resData = snapshot.val()
            let arr = [];
            for (let key in resData) {
                arr.push({
                    key,
                    ...resData[key]
                })
            }
            resolve(arr);
        });
    })
    onNewOrder = (callback) => {
        firebase.database().ref("ver2").child("orders").limitToLast(1).on('value', data => {
            if (data.val() == null) return;
            let obj = data.val();
            let key = Object.keys(obj)[0];
            typeof callback === "function" && callback({
                key,
                ...obj[key]
            });
        })
    }
    createOrder = (data) => new Promise((resolve, reject) => {
        let sendData = {
            ...data,
            state: "waiting", //waiting, done, paid
            checkin: firebase.database.ServerValue.TIMESTAMP,
            ...today
        }
        firebase.database().ref("ver2").child("orders").push(sendData, (err) => {
            if (!err) {
                resolve('success')
            } else {
                reject(err)
            }
        })
    })
    editOrder = (data, key) => new Promise((resolve, reject) => {
        let sendData = {
            ...data,
            lastUpdate: firebase.database.ServerValue.TIMESTAMP,
        }
        firebase.database().ref("ver2").child("orders").child(key).update(sendData, (err) => {
            if (!err) {
                resolve('success')
            } else {
                reject(err)
            }
        })
    })
    changeOrderState = (key, state) => new Promise((resolve, reject) => {
        firebase.database().ref("ver2").child("orders").child(key).update({ state: state }, (err) => {
            if (!err) {
                resolve('success')
            } else {
                reject(err)
            }
        })
    })
    paidOrder = (key, totalMoney, discount, discount_note) => new Promise((resolve, reject) => {
        let paid
        if (totalMoney < 1000) {
            paid = totalMoney * 1000
        } else {
            paid = totalMoney
        }
        let sendData = {
            checkout: firebase.database.ServerValue.TIMESTAMP,
            paid,
            state: 'paid'
        }
        let paidData = {
            ...today,
            checkout: firebase.database.ServerValue.TIMESTAMP,
            money: paid
        }
        if (discount) {
            sendData.discount = discount;
            sendData.discount_note = discount_note;
            paidData.discount = discount
        }
        firebase.database().ref("ver2").child("orders").child(key).update(sendData, (err) => {
            if (!err) {
                firebase.database().ref("ver2").child("paid").child(key).set(paidData)
                resolve('success')
            } else {
                reject(err)
            }
        })
    })
    countProduct = (products) => {
        for (let i = 0; i < products.length; i++) {
            firebase.database().ref('ver2').child(`products_count/y${year}/m${month}/d${date}/${products[i].id}`).transaction((view) => {
                return view + products[i].quantity;
            });
        }
    }
    createKhoanChi = (data) => new Promise((resolve, reject) => {
        let amount = data.amount
        firebase.database().ref("ver2").child("pays").push({
            content: data.content,
            price: amount,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            who_pay: data.payer,
            ...today
        }, (err) => {
            if (!err) {
                resolve('success')
            } else {
                reject(err)
            }
        })
    })
}
export default new Helper();