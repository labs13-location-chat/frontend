import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { startSocketIO } from './services/socketIO';
// ...any other imports needed

export default class App extends React.Component {
  state= {
    isLoadingComplete:false,
  };



  render() {
      return(
        <Text>Hi</Text>
      )
  }
}