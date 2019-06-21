import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Button,
  Modal,
  Dimensions,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import React, { Component } from "react";
import axios from 'axios'
import SendBird from 'sendbird'
import Config from '../../config'
import { getDistance } from "geolib";

var sb = new SendBird({appId: Config.appId });

const URL = 'https://labs13-localchat.herokuapp.com';


export default class ChatroomItemSelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        longitude: 0,
        latitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      chatroom: [],
      user: [],
      distance: 0
    }
  }

  componentDidMount() {
    axios.get(`${URL}/api/chatrooms/${this.props.chat.id}`)
      .then(res => {
        console.log('data',res.data)
        this.setState({
          location: {
            longitude: res.data.coordinate[0].longitude,
            latitude: res.data.coordinate[0].latitude,
            latitudeDelta: 0.0122,
            longitudeDelta:
              (Dimensions.get("window").width / Dimensions.get("window").height) *
              0.0122
          },
          chatroom: res.data
        })
        // console.log('location', this.state.location)
      })
      .catch(err => console.log(err))

      this.getDistanceFromChat()
    }
  
    getDistanceFromChat = () => {
      let distance = getDistance(
        { latitude: this.state.location.latitude, longitude: this.state.location.latitude },
        { latitude: this.props.focusedLocation.latitude, longitude: this.props.focusedLocation.longitude }
        )
      if (this.state.location.latitude === 0 ) {
        return setTimeout(() => {
          this.getDistanceFromChat()
        }, 1000)
      } else {
        this.setState({
          distance: distance
        })
          console.log("distance", distance)
        }
    }

  joinChannel = () => {
  this.props.navigation.navigate('Chatroom', {
    user: this.state.chatroom
  })
  }


  render() {
    console.log('props', this.props)
    console.log('focusedlocation', this.props.focusedLocation)
    console.log('location', this.state.location)
    console.log('chatroom', this.state.chatroom)
    return (
      <View>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={this.state.location}
            // annotations={markers}
          >
            <Marker
              coordinate={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
              }}
            />
          </MapView> 
          {/* <Marker coordinate={markers} /> */}
            </View>
        <View>
          <Button onPress={this.joinChannel} title="Join Chat" />
        </View>
        <View>
          <Text>{this.props.chat.name}</Text>
          <Text>{this.props.chat.total_users} users in chat</Text>
        </View>
        <View>
          <Text>Chatroom created {this.props.chat.created_at}</Text>
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
