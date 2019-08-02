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
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import ChatMap from "./ChatMap";
import ChatSearch from "./ChatSearch";
import SendBird from "sendbird";
import Config from "../../config";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDistance }  from "geolib";

var sb = new SendBird({ appId: Config.appId });

const URL = "https://labs13-localchat.herokuapp.com";

export default class JoinChat extends Component {
    constructor(props) {
      super(props);
      this.fetchUser();
      
        this.state = {
          mapToggle: false,
          chatroom: [],
          userID: null,
          loadingChatRooms: true,
          noData: false,
          data: [],
          searchBackToNormal: false,
          focusedLocation: {
            latitude: 99999,
            longitude: 0,
            latitudeDelta: 0.0122,
            longitudeDelta:
            (Dimensions.get("window").width / Dimensions.get("window").height) *
              0.0122
            },
          chatWithDistance: [],
          chatWithDistanceFallbackForSearch: [],
          searchValue: '',
          user: null
          }
        }
        
        static navigationOptions = {
            title: 'Chatrooms',
          }
    
    async componentDidMount() {
      await this.fetchUser()
      await this.connectToSendbird()
      await this.getGeoLocation()
      await axios
      .get("https://labs13-localchat.herokuapp.com/api/chatrooms")
      .then(res => {
        this.setState({
          chatroom: res.data,
          data: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
      await this.getDistanceFromChat()
    }

    componentDidUpdate = async (prevProps) => {
      if (this.props.screenProps.pageRefreshCounter !== prevProps.screenProps.pageRefreshCounter) {
        this.setState({
          loadingChatRooms: true
        })
        await this.getGeoLocation()
        await axios
        .get("https://labs13-localchat.herokuapp.com/api/chatrooms")
        .then(res => {
          this.setState({
            chatroom: res.data,
            data: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
        await this.getDistanceFromChat()
      }
    }

    refreshPage = async () => {
      await this.getGeoLocation()
        await axios
        .get("https://labs13-localchat.herokuapp.com/api/chatrooms")
        .then(res => {
          this.setState({
            chatroom: res.data,
            data: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
        await this.getDistanceFromChat()
      }
    


    getGeoLocation =  async () => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(position => {
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
    
    getDistanceFromChat = () => {
        let newChatItem = []
        chatrooms = this.state.chatroom
        const orderedResults = chatrooms.map((chat) => {
          let distance = getDistance(
            { latitude: chat.latitude, longitude: chat.longitude }, 
            { latitude: this.state.focusedLocation.latitude, longitude: this.state.focusedLocation.longitude },
            1
            )
            let newChat = {...chat, distance: distance}
                return newChatItem.push(newChat)

            })
          
              this.setState({
                chatWithDistance: newChatItem,
                chatWithDistanceFallbackForSearch: newChatItem,
                loadingChatRooms: false
              })
            }
        
    

    checkForSortedChats = () => {
        return this.setState({
          loadingChatRooms: false
        }) &&
        console.log("Checking")
    }

        
    // sendbird connection initiated
    connectToSendbird = () => {
        if (this.state.user == null) {
            return setTimeout(() => {
                this.connectToSendbird()
            }, 1000)
        } else {
            let googleCheck = this.state.user.google_id ? this.state.user.google_id : this.state.user.facebook_id
            sb.connect(googleCheck, (user, error) => {
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
  ;

  mapToggler = () => {
    if (this.state.mapToggle) {
      return;
    } else {
      this.setState({
        mapToggle: !this.state.mapToggle
      });
    }
  };

  onSwipeRight(gestureState) {
    if (!this.state.mapToggle) {
      return
  } else {
      this.setState({
          mapToggle: !this.state.mapToggle
        })
    }
  }

  onSwipeLeft(gestureState) {
    if (this.state.mapToggle) {
      return
  } else {
      this.setState({
          mapToggle: !this.state.mapToggle
        })
    }
  }


  fetchUser = async () => {
    let userData = await AsyncStorage.getItem("userData");
    let user = JSON.parse(userData);
    console.log("fetchuser in joinchat", user)
    this.setState({
      user: user
  })
}

  searchText = (val) => {
    this.setState({
      searchValue: val
    })
  }
  
  


  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
console.log("JC User state", this.state.user)
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.topText}>Chat Nearby...</Text>
          <View style={styles.searchBar}>
            <Icon name='search' color='#A8A7A3' size={15} style={{paddingHorizontal:20}}/>
            <TextInput 
              style={styles.search} 
              placeholder="Search by Name" 
              onChangeText={val => this.searchText(val)}
              value={this.state.searchValue}
            />
            <Icon name='map-marker' color='#A8A7A3' size={20} style={{paddingHorizontal:20}}/>
          </View>
        </View>
        <View style={styles.option}>
          <TouchableOpacity
            style={!this.state.mapToggle ? styles.condSearch : null}
            onPress={() => this.searchToggler()}
          >
            <Text style={{fontWeight: "600"}}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.mapToggle ? styles.condMap : null}
            onPress={() => this.mapToggler()}
          >
            <Text style={{fontWeight: "600"}}>MAP</Text>
          </TouchableOpacity>
        </View>



    <GestureRecognizer 
      onSwipeLeft={(state) => this.onSwipeLeft(state)}
      onSwipeRight={(state) => this.onSwipeRight(state)}
      config={config}>
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
            searchValue={this.state.searchValue}
            navigation={this.props.navigation}
            chatWithDistance={this.state.chatWithDistance}
            focusedLocation={this.state.focusedLocation}
            userInformation={this.state.user}
            refreshPage={this.refreshPage}
          />
          <View style={styles.chats} />
        </View>}
      
      </GestureRecognizer>
          
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chats: {
    flex: 1
  },
  searchBar: {
    flexDirection:'row', 
    alignItems: 'center', 
    borderWidth: 1,
     marginHorizontal:20, 
     marginTop:10
  },
  search: {
    flex: 1
  },
  container: {
      height: '90%'
  },
  topText: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600"
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