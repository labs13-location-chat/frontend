import React from "react";
import axios from 'axios';
import { View, Button, TouchableOpacity, Text, TextInput, StyleSheet, } from "react-native";

const URL = "https://labs13-localchat.herokuapp.com";

export default class Register extends React.Component {
  state = {
    register: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      anonymous: true,
      latitude: 37.09024,
      longitude: -95.712891,
      user_type: 'user',
      phone_num: null,
    }
  }
  handleRegister = () => {
    axios
    .post(`${URL}/api/register`, {

      email: this.state.register.email,
      password: this.state.register.password,
      first_name: this.state.register.first_name,
      last_name: this.state.register.last_name,
      anonymous: this.state.register.anonymous,
      latitude: this.state.register.latitude,
      longitude: this.state.register.longitude,
      user_type: this.state.register.user_type,
      phone_num: this.state.register.phone_num,
    })
    .then(res => {
      console.log("it worked!", res)
    })
    .catch(err => console.log(err))
    this.setState({
        register: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            anonymous: true,
            latitude: 37.09024,
            longitude: -95.712891,
            user_type: 'user',
            phone_num: null
        } 
    })
  }

  static navigationOptions = {
    headerLayoutPreset: 'center',
    title: 'Sign Up',
    headerTitleStyle: {
      color: 'black',
      fontSize: 20,
      fontWeight: '400',
    },
    headerStyle: {
        backgroundColor: 'white',
    },
    // headerLeft: <View></View>
  }

  handleChange = (key, value) => {
    this.setState({
      register: {
        ...this.state.register,
        [key]: value
      }
    })
  }

  viewLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.registerContainer}>
        <View>
          <TextInput 
           onChangeText={val => this.handleChange('email', val)}
           placeholder="Your email"
           value={this.state.register.email}
           name="email"
           />
          <TextInput 
          onChangeText={val => this.handleChange('password', val)}
          placeholder="Your password"
          value={this.state.register.password}
          name="password"
          secureTextEntry={true}
          />
          <TextInput 
           onChangeText={val => this.handleChange('first_name', val)}
           placeholder="First name"
           value={this.state.register.first_name}
           name="first_name"
           />
           <TextInput 
           onChangeText={val => this.handleChange('last_name', val)}
           placeholder="Last name"
           value={this.state.register.last_name}
           name="last_name"
           />
           <TextInput 
           onChangeText={val => this.handleChange('phone_num', val)}
           placeholder="Phone numer"
           value={this.state.register.phone_num}
           name="phone_num"
           keyboardType={'numeric'}
           />
          <Button 
          title="Sign up"
          onPress={this.handleRegister}
          />
        </View>

         <TouchableOpacity>
          <View style={styles.google}>
            <Text style={styles.buttonText}>Sign up with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.facebook}>
            <Text style={styles.buttonText}>Sign up with Facebook</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.notRegistered}>
            <Text>Already registered?</Text>
            <TouchableOpacity onPress={() => this.viewLogin()}>
            <View>
                <Text>Log in</Text>
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
