import React from 'react';
import axios from 'axios';
import {
	View,
	Button,
	TouchableOpacity,
	Text,
	TextInput,
	StyleSheet,
	AsyncStorage,
	Image,
	Linking,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

const URL = 'https://labs13-localchat.herokuapp.com';

export default class Login extends React.Component {
	//   state = {
	//     login: {
	//       email: '',
	//       password: '',
	//     }
	//   }
	//   handleLogin = () => {
	//     axios
	//     .post(`${URL}/api/login`, {
	//       email: this.state.login.email,
	//       password: this.state.login.password
	//     })
	//     .then(res => {
	//       console.log(res)
	//       AsyncStorage.setItem("token", res.data.token);
	//       this.props.navigation.navigate('Setting')
	//       console.log(res)
	//     })
	//     .catch(err => console.log(err))
	//   }

	//   static navigationOptions = {
	//     headerLayoutPreset: 'center',
	//     title: 'Log in',
	//     headerTitleStyle: {
	//       color: 'black',
	//       fontSize: 20,
	//       fontWeight: '400',
	//     },
	//     headerStyle: {
	//         backgroundColor: 'white',
	//     },
	//     // headerLeft: <View></View>
	//   }

	//   handleChange = (key, value) => {
	//     this.setState({
	//       login: {
	//         ...this.state.login,
	//         [key]: value
	//       }
	//     })
	//   }

	//   viewRegister = () => {
	//     this.props.navigation.navigate('Register')
	//   }

	//   render() {
	//     console.log("LOGIN")
	//     return (
	//       <View style={styles.loginContainer}>
	//         <View>
	//           <TextInput
	//            onChangeText={val => this.handleChange('email', val)}
	//            placeholder="Your email"
	//            value={this.state.login.email}
	//            name="email"
	//            />
	//           <TextInput
	//           onChangeText={val => this.handleChange('password', val)}
	//           placeholder="Your password"
	//           value={this.state.login.password}
	//           name="password"
	//           type="password"
	//           secureTextEntry={true}
	//           />
	//           <Button
	//           title="Log in"
	//           onPress={this.handleLogin}
	//           />
	//         </View>

	//          <TouchableOpacity>
	//           <View style={styles.google}>
	//             <Text style={styles.buttonText}>Log in with Google</Text>
	//           </View>
	//         </TouchableOpacity>
	//         <TouchableOpacity>
	//           <View style={styles.facebook}>
	//             <Text style={styles.buttonText}>Log in with Facebook</Text>
	//           </View>
	//         </TouchableOpacity>
	//         <View style={styles.notRegistered}>
	//             <Text>Not registered?</Text>
	//             <TouchableOpacity onPress={() => this.viewRegister()}>
	//             <View>
	//                 <Text>Sign up</Text>
	//             </View>
	//             </TouchableOpacity>
	//         </View>
	//       </View>
	//     );
	//   }
	// }
	state = {
		user: undefined // user has not logged in yet
	};

	// Set up Linking
	componentDidMount() {
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

	// Handle Login with Facebook button tap
	// loginWithFacebook = () => this.openURL('https://localhost:3000/auth/facebook');

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
		if (Platform.OS === 'ios') {
			SafariView.show({
				url: url,
				fromBottom: true
			});
		} else {
			// Or Linking.openURL on Android
			Linking.openURL(url);
		}
	};
	viewJoinChats = () => {
		// AsyncStorage.setItem();
		this.props.navigation.navigate('JoinChat', { user: this.state.user });
	};

	render() {
		const { user } = this.state;
		// console.log(user)
		console.log('login', this.props);
		console.log('loginstate', this.state);
		return (
			<View style={styles.container}>
				{user ? (
					// Show user info if already logged in
					<View style={styles.content}>
						<Text style={styles.header}>
							Welcome {user.first_name}!
						</Text>
						<View style={styles.avatar}>
							<Image
								source={{ uri: user.avatar }}
								style={styles.avatarImage}
							/>
							<Button
								title='Join Chats'
								onPress={this.viewJoinChats}
							/>
						</View>
					</View>
				) : (
					// Show Please log in message if not
					<View style={styles.content}>
						<Text style={styles.header}>Welcome Stranger!</Text>
						<View style={styles.avatar}>
							<Icon
								name='user-circle'
								size={100}
								color='rgba(0,0,0,.09)'
							/>
						</View>
						<Text style={styles.text}>
							Please log in to continue {'\n'}
						</Text>
						{/* Login buttons */}
						<View style={styles.buttons}>
							<Icon.Button
								name='facebook'
								backgroundColor='#3b5998'
								onPress={this.loginWithFacebook}
								{...iconStyles}
							>
								Login with Facebook
							</Icon.Button>
							<Icon.Button
								name='google'
								backgroundColor='#DD4B39'
								onPress={this.loginWithGoogle}
								{...iconStyles}
							>
								Login with Google
							</Icon.Button>
						</View>
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
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		margin: 20
	},
	avatarImage: {
		borderRadius: 50,
		height: 100,
		width: 100
	},
	header: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	text: {
		textAlign: 'center',
		color: '#333',
		marginBottom: 5
	},
	buttons: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		margin: 20,
		marginBottom: 30
	}
});

// const styles = StyleSheet.create({
//   loginContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   google: {
//     height: 50,
//     backgroundColor: '#4285F4',
//     justifyContent: 'center',
//   },
//   facebook: {
//     height: 50,
//     backgroundColor: '#3B5998',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '300',
//   },
//   notRegistered: {
//       margin: 10,
//       alignItems: 'center',
//   }
// });
