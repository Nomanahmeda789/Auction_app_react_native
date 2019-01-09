import React,{Component} from 'react'
import {StyleSheet,
        Text,
        View,
        ImageBackground,
        Image,
        TextInput,
        TouchableOpacity,KeyboardAvoidingView
} from 'react-native'
import * as firebase from "firebase";


export default class Signin extends Component{
    static navigationOptions={
        header:null,
    }
    constructor(){
        super();
        this.signin=this.signin.bind(this)
        this.state={
            email:'',
            pass:'',
        }
    }
    signin(){
        
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
        .then(()=>{
            this.props.navigation.navigate('home')

        })
        .catch((e)=>{
            alert(e.message)
        })
    }

    render(){
        return(
            
            <ImageBackground source={require('../img/6.jpg')} style={styles.container}>
            {/* <KeyboardAvoidingView behavior="padding" enabled> */}
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logoImage}
                    source={require('../img/11.png')}
                    resizeMode="contain"
                    />
                    <Text style={styles.logoText}>Welcome Back!</Text>
                </View>
                <View style={styles.container1}>
                    <TextInput 
                    placeholder="Enter Your Email"
                    underlineColorAndroid='transparent'
                    style={[styles.input1,{marginBottom:10}]}
                    placeholderTextColor="lightgray"
                    onChangeText={(text)=>{
                        this.setState({
                            email:text
                        })
                     }}
                    ></TextInput>
                  
                    <TextInput 
                    type="password"
                    placeholder="Enter Your Password"
                    underlineColorAndroid='transparent'
                    style={styles.input1}
                    placeholderTextColor="lightgray"
                    onChangeText={(text)=>{
                            this.setState({
                                pass:text
                            })
                    }}
                    ></TextInput>
                </View>
                <View style={styles.container2}>
                    <View style={[styles.container2,{flex:5}]}>
                        <TouchableOpacity
                        onPress={this.signin}
                        style={styles.touch1}><Text style={styles.touchText}>Sign In</Text></TouchableOpacity>
                        <View style={{flex:2,flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{color:"lightgray"}}>Don't have account ?  </Text>
                            <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('signup')
                                
                            }}
                            ><Text  style={{color:"lightgray",fontWeight:"bold",textDecorationLine:"underline"}}>Sign up</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:3,backgroundColor:"pink"}}>
                        {/* <Text></Text> */}
                    </View>        
                </View>        
                {/* </KeyboardAvoidingView> */}

            </ImageBackground>
    
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   opacity:0.9,
    },
    logoContainer:{
        flex:5,
        // backgroundColor:"brown",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText:{
        flex:1,
        color:'white',
        fontSize:30,
        fontFamily:'fantasy',
        fontWeight:"bold",
        // backgroundColor:"pink",
        
    },
    logoImage:{
        flex:3,
        width:130,
        height:130,
        // backgroundColor:"red",
        // marginTop:30
    },
    //containter 2
    container1:{
        flex:3,
        // backgroundColor:"red",
        width:300,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    input1:{
        width:280,
        // backgroundColor:"pink",
        borderBottomWidth:2,
        paddingLeft:20,
        borderBottomColor:"lightgray",
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,        
        color:"lightgray"

        
    },
    //container 3
    container2:{
        flex:4,
        width:250,
        // backgroundColor:"orange",
        justifyContent: 'center',
        alignItems: 'center',        
    },
    touch1:{
        flex:3,
        backgroundColor:"white",
        width:220,
        height:60,
        borderRadius:60,
        justifyContent: 'center',
        alignItems: 'center',        
        
    },
    touchText:{
        color:"black",
        fontSize:25,
        fontFamily:"fantasy",
        fontWeight:"bold"
    }
  
  });
  