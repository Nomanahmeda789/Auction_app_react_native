import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity, Picker, ScrollView, KeyboardAvoidingView
} from 'react-native'
import * as firebase from 'firebase'

export default class Bidder extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super();
        this.state = {
            pickerValue: '',
            updateBidd: '',
            arr: [],
            duparr: [],
        }
        this.update = this.update.bind(this)
        this.biddingtext = this.biddingtext.bind(this)
        this.categoryChange = this.categoryChange.bind(this)
    }
    componentDidMount() {
        var fire = firebase.database().ref('itemList')
        fire.on('value', (data) => {
            if (data.val()) {
                var a = Object.entries(data.val())

                this.setState({
                    arr: a,
                    duparr: a
                })
            }
        })

        if (this.state.duparr) {

            setInterval(() => {

                for (var i = 0; i < this.state.duparr.length; i++) {
                    var dm = this.state.duparr[i][1].date
                    var t = this.state.duparr[i][1].pickerValue
                    var str = dm.slice(4, )
                    var combine = str + " " + t+":00:00"
                    var date = new Date();
                    var checkDate = new Date(combine)
                    // alert(combine)
                    if(date.getTime()>checkDate.getTime()){
                        firebase.database().ref("itemList/"+this.state.duparr[i][0]).remove()
                    }


                }
            }, 60000)
        }


    }

    categoryChange() {
        // var a=this.state.duparr;
        // this.setState({
        //     arr:a
        // })
        var arr = [];
        var flag = false;
        for (var i = 0; i < this.state.duparr.length; i++) {
            if (this.state.pickerValue == this.state.duparr[i][1].category) {
                arr.push(this.state.duparr[i])
                flag = true;
            }
        }

        if (flag == false) {
            var a = this.state.duparr;
            alert("no item is available for this category")
            this.setState({
                arr: a
            })
        }
        else {

            this.setState({
                arr
            })
        }
    }


    update(index, changeValue) {
        var a = parseInt(this.state.updateBidd)
        var i = parseInt(changeValue)
        if (a) {

            if (!isNaN(a)) {
                if (a > i) {
                    firebase.database().ref("itemList/" + index).update({
                        BiddingAmount: a
                    })
                    this.setState({
                        updateBidd: ''
                    })
                    alert("Thanks for bidding ....")

                }
                else {
                    alert("the amount u are entering is less than the minimum bit you will have to enter greater amount to purchase this item")
                }
            }
            else {
                alert("please enter amount only")
            }
        }
        else {
            alert("please enter amount first")
        }
        //   var check;
        //         var ref=firebase.database.ref("itemList")
        //         ref.on('value',(data)=>{

        //         })

        //         if(){

        //             firebase.database.ref("itemList/"+"-LVNbSKjXu3wIAxbZegF")
        //         }

        // alert(index+"    "+changeValue)

    }
    biddingtext(v) {
        this.setState({
            updateBidd: v
        })
        // alert(this.state.updateBidd)
    }
    render() {
        return (

            <ImageBackground source={require('../img/6.jpg')} style={styles.container}>
                <View style={styles.container1}>
                    <Image
                        style={styles.logoImage}
                        source={require('../img/logo.png')}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.container2}>
                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                        {/* <TextInput
                            placeholder="Search here"
                            underlineColorAndroid='transparent'
                            style={{ borderWidth: 2, borderColor: "white",paddingLeft:10, flex: 10 }}
                            placeholderTextColor="white"
                        ></TextInput> */}

                        <View
                            //  style={[styles.input1, { height: 70,paddingLeft:10, justifyContent: "center" }]}
                            style={{ borderWidth: 2, borderColor: "white", paddingLeft: 10, flex: 10, height: 44, justifyContent: "center" }}

                        >

                            <Picker
                                style={{ color: "lightgray" }}

                                selectedValue={this.state.pickerValue}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        pickerValue: itemValue
                                    })

                                }}
                            >
                                <Picker.Item label="Select By Category" value="" />
                                <Picker.Item label="Mobiles" value="mobiles" />
                                <Picker.Item label="Clothing" value="clothing" />
                                <Picker.Item label="Electronics" value="electronics" />
                                <Picker.Item label="Furniture" value="furniture" />
                                <Picker.Item label="Others" value="others" />

                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={this.categoryChange}
                            style={{ borderWidth: 2, justifyContent: "center", alignItems: "center", textAlign: "center", borderColor: "white", backgroundColor: "white", flex: 2 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../img/q1.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10 }}>
                        {/* box 1 */}
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <ScrollView>
                                {/* all items */}
                                {
                                    this.state.arr ?
                                        this.state.arr.map((value, index) => {
                                            var m = value[1].date;
                                            var n = m.slice(4, )
                                            return (<View style={{ height: 300 }}>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                                                    <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>Item {index + 1}</Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                                                    <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 17, fontWeight: 'bold' }}>Category</Text>
                                                    </View>
                                                    <View style={{ flex: 1, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                        <Text style={{ color: "white", fontSize: 17 }}>{value[1].category}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                                                    <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 17, fontWeight: 'bold' }}>Product name</Text>
                                                    </View>
                                                    <View style={{ flex: 1, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                        <Text style={{ color: "white", fontSize: 17 }}>{value[1].productName}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                                                    <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 17, fontWeight: 'bold' }}>Minimum Bid</Text>
                                                    </View>
                                                    <View style={{ flex: 1, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                        <Text style={{ color: "white", fontSize: 17 }}>{value[1].BiddingAmount}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                                                    <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{ color: "white", fontSize: 17, fontWeight: 'bold' }}>Bid endTime</Text>
                                                    </View>
                                                    <View style={{ flex: 1, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                        <Text style={{ color: "white", fontSize: 17 }}>{n} at {value[1].pickerValue}:00</Text>
                                                    </View>
                                                </View>
                                                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: "orange", fontSize: 10, textAlign: 'center' }}>*Please note that your bidding amount will be updated in the chart if it will be greater than the amount in the Minimum Bin </Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                    <View style={[styles.input1, { marginLeft: 15, flex: 4, width: "40%", height: "100%", justifyContent: "center", alignItems: "center" }]}>
                                                        <TextInput
                                                            onChangeText={this.biddingtext}
                                                            placeholder="Enter Your Bidding amount"
                                                            underlineColorAndroid='transparent'
                                                            style={styles.input1}
                                                            defaultValue={this.state.updateBidd}
                                                            placeholderTextColor="lightgray"
                                                        >
                                                        </TextInput>
                                                    </View>
                                                    <View style={{ flex: 2, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.update(value[0], value[1].BiddingAmount)
                                                            }}
                                                            style={{ backgroundColor: "orange", width: "85%", height: 45, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white", borderRadius: 15 }}>
                                                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>Submit</Text>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>
                                                <View style={{ borderBottomColor: "orange", borderBottomWidth: 5, height: 20 }}>
                                                </View>
                                            </View>)
                                        })
                                        : 'aasdassas'
                                }
                            </ScrollView>
                        </KeyboardAvoidingView >
                    </View>
                </View>
                <View style={styles.container3}>
                    <Text style={{ color: "white" }}>© Copyright 2018. All Rights Reserved.</Text>
                </View>
            </ImageBackground>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        //   opacity:0.9,
    },
    container1: {
        // backgroundColor: "red",
        width: "100%",
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        flex: 3,
        width: 250,
        height: 180,
        // backgroundColor:"red",
        // marginTop:30
    },
    container2: {
        flex: 10,

        // backgroundColor: "brown",
    },
    container3: {
        flex: 1,
        // backgroundColor: "purple",
        justifyContent: 'center',
        alignItems: 'center',

    },
    input1: {
        width: 280,
        height: 60,
        // backgroundColor:"pink",
        borderWidth: 2,
        paddingLeft: 20,
        borderColor: "lightgray",
        borderRadius: 15,
        // borderRadius: 15,
        color: "lightgray"
    },
})