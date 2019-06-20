import React, { Component } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import ChatroomItem from "./ChatroomItem";

// const chatrooms = [
//   "chat1",
//   "chat2",
//   "chat3",
//   "chat4",
//   "chat5",
//   "chat6",
//   "chat7",
//   "chat8",
//   "chat9",
//   "chat10",
//   "chat11",
//   "chat12",
//   "chat13",
//   "chat14",
//   "chat15",
//   "chat16",
//   "chat17",
//   "chat18",
//   "chat19"
// ];

export default class ChatSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <FlatList
          data={this.props.chatroomList}
          renderItem={info => 
            <ChatroomItem 
              navigation={this.props.navigation} 
              key={info.index} 
              chat={info.item}
            />}
        />
    );
  }
}
