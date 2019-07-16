import React, { Component } from "react";
import { AsyncStorage, Linking, Platform } from "react-native";
import SafariView from "react-native-safari-view";
import { withNavigation } from "react-navigation";
export const MyContext = React.createContext();

export class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener("url", this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then(url => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }

  handleOpenURL = ({ url }) => {
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === "ios") {
      SafariView.dismiss();
    }
  };
  // Handle Login with Google button tap
  loginWithGoogle = cb =>
    this.openURL("https://labs13-localchat.herokuapp.com/auth/google");

  // Handle Login with Facebook button tap
  loginWithFacebook = cb =>
    this.openURL("https://labs13-localchat.herokuapp.com/auth/facebook");

  openURL = url => {
    if (Platform.OS === "ios") {
      SafariView.show({
        url: url,
        fromBottom: true
      });
    } else {
      Linking.openURL(url);
    }
  };
  signOut = cb => {
    this.setState({
      user: undefined
    });
    alert("logged out");
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem("firstname", this.state.user.first_name);
      await AsyncStorage.setItem("lastname", this.state.user.last_name);
      await AsyncStorage.setItem("anonymous", this.state.user.anonymous);
      await AsyncStorage.setItem("email", this.state.user.email);
      await AsyncStorage.setItem("phonenumber", this.state.user.phone_num);
      await AsyncStorage.setItem("userID", this.state.user.id);
    } catch (error) {
      // Error saving data
    }
  };
  render() {
    if (this.state.user) {
      console.log("user", this.state.user);
    }
    console.log("provider", this.props.navigation);
    return (
      <MyContext.Provider
        value={{
          user: this.state.user,
          login: this.loginWithGoogle,
          signIn: this.loginWithFacebook,
          signOut: this.signOut
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
