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
    constructor(props) {
        super(props)
    
        this.state = {
             user: [],
             showChat: false
        }
    }

    componentDidMount() {
        let userInfo = this.props.navigation.getParam("user")
        this.setState({
            user: userInfo
        })
        
    }
    
    
    joinChannel = () => {
        sb.OpenChannel.getChannel(this.state.user.chatroom_url, function(channel, error) {
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
        this.setState({
            showChat: !this.state.showChat
        })
        
    }
    

    render() {
        console.log(this.state.user)
        ChannelHandler.onMessageReceived = function(channel, message) {
            console.log(channel, message)
        }
        return (
            <View>
                {this.state.showChat ? 
                    <View>
                        <Text>Hello</Text>
                    </View>
                    :
                    <View>
                        <Button 
                        title={`Join the ${this.state.user.name} Channel`}      onPress={this.joinChannel} />
                    </View>
                }
            </View>
        )
    }
}
