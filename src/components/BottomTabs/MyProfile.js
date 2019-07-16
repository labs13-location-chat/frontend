import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { MyContext } from "../Provider";

class MyProfile extends Component {
  render() {
    return (
      <View>
        <MyContext.Consumer>
          {context => (
            <View style={styles.container}>
              <Text>Profile</Text>

              <Button title="logOut" onPress={context.signOut}>
                Log Out
              </Button>
            </View>
          )}
        </MyContext.Consumer>
      </View>
    );
  }
}
export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  }
});
