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
  constructor() {
    super();
    this.state = {
      chatroom: []
    };
  }

  componentDidMount() {
    axios
      .get("https://labs13-localchat.herokuapp.com/api/chatrooms")
      .then(res => {
        this.setState({
          chatroom: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      // <ScrollView>
      //     {chatrooms.map((chat, index) => {
      //         return (
      //             <ChatroomItem
      //                 key={index}
      //                 chatName={chat}

      //             />
      //         )
      //     })}
      // </ScrollView>

      <FlatList
        data={chatroom}
        renderItem={info => (
          <ChatroomItem key={info.index} chatName={info.item} />
        )}
      />
    );
  }
}
