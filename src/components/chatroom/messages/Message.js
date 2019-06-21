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
    
    render() {
        {/* <Image
            style={{ width: 35, height: 35, borderRadius: 35 }}
            source={{
                uri:
                {this.props.message.sender.}
            }}
        /> */}
        
        console.log(this.props.userID)
        return (
            <View >
                <View style={this.inOrOutMessage()}>
                    <Text style={this.inOrOutText()} >{this.props.message.messageType}</Text>
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
        paddingBottom: 12,
        marginLeft: 30,
        marginRight: 170,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5
    },
    outbound: {
        display: 'flex',
        // width: 20,
        marginRight: 30,
        marginLeft: 170,
        marginBottom: 5,
        alignItems: "flex-end",
        height: 'auto',
        backgroundColor: '#3EB1D6',
        paddingBottom: 12,
        borderRadius: 5
    },
    outboundText: {
        paddingRight: 5,
        paddingLeft: 5
    },
    inboundText: {
        paddingLeft: 5,
        paddingRight: 5
    }
})