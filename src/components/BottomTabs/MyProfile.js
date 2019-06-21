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
    this.state = {
      user: {},

      first_name: "",
      phone_num: "",

      photo: "https://i.kym-cdn.com/photos/images/newsfeed/001/460/439/32f.jpg"
    };
  }

  componentDidMount() {
    const user_id = this.props.navigation.state.params.id;
    this.getUser(user_id);
    console.log("hi");
  }

  static navigationOptions = {
    title: "Edit Profile",
    headerTransparent: true
  };

  handleNameChange = value => {
    console.log("value change:", this.state);

    this.setState({
      first_name: value
    });
  };

  handleNumChange = value => {
    console.log("value change:", this.state);

    this.setState({
      phone_num: value
    });
  };
  CheckBox = () => {
    this.setState({
      user: {
        anonymous: !this.state.user.anonymous
      }
    });
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

  updateUser = updatedUser => {
    const user_id = this.props.navigation.state.params.id;

    axios
      .put(`${URL}/api/users/${user_id}`, updatedUser)
      .then(res => {
        if (res.status === 200) {
          alert("Update Successful");
        }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUpdate = e => {
    e.preventDefault();
    const updatedUser = {
      first_name: this.first_name(),
      last_name: this.state.user.last_name,
      email: this.state.user.email,
      phone_num: this.phone_num(),
      anonymous: this.state.user.anonymous,
      user_type: this.state.user.user_type
    };
    this.updateUser(updatedUser);
  };

  getUser = () => {
    console.log("getUser");
    const user_id = this.props.navigation.state.params.id;
    axios
      .get(`${URL}/api/users/${user_id}`)
      .then(res => {
        this.setState({
          user: res.data[0]
        });
        console.log(this.state.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  first_name = () => {
    if (this.state.first_name.length === 0) {
      return this.state.user.first_name;
    } else return this.state.first_name;
  };
  phone_num = () => {
    if (this.state.phone_num.length === 0) {
      return this.state.user.phone_num;
    } else return this.state.phone_num;
  };

  render() {
    console.log(this.state.first_name);
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
              //'https://i.kym-cdn.com/photos/images/newsfeed/001/460/439/32f.jpg'
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
              onChangeText={this.handleNameChange}
              name="first_name"
            />
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="phone-pad"
              name="phone_num"
              onChangeText={this.handleNumChange}
            />
            <Text style={styles.text}>Anonymous</Text>
            <CheckBox
              value={this.state.user.anonymous}
              onChange={() => this.CheckBox()}
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
