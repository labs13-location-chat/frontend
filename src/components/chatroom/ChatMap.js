import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  AsyncStorage
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

export default class ChatMap extends Component {
  constructor(props) {
    super(props);
    this.fetchUser();

    this.state = {
      chatLocations: [],
      firstname: "",
      lastname: "",
      email: "",
      focusedLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      locationChosen: false
    };
  }

  componentWillMount() {
    this.getGeoLocation();
    axios
      .get("https://labs13-localchat.herokuapp.com/api/chatrooms/")
      .then(res => {
        this.setState({
          chatLocations: res.data
        })
      })
      .catch(err => console.log(err))
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

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

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
      }
    );
  };

  fetchUser = async () => {
    const first = await AsyncStorage.getItem("firstname");
    const last = await AsyncStorage.getItem("lastname");
    const useremail = await AsyncStorage.getItem("email");
    this.setState({
      firstname: first,
      lastname: last,
      email: useremail
    });
  };

  render() {
    let marker = null;
    let locations = null;

    if (this.state.chatLocations) {
      locations = this.state.chatLocations.map(eachLoc => {
        return <Marker 
          coordinate={{ latitude: eachLoc.latitude, longitude: eachLoc.longitude }} 
          title={eachLoc.name}
          key={eachLoc.chatroom_id} 
        />
      })
    }

    if (this.state.locationChosen) {
      marker = <Marker coordinate={this.state.focusedLocation} />;
    }
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          // region={this.state.focusedLocation}
          style={styles.map}
          initialRegion={this.state.focusedLocation}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
          {locations}
        </MapView>
        <View>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 360
    }
});