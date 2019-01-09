import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import * as firebase from 'firebase'

export default class Profile extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            contact:"",
        }
    }

    componentDidMount() {
        var ref = firebase.database().ref("signup")
        ref.on('value', (data) => {
            if (data.val()) {
                var arr = Object.entries(data.val())
                for (var i = 0; i < arr.length; i++) {
                    // alert(arr[i][1].email)
                    if (firebase.auth().currentUser.uid === arr[i][0]) {
                        this.setState({
                            email: arr[i][1].email,
                            name: arr[i][1].name,
                            contact: arr[i][1].contact
                        })
                    }
                }
            }
        })
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
                <View style={styles.profile}>
                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "red" }}>

                    </View>
                    <View style={{ flex: 2, flexDirection: "row", backgroundColor: "yellow" }}>

                    </View>
                    <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                        <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>Name</Text>
                        </View>
                        <View style={{ flex: 2, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>{this.state.name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                        <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>Contact</Text>
                        </View>
                        <View style={{ flex: 2, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>{this.state.contact}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white" }}>
                        <View style={{ flex: 1, width: "40%", height: "100%", borderRightWidth: 2, borderRightColor: "white", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>Email</Text>
                        </View>
                        <View style={{ flex: 2, width: "40%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>{this.state.email}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", backgroundColor: "yellow" }}>

                    </View>
                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "red" }}>

                    </View>
                </View>
                <View style={styles.profile1}>
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
        // backgroundColor:"red",
        width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        flex: 2,
        width: 250,
        height: 180,
        // backgroundColor:"red",
        // marginTop:30
    },
    profile: {
        flex: 3,
        // backgroundColor: "pink",
        justifyContent: 'center',
        alignItems: 'center',
    },

    profile1: {
        flex: 1,
        // backgroundColor:"brown",
        justifyContent: 'center',
        alignItems: 'center',
    },
})