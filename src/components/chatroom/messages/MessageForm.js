import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity 
    } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import SendBird from 'sendbird'
import Config from '../../../config'

var sb = new SendBird({appId: Config.appId });

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

    render() {
        return (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center', 
                    marginLeft: 10
                }} >
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.messageInputHandler}
                    placeholder="Type message"
                    value={this.state.message}
                />
                <TouchableOpacity onPress={this.messageSendHandler}>
                    <View style={styles.send}>
                    <Icon name='md-send'size={25} style={{color:'white', padding: 10}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#3EB1D6',
        borderRadius: 5,
        padding: 10,
    },
    send: {
        backgroundColor:'#3EB1D6', 
        borderRadius:25, 
        marginHorizontal:10
    }
})