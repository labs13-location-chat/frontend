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

export default class ChatroomItemSelected extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
          /> 
            </View>
        <View>
          <Button title="Join Chat" />
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
