import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Text
  } from "react-native";

export default class HeaderBar extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.chatroomInfo.name}</Text>
            </View>
        )
    }
}
