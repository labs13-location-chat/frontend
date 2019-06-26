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
            },
          anonymous: null
          }
        }
        
        static navigationOptions = {
            title: 'Chatrooms',
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
    
    anonymousUserOrNot = () => {
      let anonymous = this.props.navigation.state.params.anonymous;
      let nickname = this.state.firstname
      
      if (anonymous) {
        return "Anon"
      } else {
        return nickname
      }
    }
    
    // sendbird connection initiated
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
                    sb.updateCurrentUserInfo(this.anonymousUserOrNot(), null, (user, err) => {
                      if (err) {
                        console.log(err)
                      }
                    })
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

  // viewSettingnav = () => {
  //     this.props.navigation.navigate('Setting',
  //     {user: this.props.navigation.state.params.user}
  //     )
  // }

  fetchUser = async () => {
    const anon = await AsyncStorage.getItem('anonymous');
    const id = this.props.navigation.state.params.id;
    const first = await AsyncStorage.getItem("firstname");
    const last = await AsyncStorage.getItem("lastname");
    const useremail = await AsyncStorage.getItem("email");
    let user_id = await AsyncStorage.getItem("userID");
    console.log(first, last, useremail, id);
    this.setState({
      firstname: first,
      lastname: last,
      email: useremail,
      userID: user_id,
      anonymous: anon
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
    

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <View style={styles.container}>
        <View>
          {/* <Text>hello {this.state.firstname}</Text> */}
          <Text style={styles.topText}>Chat Nearby...</Text>
          <View style={styles.searchBar}>
            <Icon name='search' color='#A8A7A3' size={15} style={{paddingHorizontal:20}}/>
            <TextInput 
              style={styles.search} 
              placeholder="Search by Name" 
              onChangeText={text => this.searchText(text)}
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
            chatroomList={this.state.chatroom}
            focusedLocation={this.state.focusedLocation}
            navigation={this.props.navigation}
            noData={this.state.noData}
            data={this.state.data}
            anonymous={this.state.anonymous}

            // style={styles.chats}
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
    paddingBottom: 80
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
    // borderWidth: 1,
    // borderColor: "black",
    // margin: 20
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
