import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    FlatList
  } from "react-native";
import SendBird from 'sendbird'
import Config from '../../../config'
import Message from './Message'

var sb = new SendBird({appId: Config.appId });
var ChannelHandler = new sb.ChannelHandler()

export default class MessageView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }


    
    render() {
        // const messages = this.props.messages.reverse()
        return (
            <View>
                <FlatList 
                    // style={}
                    inverted
                    data={ this.props.messages }
                    renderItem={(info) =>
                        <Message 
                            message={info.item}
                            userID={this.props.userID}
                            
                        />
                    }

                />
                
            </View>
        )
    }
}

