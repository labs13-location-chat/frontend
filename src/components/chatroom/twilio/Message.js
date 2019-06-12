import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
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
            <View style={styles.message}>
                <Text>{this.props.message.author}:PoopOpppOpppoppopop</Text>
                <Text>{this.props.message.body}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    message: {
        borderStyle: 'solid',
        marginTop: 30
    }
})