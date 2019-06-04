import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Button } from 'react-native'
import React, { Component } from 'react'

export default class ChatroomItemSelected extends Component {
    render() {
        return (
            <View>
                <View>
                    <Button title="Join Chat" />
                </View>
                <View>
                    <Text>
                        Name of Chat
                    </Text>
                    <Text>15 Members</Text>
                </View>
                <View>
                    <Text>Today at 4:30 to Today at 9:30</Text>
                    <Text>123 Main Street, Anytown, USA</Text>
                    <Text>
                        This is a paragraph.  This is a paragraph.  Paragraph, paragraph.  Dictionary encyclopedia crab.
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        borderRadius: 30
    }
})
