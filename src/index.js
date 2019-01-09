import React from 'react'
import {createStackNavigator} from 'react-navigation';
import Signin from './signin/index'
import Signup from './signup/index'
import Home from './auction/home'
import FirstPage from './auction/Firstpage'
import Profile from './auction/profile'
import Auctioneer from './auction/auctioneer'
import Bidder from './auction/bidder'

export const RootComponent=createStackNavigator({
    firstpage:{screen:FirstPage},
    bidder:{screen:Bidder},
    auctioneer:{screen:Auctioneer},
    signin:{screen:Signin},
    home:{screen:Home},
    profile:{screen:Profile},
    signup:{screen:Signup},
})
