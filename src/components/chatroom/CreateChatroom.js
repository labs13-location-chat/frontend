import React, { Component } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Picker,  
    Text,
    Dimensions,
    TouchableOpacity,
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

    static navigationOptions = {
        title: 'Create a Chatroom',
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
            ...this.state,
            newChatroom: {
                ...this.state.newChatroom,
                name: val
            }
        })
    }

    handleDescriptionInput = val => {
        console.log(this.state.newChatroom)
        this.setState({
            ...this.state,
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

    createServerChatroom = () => {
        axios
        .post('http://labs13-localchat.herokuapp.com/api/chatrooms/', this.state.newChatroom)
        .then(res => {
            this.setState({
                ...this.state,
                newChatroom: {
                    ...this.state.newChatroom,
                    name: '',
                    description: '',
                    chatroom_url: ''
                }
            })
            alert("Chatroom Creation Successful!")
        })
        .catch(err => {
            console.log(err)
            alert("Chatroom Creation Failure!")
        })
    }

    createChatroom = async (e) => {
        let channel = []
        // if (this.state.newChatroom.name.length < 1 || this.state.newChatroom.description.length < 1) {
        //     await alert("Please enter a Name and/or Description!")
        // } else {
            await sb.OpenChannel.createChannel(this.state.newChatroom.name, this.state.newChatroom.img_url, this.state.newChatroom.description, this.state.userId,  (openChannel, error) => {
                if (error) {
                    return console.log(error)
                }
                
                channel = openChannel
                this.setState({
                    ...this.state,
                    newChatroom: {
                        ...this.state.newChatroom,
                        chatroom_url: channel.url 
                    }
                }, () => console.log("in set state", openChannel, channel, this, this.state.newChatroom))
                if (this.state.newChatroom.chatroom_url !== '') {
                    alert("Good work!")
                }
                console.log(openChannel, channel, this, this.state.newChatroom)
            })  
    }
    
    render() {
        console.log(this.state.newChatroom)
        return (
            <View>
                {/* <Text style={styles.text}>New Feature Coming Soon!</Text> */}
                <Text style={styles.headerText}>Please Fill Out All Information</Text>
                <Text style={styles.titleText}>Name of Chatroom:</Text>
                <TextInput
                    style={styles.textInputs}
                    placeholder="Name"
                    value={this.state.newChatroom.name}
                    onChangeText={val => this.handleNameInput(val)}
                    name="name"
                />
                <Text style={styles.titleText}>Chatroom Description:</Text>
                <TextInput
                    style={styles.textInputs}
                    placeholder="Description"
                    value={this.state.newChatroom.description}
                    onChangeText={val => this.handleDescriptionInput(val)}
                    name="description"
                />
               
               <Text style={styles.titleText}>Please Select a Chatroom Diameter:</Text>
                <Picker
                    style={styles.textInputs}
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
                <View styles={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={e => this.createChatroom(e)}
                        style={styles.buttonStyle}
                        >
                        <Text style={styles.buttonText}>Create Chatroom</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: '90%'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    },
    textInputs: {
        flexDirection:'row', 
        alignItems: 'center', 
        borderWidth: 1,
         marginHorizontal:20, 
         marginTop:10,
         marginBottom: 15
      },
      titleText: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 15,
        fontWeight: "600"
      },
    text: {
        fontSize: 20,
        display: 'flex',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        marginTop: 50,
        borderRadius: 50,
        // flexDirection: 'row',
        // justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#3EB1D6',
        width: '75%',
        padding: 15,
        margin: 'auto'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
})