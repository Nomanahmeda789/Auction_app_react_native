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
import { connect } from 'react-redux';
import {details} from '../actions/index'
class Home extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor() {
        super()
        this.state = {
            email: '',
            contact: '',
            name: ''
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
                            email:arr[i][1].email,
                            name:arr[i][1].name,
                            contact:arr[i][1].contact
                        })
                    }
                }
            }
        })
        let user={
            name:this.state.name,
            email:this.state.email,
            contact:this.state.contact
        }
        this.props.details(user)

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
                <View style={styles.container12}>
                    <Text style={styles.text1}>Welcome to AuctionTime.com {this.state.name}</Text>
                    {/* <Text>Noman</Text> */}
                    <View style={[styles.auc1, { width: 122, height: 120 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                firebase.auth().signOut()
                                    .then(() => {
                                        this.props.navigation.navigate("signin")
                                    })
                            }}
                        >
                            {/* <Text style={styles.bid}>
                                Auctioneer 
                            </Text> */}
                            <Image
                                style={styles.pro}
                                source={require('../img/logout1.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => {
                            firebase.auth().signOut()
                            .then(()=>{
                                this.props.navigation.navigate("home")
                            })
                        }}
                        style={{ backgroundColor: "orange", width: "35%", height: 75, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>Logout</Text>
                    </TouchableOpacity> */}

                </View>
                <View style={styles.container2}>
                    <View style={styles.auc}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("auctioneer")
                                // alert("asd")
                            }}
                        >
                            {/* <Text style={styles.bid}>
                                Auctioneer 
                            </Text> */}
                            <Image
                                style={styles.pro}
                                source={require('../img/aucc.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.auc}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("bidder")
                                // alert("asd")
                                // alert(this.state.name)
                            }}
                        >
                            {/* <Text style={styles.bid}>
                                Bidder
                            </Text> */}
                            <Image
                                style={styles.pro}
                                source={require('../img/bid.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.auc}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("profile")

                            }}
                        >
                            {/* <Text style={styles.bid}>
                                Profile
                            </Text> */}
                            <Image
                                style={styles.pro}
                                source={require('../img/pro.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        )
    }
}
function mapStateToProp(state) {
    return ({
        name: state.root.name,
        email: state.root.email,
        contact: state.root.contact,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        details: (a) => {
            dispatch(details(a))
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,

        //   opacity:0.9,
    },
    container1: {
        // backgroundColor:"red",
        width: "100%",
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container12: {
        // backgroundColor:"pink",
        width: "100%",
        flex: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container2: {
        // backgroundColor: "brown",
        width: "100%",
        flex: 3,
        flexDirection: "row",

    },
    logoImage: {
        flex: 3,
        width: 250,
        height: 180,
        // backgroundColor:"red",
        // marginTop:30
    },
    text1: {
        fontSize: 38,
        color: "white",
        fontFamily: "verdana",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        fontWeight: "bold",
        textShadowRadius: 2,
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowColor: 'orange'
    },
    auc: {
        // backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: "white",
        borderLeftColor: "white",
        borderRightColor: "white",
        borderTopColor: "white",
    },
    auc1: {
        // backgroundColor: "white",

        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: "white",
        borderLeftColor: "white",
        borderRightColor: "white",
        borderTopColor: "white",
    },
    bid: {
        fontSize: 18,
        color: "white",
        fontFamily: "verdana",
        fontWeight: "bold",

    },
    pro: {
        width: 80,
        height: 80,
    }

})