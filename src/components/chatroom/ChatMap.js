import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

export default class ChatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      locationChosen: false
    };
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

  // locationHandler = () => {
  //   const coords = nativeEvent.coordinate;
  //   this.map.animateToRegion({
  //     ...this.state.focusedLocation,
  //     latitude: coords.latitude,
  //     longitude: coords.longitude
  //   });
  //   this.setState(
  //           focusedLocation: {
  //               ...prevState.focusedLocation,
  //               latitude: coords.latitude,
  //               longitude: coords.longitude
  //           },
  //           locationChosen: true
  //           )

  // };

  // getLocationHandler = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     pos => {
  //       const coordsEvent = {
  //         nativeEvent: {
  //           coordinate: {
  //             latitude: pos.coords.latitude,
  //             longitude: pos.coords.latitude
  //           }
  //         }
  //       };
  //       this.setState({});
  //     },
  //     err => {
  //       console.log(err);
  //       alert("Couldn't find your location");
  //     }
  //   );
  // };

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

  render() {
    let marker = null;

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
    // height: 475
    height: 400
    //  marginTop: 80
  }
});
