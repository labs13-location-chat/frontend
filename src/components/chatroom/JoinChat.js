import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ChatMap from './ChatMap'
import ChatSearch from './ChatSearch'

export default class JoinChat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             mapToggle: false
        }
    }
    
    
    static navigationOptions = {
        title: 'Join a Chat Room',
        headerTitleStyle: {
            color: 'Black',
            fontSize: 20,
            fontWeight: '400',
            alignItems: 'center',
            textAlign: 'center'
        },
        headerStyle: {
            backgroundColor: 'white',
        },
      }
      
      searchToggler = () => {
          if (!this.state.mapToggle) {
              return
          } else {
              this.setState({
                  mapToggle: !this.state.mapToggle
                })
            }
        //   console.log('toggled')
      }

      mapToggler = () => {
        if (this.state.mapToggle) {
            return
        } else {
            this.setState({
                mapToggle: !this.state.mapToggle
              })
          }
        // console.log('toggled')
    }
    
    render() {
        console.log(this.state.mapToggle)
        return (
            <View>
                <View>
                    <Text>Chat Nearby...</Text>
                    <TextInput 
                        style={styles.search}
                        placeholder="Search by Zipcode"
                        />
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.searchToggler()}>
                        <Text>
                            SEARCH
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.mapToggler()}>
                        <Text>
                            MAP
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.mapToggle ? 
                <View>
                    <ChatMap />
                </View>
                : 
                <View>
                    <ChatSearch />
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    search: {
        borderWidth: 2,
        borderColor: 'black',
        margin: 10
    }
})