import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Dimensions
} from "react-native";
import ChatMap from "./ChatMap";
import ChatSearch from "./ChatSearch";
import SendBird from "sendbird";
import Config from "../../config";
import axios from "axios";

var sb = new SendBird({ appId: Config.appId });

const URL = "https://labs13-localchat.herokuapp.com";

export default class JoinChat extends Component {
    constructor(props) {
        super(props);
        this.fetchUser();
        
        this.state = {
            mapToggle: false,
            firstname: '',
            lastname: '',
            email: '',
            chatroom: [],
            userID: null,
            loadingChatRooms: true,
            noData: false,
            data: [],
            searchBackToNormal: false,
            focusedLocation: {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0122,
              longitudeDelta:
                (Dimensions.get("window").width / Dimensions.get("window").height) *
                0.0122
            }
          }
        }
        
        static navigationOptions = {
            title: 'Join a Chat Room',
        }
    
    componentDidMount() {
      this.connectToSendbird()
       axios
        .get("https://labs13-localchat.herokuapp.com/api/chatrooms")
        .then(res => {
          this.setState({
            chatroom: res.data,
            data: res.data,
            loadingChatRooms: false
          });
        })
        .catch(err => {
          console.log(err);
        });
      this.getGeoLocation()
    }


    getGeoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.setState({
            ...this.state.focusedLocation,
            focusedLocation: {
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

    connectToSendbird = () => {
        if (this.state.userID == null) {
            return setTimeout(() => {
                this.connectToSendbird()
            }, 1000)
        } else {
            sb.connect(this.state.userID, (user, error) => {
                if (error) {
                    console.log("Error", error)
                } else {
                    console.log("Connected to Sendbird", user)
                }
            })
        }
    }

      
    searchToggler = () => {
          if (!this.state.mapToggle) {
              return
          } else {
              this.setState({
                  mapToggle: !this.state.mapToggle
                })
            }
    }
    //   console.log('toggled')
  ;

  mapToggler = () => {
    if (this.state.mapToggle) {
      return;
    } else {
      this.setState({
        mapToggle: !this.state.mapToggle
      });
    }
    // console.log('toggled')
  };

  // viewSettingnav = () => {
  //     this.props.navigation.navigate('Setting',
  //     {user: this.props.navigation.state.params.user}
  //     )
  // }

  fetchUser = async () => {
    const id = this.props.navigation.state.params.id;
    const first = await AsyncStorage.getItem("firstname");
    const last = await AsyncStorage.getItem("lastname");
    const useremail = await AsyncStorage.getItem("email");
    let user_id = await AsyncStorage.getItem("userID")
    console.log(first, last, useremail, id);
    this.setState({
      firstname: first,
      lastname: last,
      email: useremail,
      userID: user_id
    });
  };

  searchText = (e) => {
    let text = e.toLowerCase()
    let chats = this.state.data
    let filteredName = chats.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        data: this.state.chatroom,
        // searchBackToNormal: !this.state.searchBackToNormal
      })
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        noData: true
      })
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        data: filteredName
      })
    }
  }
  


  render() {
    console.log(this.state.focusedLocation)

    return (
      <View style={styles.container}>
        <View>
          {/* <Text>hello {this.state.firstname}</Text> */}
          <Text style={styles.topText}>Chat Nearby...</Text>
          <TextInput 
            style={styles.search} 
            placeholder="Search by Name" 
            onChangeText={text => this.searchText(text)}
          />
        </View>
        <View style={styles.option}>
          <TouchableOpacity
            style={!this.state.mapToggle ? styles.condSearch : null}
            onPress={() => this.searchToggler()}
          >
            <Text>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.mapToggle ? styles.condMap : null}
            onPress={() => this.mapToggler()}
          >
            <Text>MAP</Text>
          </TouchableOpacity>
        </View>
        {this.state.mapToggle ? 
          <View>
            <ChatMap />
          </View>
         : 
        this.state.loadingChatRooms ? 
          <View>
              <ActivityIndicator style={styles.loader} size="large" color="#3EB1D6" />
          </View>
          :
        <View>
          <ChatSearch
            // chatroomList={this.state.chatroom}
            focusedLocation={this.state.focusedLocation}
            navigation={this.props.navigation}
            noData={this.state.noData}
            data={this.state.data}
          />
        </View>}
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10
  },
  container: {
      height: '90%'
  },
  topText: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
    fontWeight: "400"
  },
  option: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  condMap: {
    borderBottomWidth: 6,
    borderBottomColor: "#d9e257"
  },
  condSearch: {
    borderBottomWidth: 6,
    borderBottomColor: "#d9e257"
  },
  loader: {
      flex: 1,
      marginTop: '50%'
  }
});
