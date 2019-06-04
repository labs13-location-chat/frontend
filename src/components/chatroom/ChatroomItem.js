import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Button } from 'react-native'


export default class ChatroomItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selected: false
        }
    }
    
    
    render() {
        // console.log(this.props.chatName)

        
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image />
                    <View>
                        <Text>
                            {this.props.chatName}
                        </Text>
                        <Text>
                            123 Main St, Anytown, USA
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Distance
                        </Text>
                        <Text>

                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        borderColor: 'gray',
        borderBottomWidth: 1
    }
})
