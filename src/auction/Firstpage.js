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

export default class FirstPage extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(){
        super()
        this.myfunction=this.myfunction.bind(this)
    }
    myfunction(){
        setTimeout(()=>{
            this.props.navigation.navigate('signin')
        },3000)
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
                {
                    this.myfunction()
                }
            </ImageBackground>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        //   opacity:0.9,
    },
    container1:{
        // backgroundColor:"red",
        width:"100%",
        flex:1.5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    logoImage:{
        flex:3,
        width:300,
        height:250,
        // backgroundColor:"red",
        // marginTop:30
    },
})