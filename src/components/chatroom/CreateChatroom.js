import React, { Component } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Picker,  
    Text,
    Dimensions,
    Button,
    AsyncStorage
  } from "react-native";
import SendBird from 'sendbird';
import axios from 'axios'
import Config from '../../config'



var sb = new SendBird({ appId: Config.appId });

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
                latitude: 99999,
                longitude: 0,
                permanent: true,
                chatroom_type: 'rural city'
             },
             userId: 0,
             sendbirdChatroom: []
        }
    }

    componentDidMount = async () => {
        await this.getGeoLocation()
        const user_id = await AsyncStorage.getItem('userID')
        this.setState({
            userId: user_id
        })
    }
    
    getGeoLocation =  async () => {
        if (navigator.geolocation) {
          await navigator.geolocation.getCurrentPosition(position => {
            console.log("Locations Calculated")
            this.setState({
              
              newChatroom: {
                ...this.state.newChatroom,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  (Dimensions.get("window").width /
                    Dimensions.get("window").height) *
                  0.0122
              }
            });
          });
        }
      };

    handleNameInput = val => {
        console.log(this.state.newChatroom)
        this.setState({
            // ...this.state.newChatroom, 
            newChatroom: {
                ...this.state.newChatroom,
                name: val
            }
        })
    }

    handleDescriptionInput = val => {
        console.log(this.state.newChatroom)
        this.setState({
            // ...this.state.newChatroom, 
            newChatroom: {
                ...this.state.newChatroom,
                description: val
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


    createChatroom = async (e) => {
        let channel = []
        // if (this.state.newChatroom.name.length < 1 || this.state.newChatroom.description.length < 1) {
        //     await alert("Please enter a Name and/or Description!")
        // } else {
            await sb.OpenChannel.createChannel(this.state.newChatroom.name, this.state.newChatroom.img_url, this.state.newChatroom.description, this.state.userId,  async function(openChannel, error) {
                if (error) {
                    return console.log(error)
                }
                
                channel = await openChannel
                
                console.log(openChannel, channel, this)
            }) 
        
        
        this.setState({
            sendbirdChatroom: channel
        }, () => 
        console.log(this.state.sendbirdChatroom)
        ) 
    }
    
    render() {
        console.log(this.state.newChatroom)
        return (
            <View>
                {/* <Text style={styles.text}>New Feature Coming Soon!</Text> */}
                <Text>Please Fill Out All Information</Text>
                <TextInput
                    placeholder="Name"
                    value={this.state.newChatroom.name}
                    onChangeText={val => this.handleNameInput(val)}
                    name="name"
                />
                <TextInput
                    placeholder="Description"
                    value={this.state.newChatroom.description}
                    onChangeText={val => this.handleDescriptionInput(val)}
                    name="description"
                />
               
                <Picker
                    selectedValue={this.state.newChatroom.chatroom_type}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                            newChatroom: {
                                ...this.state.newChatroom,
                                chatroom_type: itemValue
                            }
                        })
                    }}
                >
                <Picker.Item label="Rural City (100 mi radius)" value="rural city" />
                <Picker.Item label="Big City (25 mi radius)" value="big city" />
                <Picker.Item label="Town (15 mi radius)" value="town" />
                <Picker.Item label="Beach (2 mi radius)" value="beach" />
                <Picker.Item label="Stadium (0.5 mi radius)" value="stadium" />
                </Picker>   
                <Button 
                    title="Create Channel" 
                    onPress={e => this.createChatroom(e)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        display: 'flex',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center'
    }
})