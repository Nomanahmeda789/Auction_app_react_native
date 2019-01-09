import React, { Component } from 'react';
import { RootComponent } from './src/index'
import * as firebase from "firebase";
import { Provider } from 'react-redux'
import store from './src/store/index'

var config = {
  apiKey: "AIzaSyAemDladK892hc1tapC_1xh1ygBMYv5dkI",
  authDomain: "auctionapp789.firebaseapp.com",
  databaseURL: "https://auctionapp789.firebaseio.com",
  projectId: "auctionapp789",
  storageBucket: "auctionapp789.appspot.com",
  messagingSenderId: "11339681478"
};
firebase.initializeApp(config);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    );
  }
}