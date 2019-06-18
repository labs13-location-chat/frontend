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
import MessageView from './MessageView'

var sb = new SendBird({appId: Config.appId });
var ChannelHandler = new sb.ChannelHandler()
const params = new sb.UserMessageParams();



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
    
    // registerCommonHandler = (channelHandler, channelUrl) => {
    //     channelHandler.onMessageReceived = (channel, message) => {

    //     }
    // }

    // registerChannelHandler = () => {
    //     const sbinstance = SendBird.getInstance()
    //     let channelHandler = new sb.ChannelHandler();
    // }
    
    joinChannel = () => {
        sb.OpenChannel.getChannel(this.state.user.chatroom_url, function(channel, error) {
            if (error) {
              return ("top", console.log(error))
            }
            //this code needs to be put somewhere to fetch previous messages if we want that functionality
            // var messageListQuery = channel.createPreviousMessageListQuery();
            // messageListQuery.limit = 30;
            // messageListQuery.reverse = true;
        
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


    sendMessage = message => {
        console.log("Message", message)
        sb.OpenChannel.getChannel(this.state.user.chatroom_url, function(channel, error) {
            if (error) {
                return;
            }
        
            // Successfully fetched the channel.
            // console.log(channel);
            channel.sendUserMessage(message, function(message, error) {
                if (error) {
                    return;
                }
                
                console.log(message);
            });
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
                        <MessageView chatroomInfo={this.state.user} /> 
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
