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
			user: undefined,
			nickname: '',
			gfID: undefined
		};
	}

	componentDidMount = () => {
		// Event listener to handle OAuth url
		Linking.addEventListener('url', this.handleOpenURL);
		Linking.getInitialURL().then(url => {
			if (url) {
				this.handleOpenURL({ url });
			}
		});
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this.handleOpenURL);
	}

	async storeUser() {
		try {
			await AsyncStorage.setItem("userData", JSON.stringify(this.state.user));
		} catch (error) {
			console.log(error)
		}
	}

	handleOpenURL = ({ url }) => {
		// Extract stringified user string out of the URL
		const [ , user_string ] = url.match(/user=([^#]+)/);
		this.setState({
			// Decode the user string and parse it into JSON
			user: JSON.parse(decodeURI(user_string))
		});
		// this.props.screenProps.setUser(JSON.parse(decodeURI(user_string)))
		if (Platform.OS === 'ios') {
			SafariView.dismiss();
		}
	};

	loginWithGoogle = () =>
		this.openURL('https://labs13-localchat.herokuapp.com/auth/google');

	loginWithFacebook = () =>
		this.openURL('https://labs13-localchat.herokuapp.com/auth/facebook');

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

	render() {
		// console.log(this.state)
		const { user } = this.state;
		return (
			<View style={styles.container}>
				{
				user	
				? (
					this.storeUser()
					&&
					this.props.navigation.navigate('JoinChat', {
						id: this.state.user.id,
						// id: this.props.screenProps.user.id,
						sendbirdId: this.state.gfID
					})
				
					) : (
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
