
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Linking, } from 'react-native';
import Sendbird from 'sendbird'
import Config from './src/config'
import LocalChat from './src/components/index';

import AsyncStorage from '@react-native-community/async-storage';

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

	openURL = url => {
			Linking.openURL(url);
		}
loginWithGoogle = () => {
    this.openURL('https://labs13-localchat.herokuapp.com/auth/google');
    console.log("Login Google Link")
    this.setState({
      pageRefreshCounter: this.state.pageRefreshCounter + 1
    })
}

loginWithFacebook = () =>{
    this.openURL('https://labs13-localchat.herokuapp.com/auth/facebook');
    this.setState({
      pageRefreshCounter: this.state.pageRefreshCounter + 1
    })
  }
    handleOpenURL = ({ url }) => {
        // Extract stringified user string out of the URL
        const [ , user_string ] = url.match(/user=([^#]+)/);
        // this.setState({
        // 	// Decode the user string and parse it into JSON
        // 	user: JSON.parse(decodeURI(user_string))
        // });
        this.setUser(JSON.parse(decodeURI(user_string)))
        console.log(JSON.parse(decodeURI(user_string)))
        if (Platform.OS === 'ios') {
            SafariView.dismiss();
        }
    };

storeUser = async () => {
try {
   await AsyncStorage.setItem("userData", JSON.stringify(this.props.screenProps.user));
   console.log("SORING USER")
} catch (error) {
  console.log("error storing", error);
}
}

getStoredUser = async () => {
  try {
    let user = AsyncStorage.getItem('userData').then(user => user)
    if (user) {
        this.setState({
            user: user
    })
  }} catch(e){

  }
}
 
  updateJoinChats = () => {
    this.setState({
      pageRefreshCounter: this.state.pageRefreshCounter + 1
    })
  }

  setUser = (user) => {
    this.setState({user}, () => AsyncStorage.setItem('userData', JSON.stringify(user)))
    console.log("User in set user", user)
  }

  clearUser = ({navigation}) => {
    this.setState({user: {}}, () => navigation.navigate('Login'))
  }
  
  render() {
    console.log(this.state.user)
    return (
        <LocalChat screenProps={{setUser: this.setUser, clearUser: this.clearUser, user: this.state.user, updateJoinChats: this.updateJoinChats, pageRefreshCounter: this.state.pageRefreshCounter, getStoredUser: this.getStoredUser, storeUser: this.storeUser,  handleOpenURL: this.handleOpenURL, loginWithFacebook: this.loginWithFacebook, loginWithGoogle: this.loginWithGoogle}}/>
    );
  }
}
