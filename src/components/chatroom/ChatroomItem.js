import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Button, AppRegistry, LayoutAnimation, UIManager, Platform } from 'react-native'
import ChatroomItemMap from './ChatroomItemMap'
import ChatroomItemSelected from './ChatroomItemSelected'

const pic = {uri: 'https://static.highsnobiety.com/thumbor/CDTF4ezi0dHntnuJiNPxepGkMl0=/fit-in/480x320/smart/static.highsnobiety.com/wp-content/uploads/2015/02/saulgoodman01.jpg'}

export default class ChatroomItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            expanded: false
        }
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental(true)
            }
        }

    
    selectionHandler = () => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        // console.log(this.props.chatName)

        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.chatRoom} onPress={() => this.selectionHandler()} >
                    <View>
                        <Image style={{ width: 35, height: 35, borderRadius: 35 }} source={{uri: 'https://i.kym-cdn.com/photos/images/newsfeed/001/460/439/32f.jpg'}} />
                    </View>
                    <View style={styles.nameAddress}>
                        <Text>
                            {this.props.chatName}
                        </Text>
                        <Text>
                            123 Main St, Anytown, USA
                        </Text>
                    </View>
                    <View style={styles.distance}>
                        <Text>
                            0.45 mi
                        </Text>
                        <Text>
                         {this.state.expanded ? '-' : '+'}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.state.expanded ? 
                <View>
                    <ChatroomItemMap style={styles.map} />
                    <ChatroomItemSelected />
                </View>
                    : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        height: 100
    },
    container: {
        height: 85,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    map: {
        height: 100
    }, 
    chatRoom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 50
    },
    nameAddress: {
        width: '70%'
    },
    name: {
        fontSize: 15
    },
    // address: {
    //     fontSize: 12
    // }
    image: {
        width: 25,
        borderRadius: 5
    },
    // distance: {
    //     alignItems: 'flex-end'
    // }
})


AppRegistry.registerComponent('ChatroomItem', () => ChatroomItem)