import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
// import propTypes from 'prop-types'

export default class Message extends Component {
    // static propTypes = {
    //     author: PropTypes.string,
    //     body: PropTypes.string.isRequired,
    //     me: PropTypes.bool,
    //   }


    render() {
        console.log(this.props.message)
        return (
            <View>
                <Text>{this.props.message.author}:</Text>
                <Text>{this.props.message.body}</Text>
            </View>
        )
    }
}
