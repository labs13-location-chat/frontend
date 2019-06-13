import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

export default class MessageForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message: ''
        }
    }
    
    // componentDidMount = () => {
    //     this.input.focus()
    //   }

    handleChange = (key, value) => {
      console.log(value)
        this.setState({
          message: {
            ...this.state.message,
            [key]: value
          }
        })
      }

    handleFormSubmit = (event) => {
        this.props.onMessageSend(this.state.message)
        console.log("Hello from MessageForm", this.state.message)
        this.setState({
          message: ''
        })
        // this.setState({
        //     this.state.message: ''
        // })
      }

    render() {
        return (
            <View style={styles.mform}>
                <View className="input-container">
                    <TextInput
                        style={styles.input}
                        type="text"
                        onChangeText={val => this.handleChange('message', val)}
                        placeholder="Enter your message..."
                    />
                </View>
                <View className="button-container">
                    <Button title="Send" onPress={this.handleFormSubmit} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mform: {
    //   flexDirection: 'row',
    // //   justifyContent: 'flex-end',
    //   alignItems: 'flex-end',
    //   alignContent: 'flex-end',
    //   marginTop: 200   
    },
    input: {
        width: 325,
        paddingLeft: 50
    },
    button: {

    }
  })