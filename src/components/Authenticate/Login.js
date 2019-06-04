import React from "react";
import axios from 'axios';
import { View, Button, TouchableOpacity, Text, TextInput, StyleSheet, AsyncStorage, } from "react-native";

const URL = "https://labs13-localchat.herokuapp.com";

export default class Login extends React.Component {
  state = {
    login: {
      email: '',
      password: '',
    }
  }
  handleLogin = () => {
    axios
    .post(`${URL}/api/login`, {
      email: this.state.login.email,
      password: this.state.login.password
    })
    .then(res => {
      console.log(res)
      AsyncStorage.setItem("token", res.data.token);
      this.props.navigation.navigate('Landing')
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  static navigationOptions = {
    title: 'Log in',
    headerTitleStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        alignItems: 'center',
    },
    headerStyle: {
        backgroundColor: 'white',
    },
  }

  handleChange = (key, value) => {
    this.setState({
      login: {
        ...this.state.login,
        [key]: value
      }
    })
  }

  viewRegister = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    console.log("LOGIN")
    return (
      <View style={styles.loginContainer}>
        <View>
          <TextInput 
           onChangeText={val => this.handleChange('email', val)}
           placeholder="Your email"
           value={this.state.login.email}
           name="email"
           />
          <TextInput 
          onChangeText={val => this.handleChange('password', val)}
          placeholder="Your password"
          value={this.state.login.password}
          name="password"
          type="password"
          secureTextEntry={true}
          />
          <Button 
          title="Log in"
          onPress={this.handleLogin}
          />
        </View>

         <TouchableOpacity>
          <View style={styles.google}>
            <Text style={styles.buttonText}>Log in with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.facebook}>
            <Text style={styles.buttonText}>Log in with Facebook</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.notRegistered}>
            <Text>Not registered?</Text>
            <TouchableOpacity onPress={() => this.viewRegister()}>
            <View>
                <Text>Sign up</Text>
            </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  google: {
    height: 50,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
  },
  facebook: {
    height: 50,
    backgroundColor: '#3B5998',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300',
  },
  notRegistered: {
      margin: 10,
      alignItems: 'center',
  }
});
