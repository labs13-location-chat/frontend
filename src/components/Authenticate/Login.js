import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Image,
	Linking,
} from 'react-native';

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			nickname: '',
			gfID: undefined
		};
	}

	// componentDidMount = () => {
	// 	// Event listener to handle OAuth url
	// 	Linking.addEventListener('url', this.props.screenProps.handleOpenURL);
	// 	Linking.getInitialURL().then(url => {
	// 		if (url) {
	// 			this.props.screenProps.handleOpenURL({ url });
	// 		}
	// 	});
	// }

	componentWillUnmount() {
		Linking.removeEventListener('url', this.props.screenProps.handleOpenURL);
	}

	

	render() {
		return (
			<View style={styles.container}>
					<View style={styles.content}>
						<Image source={require('./CMLogo.png')} />

						{/* Login buttons */}

						<View style={styles.header}>
							<Text style={styles.headerText}>
								Welcome to chat maps!
							</Text>
						</View>
						<TouchableOpacity
							onPress={this.props.screenProps.loginWithGoogle}
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
							onPress={this.props.screenProps.loginWithFacebook}
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
