import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoad extends React.Component {
  constructor() {
    super();
    this.checkingUser();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.screenProps.pageRefreshCounter !== prevProps.screenProps.pageRefreshCounter) {
      this.checkingUser()
    }
  }

  checkingUser = async () => {
    try {
      const existing = await AsyncStorage.getItem("userData");
      this.props.navigation.navigate(existing ? "App" : "AuthCheck")
    } catch (e) {}
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
