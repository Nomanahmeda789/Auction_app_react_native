import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Picker
} from 'react-native'
import * as firebase from 'firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class Auctioneer extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super()
        this.productName = this.productName.bind(this)
        // this.productDescription = this.productDescription.bind(this)
        this.BiddingAmount = this.BiddingAmount.bind(this)
        this.submit = this.submit.bind(this)

        this.state = {
            isDateTimePickerVisible: false,
            date: '',
            productName: '',
            // productDescription: "",
            BiddingAmount: '',
            pickerValue: ''

        }
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        var a = date.toDateString()
        this.setState({
            date: a
        })
        this._hideDateTimePicker();
    };
    productName(v) {
        this.setState({
            productName: v
        })
        // alert(this.state.productName)
    }

    // productDescription(v) {
    //     this.setState({
    //         productDescription: v
    //     })
    // }

    BiddingAmount(v) {
        this.setState({
            BiddingAmount: v
        })
    }

    submit() {
        // alert(this.state.date)
        // var m = this.state.date.getMonth();
        // alert(m)
        if (this.state.productName != '' && this.state.productName.length > 3 && this.state.BiddingAmount != '' && this.state.pickerValue != '' && this.state.date != null && this.state.date != '') {
            var dm = this.state.date
            var t = this.state.pickerValue
            var str = dm.slice(4, )
            var combine = str + " " + t+":00:00"
            var date = new Date();
            var checkDate = new Date(combine)
            if (checkDate.getTime()<date.getTime()) {
                alert("please enter future date")

            }
            else{
                
                firebase.database().ref("itemList").push({
                    email: firebase.auth().currentUser.email,
                    productName: this.state.productName,
                    category: this.state.category,
                    date: this.state.date,
                    BiddingAmount: this.state.BiddingAmount,
                    pickerValue: this.state.pickerValue
                })
                this.props.navigation.navigate("home")
                this.setState({
                    date: '',
                    productName: '',
                    productDescription: "",
                    BiddingAmount: '',
                    pickerValue: '',
                    category: ''
                })
            }
        }
        else {
            alert("Please fill the form correctly");
        }
        // alert(this.state.date)
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
                    <TextInput
                        placeholder="Enter Name of a product"
                        underlineColorAndroid='transparent'

                        defaultValue={this.state.productName}
                        style={[styles.input1, { marginBottom: 10 }]}
                        placeholderTextColor="lightgray"
                        onChangeText={this.productName}
                    ></TextInput>
                    {/* <TextInput
                        placeholder="Enter product description (Only one line)"
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.productDescription}
                        style={[styles.input1, { marginBottom: 10 }]}
                        placeholderTextColor="lightgray"
                        onChangeText={this.productDescription}
                    ></TextInput> */}
                    <TextInput
                        placeholder="First Bidding Amount"
                        underlineColorAndroid='transparent'
                        style={styles.input1}
                        defaultValue={this.state.BiddingAmount}
                        placeholderTextColor="lightgray"
                        onChangeText={this.BiddingAmount}
                    ></TextInput>

                    <View style={[styles.input1, { height: 70, paddingLeft: 10, justifyContent: "center" }]}>
                        <Picker
                            style={{ color: "lightgray" }}

                            selectedValue={this.state.category}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    category: itemValue
                                })
                            }}
                        >
                            <Picker.Item label="Show category" value="" />
                            <Picker.Item label="Mobiles" value="mobiles" />
                            <Picker.Item label="Clothing" value="clothing" />
                            <Picker.Item label="Electronics" value="electronics" />
                            <Picker.Item label="Furniture" value="furniture" />
                            <Picker.Item label="Others" value="others" />

                        </Picker>
                    </View>
                    <TouchableOpacity style={[styles.input1, { height: 70, justifyContent: "center" }]}
                        placeholderTextColor="lightgray"
                        onPress={this._showDateTimePicker}>
                        <Text style={{ color: "lightgray" }}>Show DatePicker</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                    <View style={[styles.input1, { height: 70, paddingLeft: 10, justifyContent: "center" }]}>
                        <Picker
                            style={{ color: "lightgray" }}

                            selectedValue={this.state.pickerValue}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    pickerValue: itemValue
                                })
                            }}
                        >
                            <Picker.Item label="Show Timepicker" value="" />
                            <Picker.Item label="09:00" value="9" />
                            <Picker.Item label="10:00" value="10" />
                            <Picker.Item label="11:00" value="11" />
                            <Picker.Item label="12:00" value="12" />
                            <Picker.Item label="13:00" value="13" />
                            <Picker.Item label="14:00" value="14" />
                            <Picker.Item label="15:00" value="15" />
                            <Picker.Item label="16:00" value="16" />
                            <Picker.Item label="17:00" value="17" />
                            <Picker.Item label="18:00" value="18" />

                        </Picker>
                    </View>
                </View>
                <View style={styles.container3}>
                    <TouchableOpacity
                        onPress={this.submit}
                        style={{ backgroundColor: "orange", width: "35%", height: 75, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>Submit</Text>
                    </TouchableOpacity>
                    <View style={{ width: 5 }}></View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("home")
                        }}
                        style={{ backgroundColor: "orange", width: "35%", height: 75, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>Cancel</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.container4}>
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
        // backgroundColor: "brown",
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
        flex: 7,
        // backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    input1: {
        width: 280,
        height: 60,
        // backgroundColor:"pink",
        borderBottomWidth: 2,
        paddingLeft: 20,
        borderBottomColor: "lightgray",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        color: "lightgray"
    },
    container3: {
        flex: 2,
        flexDirection: "row",
        // backgroundColor: "pink",
        justifyContent: 'center',
        // alignItems: 'center',

    },
    container4: {
        flex: 1,
        // backgroundColor: "orange",
        justifyContent: 'center',
        alignItems: 'center',

    },


})