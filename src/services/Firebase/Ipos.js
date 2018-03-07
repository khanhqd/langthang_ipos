import { Component } from 'react';
import firebase from 'react-native-firebase';

const menu = [
    { id: 'naulac', item_name: 'Nâu (lắc)', price: 20000, short_name: 'Nâu lắc' },
    { id: 'denlac', item_name: 'Đen (lắc)', price: 20000, short_name: 'Đen lắc' },
    { id: 'bacxiu', item_name: 'Bạc xỉu', price: 25000, short_name: 'Bạc xỉu' },
    { id: 'bailey', item_name: `Bailey's`, price: 30000, short_name: 'Bailey' },
    { id: 'cafecacao', item_name: 'Cacao (coffee)', price: 30000, short_name: 'Cacao coffee' },
    { id: 'cafecotdua', item_name: 'Cafe cốt dừa', price: 25000, short_name: 'Cafe cốt dừa' },
    { id: 'st_chanhtuyet', item_name: 'Sinh tố chanh tuyết', price: 25000, short_name: 'ST Chanh tuyết' },
    { id: 'st_chanhleo', item_name: 'Sinh tố chanh leo', price: 35000, short_name: 'ST Chanh leo' },
    { id: 'st_xoai', item_name: 'Sinh tố xoài', price: 35000, short_name: 'ST xoài' },
    { id: 'st_xoaicam', item_name: 'Sinh tố xoài cam', price: 40000, short_name: 'ST xoài cam' },
    { id: 'st_bo', item_name: 'Sinh tố bơ', price: 40000, short_name: 'ST bơ' },
    { id: 'xoaiduadaxay', item_name: 'Xoài dừa đá xay', price: 35000, short_name: 'Xoài dừa đá xay' },
    { id: 'cacaocotdua', item_name: 'Cacao cốt dừa', price: 35000, short_name: 'Cacao cốt dừa' },
    { id: 'st_vietquat', item_name: 'Sinh tố việt quất', price: 35000, short_name: 'ST Việt quất' },
    { id: 'st_dau', item_name: 'Sinh tố dâu', price: 35000, short_name: 'ST Dâu' },
    { id: 'st_camnhadam', item_name: 'Sinh tố cam nha đam', price: 35000, short_name: 'ST cam nha đam' },
    { id: 'st_nhoden', item_name: 'Sinh tố nha đam', price: 35000, short_name: 'ST nha đam' },
    { id: 'st_duaxoai', item_name: 'Sinh tố dứa xoài', price: 35000, short_name: 'ST dứa xoài' },
    { id: 'tra_lipton', item_name: 'Trà lipton', price: 20000, short_name: 'Lipton' },
    { id: 'tra_bacha', item_name: 'Trà Bạc hà', price: 20000, short_name: 'Trà Bạc hà' },
    { id: 'tra_daocamxa', item_name: 'Trà Đào cam xả', price: 35000, short_name: 'Trà Đào cam xả' },
    { id: 'tra_dau', item_name: 'Trà dâu', price: 20000, short_name: 'Trà Dâu' },
    { id: 'tra_tao', item_name: 'Trà táo', price: 20000, short_name: 'Trà Táo' },
    { id: 'tra_dao', item_name: 'Trà đào', price: 25000, short_name: 'Trà Đào' },
    { id: 'tra_dausua', item_name: 'Trà dâu sữa', price: 25000, short_name: 'Trà Dâu sữa' },
    { id: 'tra_taobacha', item_name: 'Trà táo bạc hà', price: 30000, short_name: 'Trà Táo bạc hà' },
    { id: 'tra_daosua', item_name: 'Trà đào sữa', price: 30000, short_name: 'Trà Đào sữa' },
    { id: 'smt_nhoden', item_name: 'Smoothie Nho đen', price: 35000, short_name: 'Smoothie Nho đen' },
    { id: 'smt_xoai', item_name: 'Smoothie xoài', price: 35000, short_name: 'Smoothie xoài' },
    { id: 'smt_dau', item_name: 'Smoothie dâu', price: 35000, short_name: 'Smoothie dâu' },
    { id: 'smt_vietquat', item_name: 'Smoothie việt quất', price: 35000, short_name: 'Smoothie việt quất' },
    { id: 'smt_chanhleo', item_name: 'Smoothie chanh leo', price: 35000, short_name: 'Smoothie chanh leo' },
    { id: 'smt_duaxoai', item_name: 'Smoothie dứa xoài', price: 35000, short_name: 'Smoothie dứa xoài' },
    { id: 'smt_camnhadam', item_name: 'Smoothie cam nha đam', price: 35000, short_name: 'Smoothie cam nha đam' },
    { id: 'smt_dualuoi', item_name: 'Smoothie dưa lưới', price: 35000, short_name: 'Smoothie dưa lưới' },
    { id: 'scl_iceblend', item_name: 'Chocolate Ice Blend', price: 30000, short_name: 'Chocolate Ice Blend' },
    { id: 'scl_bacha', item_name: 'Chocolate Bạc Hà', price: 35000, short_name: 'Chocolate Bạc Hà' },
    { id: 'scl_cookies', item_name: 'Chocolate Cookies', price: 35000, short_name: 'Chocolate Cookies' },
    { id: 'mc_iceblend', item_name: 'Matcha Ice Blend', price: 25000, short_name: 'Matcha Ice Blend' },
    { id: 'mc_cookies', item_name: 'Matcha Cookies', price: 30000, short_name: 'Matcha Cookies' },
    { id: 'mc_bacha', item_name: 'Matcha Bạc Hà', price: 30000, short_name: 'Matcha Bạc Hà' },
    { id: 'mc_suachua', item_name: 'Matcha Sữa chua', price: 30000, short_name: 'Matcha Sữa chua' },
    { id: 'mjt_nhoden', item_name: 'Mojito Nho đen', price: 35000, short_name: 'Mojito Nho đen' },
    { id: 'mjt_taoxanh', item_name: 'Mojito Táo xanh', price: 35000, short_name: 'Mojito Táo xanh' },
    { id: 'mjt_dau', item_name: 'Mojito Dâu', price: 35000, short_name: 'Mojito Dâu' },
    { id: 'mjt_vietquat', item_name: 'Mojito Việt quất', price: 35000, short_name: 'Mojito Việt quất' },
    { id: 'mjt_bacha', item_name: 'Mojito Bạc hà', price: 35000, short_name: 'Mojito Bạc hà' },
    { id: 'mjt_luu', item_name: 'Mojito Lựu', price: 35000, short_name: 'Mojito Lựu' },
    { id: 'mjt_dao', item_name: 'Mojito Đào', price: 35000, short_name: 'Mojito Đào' },
    { id: 'mjt_oi', item_name: 'Mojito Ổi', price: 35000, short_name: 'Mojito Ổi' },
    { id: 'sd_passion', item_name: 'Mojito Passion', price: 40000, short_name: 'Mojito Passion' },
    { id: 'sd_nhoden', item_name: 'Soda Nho đen', price: 30000, short_name: 'Soda Nho đen' },
    { id: 'sd_taoxanh', item_name: 'Soda Táo xanh', price: 30000, short_name: 'Soda Táo xanh' },
    { id: 'sd_dau', item_name: 'Soda Dâu', price: 30000, short_name: 'Soda Dâu' },
    { id: 'sd_vietquat', item_name: 'Soda Việt quất', price: 30000, short_name: 'Soda Việt quất' },
    { id: 'sd_bacha', item_name: 'Soda Bạc hà', price: 30000, short_name: 'Soda Bạc hà' },
    { id: 'sd_luu', item_name: 'Soda Lựu', price: 30000, short_name: 'Soda Lựu' },
    { id: 'sd_dao', item_name: 'Soda Đào', price: 30000, short_name: 'Soda Đào' },
    { id: 'sd_oi', item_name: 'Soda Ổi', price: 30000, short_name: 'Soda Ổi' },
    { id: 'sc_lanep', item_name: 'Sữa chua lá nếp', price: 30000, short_name: 'Sữa chua lá nếp' },
    { id: 'sc_danhda', item_name: 'Sữa chua đánh đá', price: 25000, short_name: 'Sữa chua đánh đá' },
    { id: 'sc_coffee', item_name: 'Sữa chua coffee', price: 30000, short_name: 'Sữa chua coffee' },
    { id: 'sc_cacao', item_name: 'Sữa chua ca cao', price: 30000, short_name: 'Sữa chua ca cao' },
    { id: 'ne_cam', item_name: 'Nước ép cam', price: 35000, short_name: 'Nước ép cam' },
    { id: 'ne_chanhtuoi', item_name: 'Nước ép chanh tươi', price: 20000, short_name: 'Nước ép chanh tươi' },
    { id: 'ne_chanhleo', item_name: 'Nước ép chanh leo', price: 30000, short_name: 'Nước ép chanh leo' },
    { id: 'cafe', item_name: 'Cafe', price: 20000, short_name: 'Cafe' },
    { id: 'tradaokemphomai', item_name: 'Trà đào kem phô mai', price: 35000, short_name: 'Trà đào kem phô mai' },
    { id: 'tradaobacha', item_name: 'Trà đào bạc hà', price: 30000, short_name: 'Trà đào bạc hà' },
    { id: 'tradaomatong', item_name: 'Trà đào mật ong', price: 30000, short_name: 'Trà đào mật ong' },
    { id: 'cacao', item_name: 'Cacao', price: 25000, short_name: 'Cacao' },
]
class IposHelper extends Component {
    getMenu = () => new Promise((resolve, reject) => {
        firebase.database().ref("menu").once("value", snapshot => {
            let obj = snapshot.val()
            let arr = []
            for (let key in obj) {
                arr.push({
                    key,
                    ...obj[key]
                })
            }
            resolve(arr);
        });
    })
    updateMenu = () => {
        for (let i = 0; i < menu.length; i++) {
            firebase.database().ref("menu").child(menu[i].id).set(menu[i])
        }
    }
    getOrders_today = () => new Promise((resolve, reject) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}`).once("value", snapshot => {
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
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}`).limitToLast(1).on('value', data => {
            if (data.val() == null) return;
            let obj = data.val();
            let key = Object.keys(obj)[0];
            typeof callback === "function" && callback({
                key,
                ...obj[key]
            });
        })
    }
    getAnalytic = (callback) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        firebase.database().ref("analytic").child(`sales/y${year}/m${month}/d${date}`).on('value', data => {
            if (data.val() == null) return;
            let obj = data.val();
            typeof callback === "function" && callback(obj);
        })
    }
    changeStateToDone = (bill_id) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}/${bill_id}/state`).set('done')
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}/${bill_id}/check_out`).set(firebase.database.ServerValue.TIMESTAMP)
    }
    createOrder = (data) => new Promise((resolve, reject) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        let amount = 0
        for (let i = 0; i < data.length; i++) {
            amount += data[i].price * data[i].quantity
            // dem theo ma san pham
            // firebase.database().ref('analytic').child(`products/y${year}/m${month}/${data[i].id}`).transaction((view) => {
            //     return view + data[i].quantity;
            // });
        }
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}`).push({
            items: data,
            price: amount,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            state: 'doing',
            // ts_year: year,
            // ts_month: month,
            // ts_date: date,
        }, (err) => {
            if (!err) {
                resolve('success')
                // firebase.database().ref('analytic').child(`sales/y${year}/m${month}/d${date}/order_counter`).transaction((view) => {
                //     return view + 1;
                // });
                // firebase.database().ref('analytic').child(`sales/y${year}/m${month}/d${date}/money_counter`).transaction((view) => {
                //     return view + amount;
                // });
            } else {
                reject(err)
            }
        })
    })
    payOrder = (data) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        let products = data.items
        for (let i = 0; i < products.length; i++) {
            firebase.database().ref('analytic').child(`products/y${year}/m${month}/${products[i].id}`).transaction((view) => {
                return view + products[i].quantity;
            });
        }
        firebase.database().ref('analytic').child(`sales/y${year}/m${month}/d${date}/order_counter`).transaction((view) => {
            return view + 1;
        });
        firebase.database().ref('analytic').child(`sales/y${year}/m${month}/d${date}/money_counter`).transaction((view) => {
            return view + data.price;
        });
    }
    deleteOrder = (key) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}`).child(key).remove()
    }
    editOrder = (data, key) => new Promise((resolve, reject) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        let amount = 0
        for (let i = 0; i < data.length; i++) {
            amount += data[i].price * data[i].quantity
        }
        firebase.database().ref("orders").child(`y${year}/m${month}/d${date}`).child(key).set({
            items: data,
            price: amount,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            state: 'doing',
        }, (err) => {
            if (!err) {
                resolve('success')
            } else {
                reject(err)
            }
        })
    })
    getKhoanChi = (callback) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        firebase.database().ref("pays").child(`y${year}/m${month}`).limitToLast(1).on('value', data => {
            if (data.val() == null) return;
            let obj = data.val();
            let key = Object.keys(obj)[0];
            typeof callback === "function" && callback({
                key,
                ...obj[key]
            });
        })
    }

    createKhoanChi = (data) => new Promise((resolve, reject) => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let date = new Date().getDate()
        let amount = data.amount
        firebase.database().ref("pays").child(`y${year}/m${month}`).push({
            content: data.content,
            price: amount,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            who_pay: data.payer,
            ts_date: date
            // ts_year: year,
            // ts_month: month,
            // ts_date: date,
        }, (err) => {
            if (!err) {
                resolve('success')
                firebase.database().ref('analytic').child(`pays/y${year}/m${month}/pay_counter`).transaction((view) => {
                    return view + amount;
                });
                firebase.database().ref('analytic').child(`sales/y${year}/m${month}/d${date}/pay_counter`).transaction((view) => {
                    return view + amount;
                });
            } else {
                reject(err)
            }
        })
    })

    getAnalytic_month = (select_month,callback) => {
        let year = new Date().getFullYear()
        let month = select_month || new Date().getMonth() + 1
        let date = new Date().getDate()
        firebase.database().ref("analytic").child(`sales/y${year}/m${month}`).on('value', data => {
            let obj = data.val();
            typeof callback === "function" && callback(obj);
        })
    }
}
//      firebaseApp.database().ref('countUserOnSpin').transaction(function (view) {
//          return view + 1;
//      });
export default new IposHelper();