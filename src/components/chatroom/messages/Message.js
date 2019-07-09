import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image
  } from "react-native";

export default class Message extends Component {
    constructor(props) {
        super(props)
        // this.fetchUser()
    
        this.state = {
            firstname: '',
            lastname: ''
        }
    }

    // fetchUser = async () => {
    //     const first = await AsyncStorage.getItem("firstname");
    //     const last = await AsyncStorage.getItem("lastname");
    //     // console.log(first, last, useremail);
    //     this.setState({
    //         firstname: first,
    //         lastname: last
    //     })
    // }
    

    inOrOutMessage = () => {
        if (this.props.userID === this.props.message.sender.userId) {
            return styles.outbound
        } else {
            return styles.inbound
        }
    }

    inOrOutText = () => {
        if (this.props.userID === this.props.message.sender.userId) {
            return styles.outboundText
        } else {
            return styles.inboundText
        }
    }
    inOrOutUser = () => {
        if (this.props.userID === this.props.message.sender.userId) {
            return styles.outboundUser
        } else {
            return styles.inboundUser
        }
    }
    
    render() {
        {/* <Image
            style={{ width: 35, height: 35, borderRadius: 35 }}
            source={{
                uri:
                {this.props.message.sender.}
            }}
        /> */}
        
        
        // console.log("message in message", this.props.message)
        return (
            <View >
                <View style={this.inOrOutMessage()}>
                    <Text style={this.inOrOutUser()} >{this.props.message._sender.nickname}</Text>
                    <Text style={this.inOrOutText()}>{this.props.message.message}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inbound: {
        display: 'flex',
        alignItems: 'flex-start',
        height: 'auto',
        padding:10,
        marginLeft: 30,
        marginRight: 'auto',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor:'white',
        // borderColor: '#FFFAFA',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,

        elevation: 10,
    },
    outbound: {
        display: 'flex',
        marginRight: 30,
        marginLeft: 'auto',
        marginBottom: 10,
        alignItems: "flex-end",
        height: 'auto',
        backgroundColor: '#3EB1D6',
        padding:10,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,

        elevation: 10,
    },
    outboundText: {
        paddingHorizontal: 5,
        color: 'white'
    },
    inboundText: {
        paddingHorizontal: 5,
    },
    outboundUser: {
        display:'none'
    },
    inboundUser: {
        color: '#FFD55B',
        fontWeight:'400'
    }
})