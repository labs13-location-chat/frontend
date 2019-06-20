import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    Button,
    Keyboard
  } from "react-native";
import SendBird from 'sendbird'
import Config from '../../../config'

var sb = new SendBird({appId: Config.appId });
var ChannelHandler = new sb.ChannelHandler()

export default class MessageForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                message: '',
                keyboardOffset: 0
        }
    }
    
    messageInputHandler = val => {
        this.setState({
                message: val
        })
        
    }

    messageSendHandler = () => {
        if (this.state.message.length >= 1){

            this.props.sendMessage(this.state.message)
            this.setState({
                message: ''
            })
        } else {
            return
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (event) => {
        this.setState({
            keyboardOffset: event.endCoordinates.height - 275,
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardOffset: 0,
        })
    }

    render() {
        console.log(this.state.message)
        return (
            <View
                style={{
                    // position: 'absolute',
                    // bottom: this.state.keyboardOffset,
                    display: 'flex',
                    flexDirection: 'row'
                }} >
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.messageInputHandler}
                    placeholder="Type message"
                    value={this.state.message}
                />
                <Button title="Send" onPress={this.messageSendHandler}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#3EB1D6',
        width: "85%",
    } 
})