import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import ChatMap from './ChatMap'
import ChatSearch from './ChatSearch'

export default class JoinChat extends Component {
    constructor(props) {
        super(props);
        // this.fetchUser();
    
        this.state = {
            mapToggle: false,
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
    
    // viewSettingnav = () => {
    //     this.props.navigation.navigate('Setting', 
    //     {user: this.props.navigation.state.params.user}
    //     )
    // }

    // fetchUser = async () => {
    //     const user = await AsyncStorage.getItem("user");
    //     console.log(user)
    // }

    render() {
        console.log(this.state.mapToggle)
        console.log('chat', this.props)
        // console.log(this.props.navigation.state.params.user.first_name)
        return (
            <View>
                <View>
                <Button title="nav" onPress={this.viewSettingnav} />
                    <Text></Text>
                    <Text style={styles.topText} >Chat Nearby...</Text>
                    <TextInput 
                        style={styles.search}
                        placeholder="Search by Zipcode"
                        />
                </View>
                <View style={styles.option}>
                    <TouchableOpacity style={!this.state.mapToggle ? styles.condSearch : null} onPress={() => this.searchToggler()}>
                        <Text>
                            SEARCH
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.mapToggle ? styles.condMap : null} onPress={() => this.mapToggler()}>
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
        borderWidth: 1,
        borderColor: 'black',
        margin: 10
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
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    condMap: {
        borderBottomWidth: 6,
        borderBottomColor: '#d9e257'
    },
    condSearch: {
        borderBottomWidth: 6,
        borderBottomColor: '#d9e257'
    }
})