import React, { Component } from 'react'
import {
    View,
    FlatList
  } from "react-native";
import SendBird from 'sendbird'
import Config from '../../../config'
import Message from './Message'

var sb = new SendBird({appId: Config.appId });

export default class MessageView extends Component {
    constructor(props) {
        super(props)
    }


    
    
    render() {
        return (
            <View>
                <FlatList 
                    inverted
                    data={ this.props.messages }
                    renderItem={(info) =>
                        <Message 
                            message={info.item}
                            userID={this.props.userID}
                            userInfo={this.props.userInfo}
                        />
                    }

                />
                
            </View>
        )
    }
}

