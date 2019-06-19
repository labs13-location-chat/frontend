import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
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
            userID: null
        }
    }
    
    
    componentDidMount() {
        this.connectToSendbird()
}

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

    static navigationOptions = {
        title: 'Join a Chat Room',
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
    console.log(first, last, useremail, id);
    this.setState({
      firstname: first,
      lastname: last,
      email: useremail
    });
  };

  render() {
    // console.log(object)

    // console.log(this.state.mapToggle)
    // console.log('chat', this.props)
    return (
      <View style={styles.container}>
        <View>
          {/* <Text>hello {this.state.firstname}</Text> */}
          <Text style={styles.topText}>Chat Nearby...</Text>
          <TextInput style={styles.search} placeholder="Search by Zipcode" />
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
        {this.state.mapToggle ? (
          <View>
            <ChatMap />
          </View>
        ) : (
          <View>
            <ChatSearch
              chatroomList={this.state.chatroom}
              navigation={this.props.navigation}
            />
          </View>
        )}
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
  }
});
