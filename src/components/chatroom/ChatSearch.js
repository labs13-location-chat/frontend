import React, { Component } from "react";
import axios from "axios";
import { StyleSheet, FlatList } from "react-native";
import ChatroomItem from "./ChatroomItem";
import { getDistance }  from "geolib";

export default class ChatSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatrooms: [],
      location: {
        latitude: 99999,
        longitude: 0,
      },
      orderedChatrooms: [],
      updating: false
    }
  }

  componentDidMount() {
    // axios
    //   .get('https://labs13-localchat.herokuapp.com/api/chatrooms/')
    //   .then(res => {
    //     this.setState({
    //       chatrooms: res.data
    //     })
    //   })
    //   .catch(err => console.log(err))
    this.setState({
      chatrooms: this.props.chatroomList
    })
      this.getGeoLocation()
      this.getDistanceFromChat()
      // this.orderChats()
  }

  componentDidUpdate(prevState) {
    if (this.state.updating !== prevState.updating) {
      console.log("Refresh!")
    }
  }
  


  
  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          ...this.state.location,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude, 
          }
        });
      });
    }
  };

  getDistanceFromChat = () => {
    if (this.state.location.latitude === 99999 ) {
      return setTimeout(() => {
        this.getDistanceFromChat()
      }, 1000)
    } else {
      let deez = []
      chatrooms = this.state.chatrooms
      chatrooms.map((chat) => {
        let distance = getDistance(
          { latitude: chat.latitude, longitude: chat.longitude }, 
          { latitude: this.state.location.latitude, longitude: this.state.location.longitude },
          1
          )
          console.log(distance)
          let deezNutz = {...chat, distance: distance}
          return deez.push(deezNutz) 
        })
        return this.setState({
          chatrooms: deez
        })
      }
  }



  render() {
    return (
        <FlatList
          data={this.state.chatrooms.sort(function (a, b) {
            return a.distance - b.distance
          })}
          renderItem={info => 
            <ChatroomItem 
            navigation={this.props.navigation} 
            noData={this.props.noData}
              // key={info.index} 
              chat={info.item}
              focusedLocation={this.props.focusedLocation}
            />}
        />
    );
  }
}
