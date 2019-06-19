import React from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  CheckBox,
  Image,
  TouchableWithoutFeedback,
  AsyncStorage,
  Button
} from "react-native";
import axios from "axios";
import ImagePicker from "react-native-image-picker";
import DismissKeyboard from "dismissKeyboard";
import KeyboardSpacer from "react-native-keyboard-spacer";

const URL = "https://labs13-localchat.herokuapp.com";

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUser();
    this.state = {
      updateUser: false,
      first_name: "",
      last_name: "",
      email: "",
      phone_num: "",
      anonymous: true,
      user_type: "user",
      id: null,
      photo: "https://i.kym-cdn.com/photos/images/newsfeed/001/460/439/32f.jpg"
    };
  }

  static navigationOptions = {
    title: "Edit Profile",
    headerTransparent: true
  };

  fetchUser = async () => {
    const id = this.props.navigation.state.params.id;
    const first = await AsyncStorage.getItem("firstname");
    const last = await AsyncStorage.getItem("lastname");
    const useremail = await AsyncStorage.getItem("email");
    const phone_num = await AsyncStorage.getItem("phone_num");
    console.log("users from state:", first, last, useremail, phone_num, id);
    this.setState({
      first_name: first,
      last_name: last,
      email: useremail,
      phone_num: phone_num,
      id: id,
      anonymous: true,
      user_type: "user"
    });
  };

  handleChange = (key, value) => {
    console.log("value change:", this.state);

    this.setState({
      ...this.state,
      [key]: value
    });
  };

  anonymousCheck = () => {
    console.log("anonymous:", this.state.anonymous);
    const val = !this.state.anonymous;
    this.setState({ anonymous: val });
  };

  chooseFile = () => {
    const options = {
      title: "Select Photo",
      // customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User canceled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          photo: source
        });
      }
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.updateUser !== prevState.updateUser) {
      return this.getUser();
    } else {
      return;
    }
  }

  updateUser = updateUser => {
    console.log(updateUser);
    axios
      .put(`${URL}/api/users/${updateUser.id}`, updateUser)
      .then(res => {
        this.setState({
          updateUser: !this.state.updateUser
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUpdate = e => {
    e.preventDefault();
    const updatedUser = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_num: this.state.phone_num,
      anonymous: this.state.anonymous,
      user_type: this.state.user_type
    };
    this.updateUser(updatedUser);
  };

  getUser = () => {
    axios
      .get(`${URL}/api/users/${this.state.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  submit = () => {};

  render() {
    const { photo } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          DismissKeyboard();
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: photo.uri
              // 'https://i.kym-cdn.com/photos/images/newsfeed/001/460/439/32f.jpg'
            }}
          />
          <Text
            onPress={this.chooseFile.bind(this)}
            style={{
              position: "absolute",
              fontSize: 20,
              marginTop: 95,
              backgroundColor: "rgba(244, 244, 244, 0.5)",
              // backgroundColor: 'red',
              width: 140,
              height: 50,
              // paddingHorizontal: 25,
              // paddingVertical: 10,
              textAlign: "center",
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100
            }}
          >
            Update
          </Text>
          <View style={styles.display}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={val => this.handleChange("first_name", val)}
              value={this.state.first_name}
              name="first_name"
            />
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="phone-pad"
              name="phone_num"
              onChangeText={val => this.handleChange("phone_num", val)}
              value={this.state.phone_num}
            />
            <Text style={styles.text}>Anonymous</Text>
            <CheckBox
              value={this.state.anonymous}
              onValueChange={this.anonymousCheck}
            />
          </View>
          {/* <KeyboardSpacer /> */}
          <Button
            style={{ backgroundColor: "#3EB1D6" }}
            title="Save"
            onPress={this.handleUpdate}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    top: 75,
    flex: 1,
    // flexDirection: 'row',
    alignItems: "center"
    // justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  display: {
    marginTop: 50,
    marginLeft: 0,
    alignItems: "flex-start"
  },
  text: {
    // marginTop: 10,
    width: 300,
    backgroundColor: "#f4f4f4",
    borderColor: "#f4f4f4",
    paddingHorizontal: 20,
    padding: 10
  },
  inputBox: {
    width: 300,
    borderBottomWidth: 1,
    fontSize: 16
  }
});
