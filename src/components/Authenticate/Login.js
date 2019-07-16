import React from 'react';
import axios from 'axios';
import {
	View,
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet,
	AsyncStorage,
	Image,
	Linking,
	Platform
} from 'react-native';
import SafariView from 'react-native-safari-view';
// import SendBird from "sendbird";
// import Config from "../../config";

const URL = 'https://labs13-localchat.herokuapp.com';

// var sb = new SendBird({ appId: Config.appId });
export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined, // user has not logged in yet
			userId: 4,
			nickname: '',
			loadingLoginCheck: true
		};
	}

	// Set up Linking
	componentDidMount = async () => {
		await this.checkForUser()
		// Add event listener to handle OAuthLogin:// URLs
		Linking.addEventListener('url', this.handleOpenURL);
		// Launched from an external URL
		Linking.getInitialURL().then(url => {
			if (url) {
				this.handleOpenURL({ url });
			}
		});
	}

	componentWillUnmount() {
		// Remove event listener
		Linking.removeEventListener('url', this.handleOpenURL);
		this.props.navigation.navigate('MyProfile', { id: this.state.user.id });
		// this.props.navigation.navigate('Setting', { id: this.state.user.id });
		this.props.navigation.navigate('JoinChat', { user: this.state.user });
	}

	checkForUser = async () => {
		const isUser = await AsyncStorage.getItem('token')
		console.log(isUser)
		const herokuId = await AsyncStorage.getItem("herokuID")
		const first = await AsyncStorage.getItem("firstname");
		const last = await AsyncStorage.getItem("lastname");
		const useremail = await AsyncStorage.getItem("email");
		const phonenum = await AsyncStorage.getItem("phonenumber")
		if (isUser) {
			this.setState({
				user: {
					id: herokuId,
					first_name: first,
					last_name: last,
					token: isUser,
					phone_num: phonenum,
					email: useremail
				},
				loadingLoginCheck: false
			})
		} else {
			this.setState({
				loadingLoginCheck: false
			})
		}
	}

	handleOpenURL = ({ url }) => {
		// Extract stringified user string out of the URL
		const [ , user_string ] = url.match(/user=([^#]+)/);
		this.setState({
			// Decode the user string and parse it into JSON
			user: JSON.parse(decodeURI(user_string))
		});
		if (Platform.OS === 'ios') {
			SafariView.dismiss();
		}
	};

	// Handle Login with Google button tap
	loginWithGoogle = () =>
		this.openURL('https://labs13-localchat.herokuapp.com/auth/google');

	// Handle Login with Facebook button tap
	loginWithFacebook = () =>
		this.openURL('https://labs13-localchat.herokuapp.com/auth/facebook');

	// logout = async () => {
	// 	try {
	// 		await this.openURL(
	// 			'https://labs13-localchat.herokuapp.com/auth/logout'
	// 		);
	// 		this.setState({ user: undefined });
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// Open URL in a browser
	openURL = url => {
		// Use SafariView on iOS
		// if (Platform.OS === 'ios') {
		// 	SafariView.show({
		// 		url: url,
		// 		fromBottom: true
		// 	});
		// } else {
			// Or Linking.openURL on Android
			Linking.openURL(url);
		}
	
	// viewJoinChats = () => {
	//   // AsyncStorage.setItem();
	//   this.props.navigation.navigate("JoinChat", { id: this.state.user.id });
	// };

	// signOut = () => {
	//   this.setState({
	//     user: undefined
	//   });
	// };

	signOut = () => {
		this.setState({
			user: undefined
		});
		AsyncStorage.removeItem('userID');
		sb.disconnect(function() {
			// A current user is discconected from SendBird server.
		});
	};

	setGFId = () => {
		if (this.state.user.google_id) {
			return AsyncStorage.setItem('userID', this.state.user.google_id);
		} else {
			return AsyncStorage.setItem('userID', this.state.user.facebook_id);
		}
	}

	render() {
		console.log(this.state)
		const { user } = this.state;
		// console.log('THIS IS THE USER ID', this.state.user);
		// console.log('loginstate', this.state);
		return (
			<View style={styles.container}>
				{this.state.loadingLoginCheck ? 
				<View>
					<ActivityIndicator style={styles.loader} size="large" color="#3EB1D6" />
				</View>
				:
				user ? (
					// Show user info if already logged in
					this.setGFId() &&
					AsyncStorage.setItem(
						'ID',
						this.state.userId
						) &&
					AsyncStorage.setItem(
						'firstname',
						this.state.user.first_name
						) &&
						AsyncStorage.setItem(
							'lastname',
						this.state.user.last_name
						) &&
						// AsyncStorage.setItem('email', this.state.user.email) &&
					AsyncStorage.setItem(
						'phonenumber',
						this.state.user.phone_num
						) &&
					AsyncStorage.setItem(
						'token',
						this.state.user.token
					) &&
					AsyncStorage.setItem('photo', this.state.user.photo) &&
					this.props.navigation.navigate('JoinChat', {
						id: this.state.user.id
					})
				
					) : (
					// <View style={styles.content}>
					//   <Text style={styles.header}>Welcome {user.first_name}!</Text>
					//   <View style={styles.avatar}>
					//     <Image
					//       source={{ uri: user.avatar }}
					//       style={styles.avatarImage}
					//     />
					//     <Button title="Join Chats" onPress={this.viewJoinChats} />
					//     <Button title="Sign Out" onPress={this.signOut} color="red" />
					//   </View>
					// </View>
					// Show Please log in message if not
					<View style={styles.content}>
						<Image source={require('./CMLogo.png')} />

						{/* Login buttons */}

						<View style={styles.header}>
							<Text style={styles.headerText}>
								Welcome to chat maps!
							</Text>
						</View>
						<TouchableOpacity
							onPress={this.loginWithGoogle}
							style={styles.btnClickContain}
						>
							<View style={styles.btnContainer}>
								<Image
									source={require('./GLiteLogo.png')}
									style={styles.btnIcon}
								/>
								<Text style={styles.btnText}>
									Sign In with Google
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.loginWithFacebook}
							style={styles.btnClickContain}
						>
							<View style={styles.btnContainer}>
								<Image
									source={require('./FBLogo.png')}
									style={styles.btnIcon}
								/>
								<Text style={styles.btnText}>
									Sign In with Facebook
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}


const iconStyles = {
	borderRadius: 10,
	iconStyle: { paddingVertical: 5 }
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},
	loader: {
		flex: 1,
		marginTop: '50%'
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '10%'
	},
	header: {
		textAlign: 'center',
		marginTop: '20%',
		marginBottom: '10%'
	},
	headerText: {
		fontSize: 22,
		fontWeight: '600',
		color: '#4A4A4A'
	},

	btnClickContain: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 0.75,
		borderRadius: 50,
		padding: 10,
		width: '75%',
		// marginTop: 20,
		marginBottom: 20
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnIcon: {
		height: 25,
		width: 25
	},
	btnText: {
		fontSize: 15,
		fontWeight: '600',
		marginLeft: '15%',
		color: '#4A4A4A'
	}
});
