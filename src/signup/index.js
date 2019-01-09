import React, { Component } from 'react'
import {
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity
    , StyleSheet,
} from 'react-native'
import * as firebase from "firebase";
import { signupAction } from '../actions/index'
import { connect } from 'react-redux'


class Signup extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super()
        this.signup = this.signup.bind(this)
        this.state = {
            name: '',
            contact: '',
            email: '',
            pass: ''
        }

    }
    signup() {
        //     if (this.state.name != '' && this.state.name.length > 3 && this.state.contact != '' && this.state.contact.length > 3) {
        //         firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
        //             .then(() => {
        //                 var ref = firebase.database().ref("signup")
        //                 ref.push({
        //                     name: this.state.name,
        //                     contact: this.state.contact,
        //                     email: this.state.email,
        //                 })
        //                 this.props.navigation.navigate('signin')

        //             })
        //             .catch((e) => {
        //                 alert(e.message)
        //             })
        //     }
        //     else {
        //         alert("Please fill the form correctly")
        //     }
        let user = {
            name: this.state.name,
            contact: this.state.contact,
            email: this.state.email,
            pass: this.state.pass,
        }
        this.setState({
            name: '',
            contact: '',
            email: '',
            pass: ''
        })


        if (user.name != '' && user.name.length > 3 && user.contact != '' && user.contact.length > 3) {
            this.props.navigation.navigate('signin')
            this.props.signupwithEmailPassword(user);

        }
        else {
            alert("Please fill the form correctly")
        }


    }


    render() {
        return (
            <ImageBackground source={require('../img/6.jpg')} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logoImage}
                        source={require('../img/99.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.logoText}>Sign Up</Text>
                </View>
                <View style={styles.container1}>
                    <TextInput
                        placeholder="Enter Your Full Name"
                        underlineColorAndroid='transparent'
                        style={[styles.input1, { marginBottom: 10 }]}
                        placeholderTextColor="lightgray"
                        onChangeText={(text) => {
                            this.setState({
                                name: text
                            })
                        }}
                    ></TextInput>
                    <TextInput
                        placeholder="Enter Your Contact"
                        underlineColorAndroid='transparent'
                        style={[styles.input1, { marginBottom: 10 }]}
                        placeholderTextColor="lightgray"
                        onChangeText={(text) => {
                            this.setState({
                                contact: text
                            })
                        }}
                    ></TextInput>
                    <TextInput
                        placeholder="Enter Your Email"
                        underlineColorAndroid='transparent'
                        style={[styles.input1, { marginBottom: 10 }]}
                        placeholderTextColor="lightgray"
                        onChangeText={(text) => {
                            this.setState({
                                email: text
                            })
                        }}
                    ></TextInput>
                    <TextInput
                        placeholder="Enter Your Password"
                        underlineColorAndroid='transparent'
                        style={styles.input1}
                        placeholderTextColor="lightgray"
                        onChangeText={(text) => {
                            this.setState({
                                pass: text
                            })
                        }}
                    ></TextInput>
                </View>
                <View style={styles.container2}>
                    <View style={[styles.container2, { flex: 3 }]}>
                        <TouchableOpacity
                            onPress={this.signup}

                            style={styles.touch1}><Text style={styles.touchText}>Sign In</Text></TouchableOpacity>
                    </View>
                    {/* <View style={{flex:3,backgroundColor:"pink"}}>
                        <Text></Text>
                    </View>         */}
                    <View style={{ flex: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "lightgray" }}>Already have account ?  </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('signin')

                            }}
                        ><Text style={{ color: "lightgray", fontWeight: "bold", textDecorationLine: "underline" }}>Sign in</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signupwithEmailPassword: (userDetails) => {
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //   opacity:0.9,
    },
    logoContainer: {
        flex: 4.3,
        // backgroundColor:"brown",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        flex: 1,
        color: 'white',
        fontSize: 30,
        fontFamily: 'fantasy',
        fontWeight: "bold",
        // backgroundColor:"pink",

    },
    logoImage: {
        flex: 3,
        width: 130,
        height: 130,
        // backgroundColor:"red",
        // marginTop:30
    },
    //containter 2
    container1: {
        flex: 6,
        // backgroundColor:"red",
        width: 300,
        // justifyCsontent: 'center',
        alignItems: 'center',
    },
    input1: {
        width: 280,
        // backgroundColor:"pink",
        borderBottomWidth: 2,
        paddingLeft: 20,
        borderBottomColor: "lightgray",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        color: "lightgray"


    },
    //container 3
    container2: {
        flex: 3,
        width: 250,
        // backgroundColor:"orange",
        justifyContent: 'center',
        alignItems: 'center',
    },
    touch1: {

        backgroundColor: "white",
        width: 220,
        height: 65,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },
    touchText: {
        color: "black",
        fontSize: 25,
        fontFamily: "fantasy",
        fontWeight: "bold"
    }

});
