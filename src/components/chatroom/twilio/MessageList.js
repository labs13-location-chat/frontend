import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, View, FlatList } from 'react-native'
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
// console.log(this.props.messages)
        return (
            <View>
                <Text>Poop</Text>
            <FlatList 
                style={styles.msg} 
                data={this.props.messages}
                renderItem={(info) => (
                    <Message key={info.index} message={info.item} />
                    )}   
                    />
                    </View>
        )
    }
}

const styles = StyleSheet.create({
    msg: {
        height: 25
    },

})