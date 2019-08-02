
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Linking, AsyncStorage} from 'react-native';
import Sendbird from 'sendbird'
import Config from './src/config'
import LocalChat from './src/components/index';

// import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props)
    // Initialize sendbird using our app id
    var sb = new Sendbird({ appId: Config.appId })
  }
  
  render() {
    return (
        <LocalChat 
        />
    );
  }
}
