import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import Message from './Message'
// import propTypes from 'prop-types'

export default class MessageList extends Component {
    // static propTypes = {
    //     messages: PropTypes.arrayOf(PropTypes.object)
    //   }

    // componentDidUpdate = () => {
    //     this.node.scrollTop = this.node.scrollHeight
    //   }


    render() {
        return (
            <ScrollView style={styles.msg} >
                {this.props.messages.map((message, i) => {
                    <Message key={i} message={message} />
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    msg: 25,

})