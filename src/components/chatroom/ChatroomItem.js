import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Button } from 'react-native'
import ChatroomItemMap from './ChatroomItemMap'

const pic = {uri: 'https://static.highsnobiety.com/thumbor/CDTF4ezi0dHntnuJiNPxepGkMl0=/fit-in/480x320/smart/static.highsnobiety.com/wp-content/uploads/2015/02/saulgoodman01.jpg'}

export default class ChatroomItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            selected: false
        }
    }
    
    selectionHandler = () => {
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        // console.log(this.props.chatName)

        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.chatRoom} onPress={() => this.selectionHandler()} >
                    <View>
                        <Image source={pic} />
                    </View>
                    <View style={styles.nameAddress}>
                        <Text>
                            {this.props.chatName}
                        </Text>
                        <Text>
                            123 Main St, Anytown, USA
                        </Text>
                    </View>
                    <View>
                        <Text>
                            0.45 mi
                        </Text>
                        <Text>
                         {this.state.selected ? '-' : '+'}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.state.selected ? 
                    <View>
                        <MapView 
                            provider={PROVIDER_GOOGLE}
                        />
                    </View>

                    : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    map: {
        height: 100
    }, 
    chatRoom: {
        flex: 1,
        flexDirection: 'row'
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
    }
})
