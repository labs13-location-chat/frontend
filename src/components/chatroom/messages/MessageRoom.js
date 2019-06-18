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
import MessageForm from './MessageForm'

var sb = new SendBird({appId: Config.appId });
var ChannelHandler = new sb.ChannelHandler()
const params = new sb.UserMessageParams();

// params.message = TEXT_MESSAGE;
// params.customType = CUSTOM_TYPE;
// params.data = DATA;
// params.mentionType = 'users';                       // Either 'users' or 'channel'
// params.mentionedUserIds = ['Jeff', 'Julia'];        // or mentionedUsers = Array<User>;    
// params.metaArrayKeys = ['key1', 'key2'];
// params.translationTargetLanguages = ['fe', 'de'];   // French and German
// params.pushNotificationDeliveryOption = 'default';  // Either 'default' or 'suppress'

export default class MessageRoom extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user: [],
             showChat: false,
             channelInfo: []
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
              console.log("Welcome to the Channel", channel)
            
              if (error) {
                //   return (console.log(error))
                }
            });
        });
        this.setState({
            showChat: !this.state.showChat
        })
    }


    sendMessage = params => {
        channel.sendUserMessage(params, function(message, error) {
            if (error) {
                return;
            }
        
            console.log(message);
        });
    }
    

    render() {

        console.log(params.message)
        // ChannelHandler.onMessageReceived = function(channel, message) {
        //     console.log(channel, message)
        // }
        return (
            <View>
                {this.state.showChat ? 
                    <View>
                        <MessageForm sendMessage={this.sendMessage} />
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
