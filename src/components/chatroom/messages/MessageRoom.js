import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator,
	Keyboard,
	AsyncStorage,
	KeyboardAvoidingView
} from 'react-native';
import SendBird from 'sendbird';
import Config from '../../../config';
import MessageForm from './MessageForm';
import MessageView from './MessageView';

var sb = new SendBird({ appId: Config.appId });
var ChannelHandler = new sb.ChannelHandler();
const params = new sb.UserMessageParams();

export default class MessageRoom extends Component {
	constructor(props) {
		super(props);
		this.fetchUser();

		this.state = {
			chatroomInfo: [],
			showChat: false,
			channelInfo: [],
			messages: [],
			fetchedOld: false,
			fetched: false,
			loading: true,
			channel: [],
			userID: '',
			messageSentUpdate: false,
			keyboardOffset: 0,
			keyboardShown: false,
			name: ''
		};
	}

	async componentDidMount() {
		let chatInfo = this.props.navigation.getParam('user');
		this.setState({
			chatroomInfo: chatInfo,
			keyboardShown: false
		});
		this.getChannel();
	}

	static navigationOptions = {
		title: 'Chatroom'
	};

	fetchUser = async () => {
		const user_id = await AsyncStorage.getItem('userID');
		const first_name = await AsyncStorage.getItem('name');
		const anon = await AsyncStorage.getItem('anonymous');
		this.setState({
			userID: user_id
		});
	};

	// Fetches the channel from SendBird.  Also connects
	getChannel = () => {
		if (sb == null)
			return setTimeout(() => {
				this.getChannel();
			}, 1000);
		const channel = sb.OpenChannel.getChannel(
			this.state.chatroomInfo.chatroom_url,
			(channel, error) => {
				if (error) {
					setTimeout(() => {
						return this.getChannel();
					}, 1000);
				} else {
					// sb.connect(this.state.userID, (user, error) => {
					//     if (error) {
					//         console.log("Error", error)
					//     } else {
					//         console.log("Joining Channel", user)
					//     }
					// })
					channel.enter(function(response, error) {
						console.log('Welcome to the Channel', channel);
						if (error) {
						}
					});
					console.log('Mounting being handled, thats what she said');
					this.handleMounting(channel, error);
				}
			}
		);
	};

	// Receives messages from the server
	handleMounting = (channel, error) => {
		this.setState({
			channel: channel
		});
		var messageQuery = channel.createPreviousMessageListQuery();
		messageQuery.load(20, true, (messageList, error) => {
			channel.messageList = messageList;
			this.setState({
				messages: messageList,
				channel,
				error,
				messageQuery,
				fetchedOld: true,
				loading: false,
				fetched: true
			});
		});
		var ChannelHandler = new sb.ChannelHandler();
		ChannelHandler.onMessageReceived = (channel, message) => {
			if (channel.url == this.state.channel.url) {
				var messages = [ message ];
				this.setState({
					messages: messages.concat(this.state.messages)
				});
				this.state.lastMessage = message;
			}
		};
		sb.addChannelHandler('MessageView', ChannelHandler);
	};

	joinChannel = () => {
		sb.connect(this.state.userID, (user, error) => {
			if (error) {
				console.log('Error', error);
			} else {
				console.log('Joining Channel', user);
			}
		});
		sb.OpenChannel.getChannel(
			this.state.chatroomInfo.chatroom_url,
			(channel, error) => {
				if (error) {
					return 'top', console.log(error);
				}
				channel.enter(function(response, error) {
					console.log('Welcome to the Channel', channel);
					if (error) {
					}
				});
			}
		);
		this.setState({
			showChat: !this.state.showChat
		});
		ChannelHandler.onMessageReceived();
	};

	sendMessage = (message, channel) => {
		channel = this.state.channel;
		channel.sendUserMessage(message, (message, error) => {
			if (error) {
				console.log('error in message', error);
			}
			var messages = [ message ];
			this.setState({
				messages: messages.concat(this.state.messages)
			});
		});
		console.log(message);
	};

	render() {
		console.log(this.state.chatroomInfo)
		console.log("Messages", this.state.messages)
		return (
			<View>
				{this.state.loading ? (
					<View>
						<ActivityIndicator
							style={styles.loader}
							size='large'
							color='#3EB1D6'
						/>
					</View>
				) : (
					<View style={styles.messageSection}>
						<View>
							<MessageView
								userID={this.state.userID}
								chatroomInfo={this.state.chatroomInfo}
								messages={this.state.messages}
								// style={styles.messageSection}
							/>
							<MessageForm
								sendMessage={this.sendMessage}
								style={styles.form}
								style={styles.messageSection}
							/>
						</View>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	messageContainer: {
		height: 300
	},
	messageSection: {
		paddingBottom: 210,
		display: 'flex',
		flexDirection: 'column'
	},
	messageSectionKeyboard: {
		marginBottom: 100,
		display: 'flex',
		flexDirection: 'column'
	},
	form: {
		display: 'flex',
		alignItems: 'center'
	},
	loader: {
		flex: 1,
		marginTop: '50%'
	}
});
