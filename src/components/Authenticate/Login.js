import React from "react";
import axios from "axios";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Image,
  Linking,
  Platform
} from "react-native";
import { MyContext } from "../Provider";

const URL = "https://labs13-localchat.herokuapp.com";

// var sb = new SendBird({ appId: Config.appId });
export default class Login extends React.Component {
  render() {
    console.log("login", this.props.navigation);
    return (
      <View style={styles.container}>
        <MyContext.Consumer>
          {context => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  context.login(
                    this.props.navigation.navigate("JoinChat", {
                      user: context.user
                    })
                  );
                }}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <Image
                    source={require("./GLiteLogo.png")}
                    style={styles.btnIcon}
                  />
                  <Text style={styles.btnText}>Sign In with Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={context.signIn}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <Image
                    source={require("./FBLogo.png")}
                    style={styles.btnIcon}
                  />
                  <Text style={styles.btnText}>Sign In with Facebook</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </MyContext.Consumer>
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%"
  },
  header: {
    textAlign: "center",
    marginTop: "20%",
    marginBottom: "10%"
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A4A4A"
  },

  btnClickContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.75,
    borderRadius: 50,
    padding: 10,
    width: "75%",
    // marginTop: 20,
    marginBottom: 20
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnIcon: {
    height: 25,
    width: 25
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: "15%",
    color: "#4A4A4A"
  }
});
