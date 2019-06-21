import React, { Component } from "react";
import axios from "axios";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import ChatroomItem from "./ChatroomItem";

export default class ChatSearch extends Component {
  constructor(props) {
    super(props);
 
  }

  render() {
    return (
        <FlatList
          data={this.props.data}
          renderItem={info => 
            <ChatroomItem 
            navigation={this.props.navigation} 
            noData={this.props.noData}
              key={info.index} 
              chat={info.item}
              focusedLocation={this.props.focusedLocation}
            />}
        />
    );
  }
}
