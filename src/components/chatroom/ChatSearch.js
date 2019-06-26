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
      orderedChatrooms: []
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
          return deez.push(deezNutz) && console.log(deez) && this.setState({ chatrooms: deez })
          // this.setState({
          //   ...chat,
          //   chatrooms: {
          //     deezNutz
          //   }
          // }) && 
        })
      }

      
  }

  // orderChats = () => {
    
  //     let closestChats = this.state.chatrooms.sort(eachChat => {
  //       return eachChat.distance > 0
  //     })
  //     this.setState({
  //       orderedChatrooms: closestChats
  //     })
  //   }


  render() {
    console.log("deez nutz", this.state.chatrooms)
    // console.log('filtered', this.state.orderedChatrooms)

    return (
        <FlatList
          data={this.state.chatrooms}
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
