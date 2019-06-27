import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Button,
  AppRegistry,
  LayoutAnimation,
  UIManager,
  Platform
} from "react-native";
import ChatroomItemMap from "./ChatroomItemMap";
import ChatroomItemSelected from "./ChatroomItemSelected";
import Icon from 'react-native-vector-icons/Ionicons';

const pic = {
  uri:
    "https://static.highsnobiety.com/thumbor/CDTF4ezi0dHntnuJiNPxepGkMl0=/fit-in/480x320/smart/static.highsnobiety.com/wp-content/uploads/2015/02/saulgoodman01.jpg"
};

export default class ChatroomItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  selectionHandler = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      expanded: !this.state.expanded
    });
  };

  ifDistanceIsLoading = () => {
    if (this.props.chat.distance === undefined) {
      return "Loading..."
    } else {
      let distanceCalc = this.props.chat.distance / 1609.34
      return parseFloat(Math.round(distanceCalc * 100) /100).toFixed(2)
    }
  }

  render() {
    console.log("Chat", this.props.chat)
    let image = this.props.chat.img_url
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.chatRoom}
          onPress={() => this.selectionHandler()}
        >
          <View>
            <Image
              style={{ width: 35, height: 35, borderRadius: 35 }}
              source={{uri: image}}
            />
          </View>
          <View style={styles.nameAddress}>
            <Text style={styles.name}>{this.props.chat.name}</Text>
            <Text>{this.props.chat.description}</Text>
          </View>
          <View style={styles.distance}>
            <Text>{this.ifDistanceIsLoading()} mi</Text>
              {this.state.expanded ? <Icon name="md-arrow-dropup" size={30} /> : <Icon name="md-arrow-dropdown" size={30}/> }
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View>
            {/* <ChatroomItemMap style={styles.map} /> */}
            <ChatroomItemSelected 
              navigation={this.props.navigation} 
              chat={this.props.chat} 
              focusedLocation={this.props.focusedLocation}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 100
  },
  container: {
    borderColor: "gray",
    borderBottomWidth: 1
  },
  map: {
    height: 100
  },
  chatRoom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 70
  },
  nameAddress: {
    width: "70%"
  },
  name: {
    fontSize: 15,
    fontWeight: "bold"
  },
  // address: {
  //     fontSize: 12
  // }
  image: {
    width: 25,
    borderRadius: 5
  },
  distance: {
      alignItems: 'center'
  }
});

AppRegistry.registerComponent("ChatroomItem", () => ChatroomItem);
