import React, { Component } from 'react'
import { chatClient } from 'twilio-chat'
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native'
import Messages from './Messages'

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoading: true,
          messages: [],
          message: {
              user_id: null,
              message: '',
              channel_id: null,
              created_at: null
          }
        };
      }
    
      handleChange = (key, value) => {
        this.setState({
          message: {
            ...this.state.message,
            [key]: value
          }
        })
      }

  
    

    render() {
        return (
            <View>
                <FlatList />
                <TextInput
                    onChangeText={val => this.handleChange('message', val)}
                    placeholder="Enter a message"
                    value={this.state.message.message}
                    name="message"
                />
                <Button title="Send" />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {

    },
    textInput: {

    }
})