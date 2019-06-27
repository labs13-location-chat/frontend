import React, { Component } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Picker,  
    Text,
    Button,
    Dimensions,
    TouchableOpacity
  } from "react-native";

export default class CreateChatroom extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             newChatroom: {
                name: '',
                chatroom_url: '',
                radius: 0,
                description: '',
                img_url: this.randomAvatar(),
                user_id: 1,
                permanent: true,
                chatroom_type: ''
             }
        }
    }

    handleInput = (key, val) => {
        this.setState({
            ...this.state.newChatroom, 
            newChatroom: {
                ...this.state.newChatroom,
                key: val
            }
        })
    }

    randomAvatar = () => {
        let images = 
        ["https://sendbird.com/main/img/cover/cover_01.jpg", 
        "https://sendbird.com/main/img/cover/cover_02.jpg", 
        "https://sendbird.com/main/img/cover/cover_03.jpg", 
        "https://sendbird.com/main/img/cover/cover_04.jpg", 
        "https://sendbird.com/main/img/cover/cover_05.jpg", 
        "https://sendbird.com/main/img/cover/cover_06.jpg", 
        "https://sendbird.com/main/img/cover/cover_07.jpg", 
        "https://sendbird.com/main/img/cover/cover_08.jpg", 
        "https://sendbird.com/main/img/cover/cover_09.jpg"]

        return images[Math.floor(Math.random() * images.length)]
    }

    createChatroom = () => {
        OpenChannel.createChannel(this.state.newChatroom.name, COVER_IMG, this.state.newChatroom.description, )
    }
    
    render() {
        console.log(this.state.newChatroom)
        return (
            <View>
                <Text>Please Fill Out All Information</Text>
                <TextInput
                    placeholder="Name"
                    value={this.state.newChatroom.name}
                    onChangeText={val => this.handleInput(val)}
                    name="name"
                />
                <TextInput
                    placeholder="Description"
                    value={this.state.newChatroom.description}
                    onChangeText={val => this.handleInput(val)}
                    name="description"
                />
               
                <Picker
                    // selectedValue={this.state.chatroom_type}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                            newChatroom: {
                                chatroom_type: itemValue
                            }
                        })
                    }}
                >
                <Picker.Item label="Big City (25 mi radius)" value="big city" />
                <Picker.Item label="Town (15 mi radius)" value="town" />
                <Picker.Item label="Beach (2 mi radius)" value="beach" />
                <Picker.Item label="Stadium (0.5 mi radius)" value="stadium" />
                </Picker>   
                <Button 
                    title="Create Channel" 
                    onPress={}
                />
            </View>
        )
    }
}
