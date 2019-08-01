import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

export default class AuthLoad extends React.Component {
  constructor() {
    super();
    this.checkingUser();
  }
  
  checkingUser = async () => {
    const existing = await AsyncStorage.getItem("userData");
    this.props.navigation.navigate(existing ? "App" : "AuthCheck");
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
