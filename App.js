
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Sendbird from 'sendbird'
import Config from './src/config'
import LocalChat from './src/components/index';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      pageRefreshCounter: 0
    }
  
    // Initialize sendbird using our app id
    var sb = new Sendbird({ appId: Config.appId })
  }

  updateJoinChats = () => {
    this.setState({
      pageRefreshCounter: this.state.pageRefreshCounter + 1
    })
  }

  setUser = (user) => {
    this.setState({user}, () => AsyncStorage.setItem('userData', JSON.stringify(user)))
  }

  clearUser = ({navigation}) => {
    this.setState({user: {}}, () => navigation.navigate('Login'))
  }
  
  render() {
    console.log('prf', this.state.pageRefreshCounter)
    return (
        <LocalChat screenProps={{setUser: this.setUser, clearUser: this.clearUser, user: this.state.user, updateJoinChats: this.updateJoinChats, pageRefreshCounter: this.state.pageRefreshCounter}}/>
    );
  }
}
