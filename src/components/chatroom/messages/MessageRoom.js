import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    Button
  } from "react-native";
import SendBird from 'sendbird'
import Config from '../../../config'

var sb = new SendBird({appId: Config.appId });
var ChannelHandler = new sb.ChannelHandler()

export default class MessageRoom extends Component {
    render() {
        ChannelHandler.onMessageReceived = function(channel, message) {
            console.log(channel, message)
        }
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}
