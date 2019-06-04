 import React, { Component } from 'react'
 import { View, Text, StyleSheet } from 'react-native'
 import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
 import axios from 'axios'
 
 export default class ChatMap extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    


     render() {
         return (
             <View>
                 <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}
                />
             </View>
         )
     }
 }

 const styles = StyleSheet.create({
     map: {
         height: 400,
        //  marginTop: 80
     }
 })
 