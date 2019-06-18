import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Button
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import React, { Component } from "react";
import axios from 'axios'
import SendBird from 'sendbird'
import Config from '../../config'

const URL = 'https://labs13-localchat.herokuapp.com';
var sb = new SendBird({appId: Config.appId });


export default class ChatroomItemSelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        longitude: 0,
        latitude: 0
      }
    }
  }

  componentDidMount() {
    axios.get(`${URL}/api/chatrooms/${this.props.chat.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          longitude: res.data.coordinate.longitude,
          latitude: res.data.coordinate.latitude
        })
      })
      .catch(err => console.log(err))
  }
  
  joinChannel = () => {
    sb.OpenChannel.getChannel(`sendbird_open_channel_52771_86e7888ea74da04c2c221353b90ac8923cb1f98b`, function(channel, error) {
      if (error) {
        return ("top", console.log(error))
      }
  
      channel.enter(function(response, error) {
        console.log("Welcome to the Channel")
          if (error) {
              return (console.log(error))
          }
      });
  });
  }


  render() {
    console.log(this.props.chat)
    return (
      <View>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
          /> 
          <Marker coordinate={this.state.location} />
            </View>
        <View>
          <Button onPress={this.joinChannel} title="Join Chat" />
        </View>
        <View>
          <Text>{this.props.chat.name}</Text>
          <Text>{this.props.chat.total_users} users in chat</Text>
        </View>
        <View>
          <Text>`Chatroom created @ ${this.props.chat.created_at}`</Text>
          <Text>{this.props.chat.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 30
  },
  map: {
    height: 200
}
});
