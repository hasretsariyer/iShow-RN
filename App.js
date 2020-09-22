import React from 'react';
import { Text, TextInput, View, Button, StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayScreen from './PlayScreen';
import PushScreen from './PushScreen';
import { NodeMediaClient } from 'react-native-nodemediaclient';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
      {
        title: "Cool Photo App Camera And Microphone Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      playserver: "rtmp://192.168.0.2/live/",
      pushserver: "rtmp://192.168.0.2/live/",
      stream: 'demo_' + (Math.floor(Math.random() * (999 - 100)) + 100),
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      requestCameraPermission()
      NodeMediaClient.setLicense("ZjJhNTIzODAtNGU0ZDUzMjEtY24ubm9kZW1lZGlhLmlTaG93Uk4=-syY8+2t7utLZAKLDs1SaD0EOPC9ft3Zq2SncV7gvMg1vnuEGf6QYMDpiSWj0A7xLhbn62BJHJvi1sGLPKgRflHnT6ysuUfQM7W8fgMA75gbqSCMu4vVqssX+yWCeEIbb5uJ/WHYjSvjSOa0W69TwHB5OSxf0bgAMFo8oJjiSCG16CKRuCHeNQBF8KRh+PYuRDnd3pBmnvE8QyWMDpvtEJd1fSYrGLdwgeO8F4gBKoeXyk2/rpEHKDmm/MKAlHli0/mpz8ejlL6ifAw6rB0TqXfpUMuo6vXpx0bjV7G5wxnOMB5pubn91UWrpRoUhPjadOFiket1DmqPsZFiQGnv0iA==");
    }else if(Platform.OS === 'ios') {
      NodeMediaClient.setLicense("ZjJhNTIzODAtNGU0ZDUzMjEtY24ubm9kZW1lZGlhLmlTaG93Uk4=-CQ2OZOwxN8PmjPnqCO5jINgwytHewwXJgZ4OhYL0Hnh6TDjQJDL/ebvCV34cuN/LPn42+vEbKxVAhqv492V3RmNu2aPKL6+AlYtPNf1eWkFLYa9Q/5GwU22s98fKA6YB5IMQyG30VptasVRctQeIee/lhmGClkvo9Ib+C8rLai6HHzWst/WpfWJeJs9OYgosNcuS+VmydGAy/CkUkT4G2ew80q239GRSJ7g7KREcwgiPrGqPNiDFqtG1T08JD9SXELerQqIp71qaPRMjCDSk26L0Tg22z4/EKcp713bZGs2AnE3ye3RbsLdMfNNUU0j0Qc/PQFNpczkilbHwMDoRaA==");
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', padding: 24, backgroundColor: '#333' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <Text style={{ color: '#fff', fontSize: 48, marginTop: 36, marginBottom: 36 }}>iShow</Text>
        <Text style={{ color: '#fff', fontSize: 18 }}>Please enter a stream name.</Text>
        <TextInput
          style={{ color: '#fff', height: 40, padding: 8 }}
          placeholder="Stream name must be 4 or more characters."
          placeholderTextColor='#555'
          value={this.state.stream}
          onChangeText={(stream) => this.setState({ stream })}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            onPress={() => this.props.navigation.navigate('Play', { 'playserver': this.state.playserver, 'stream': this.state.stream })}
            title="I Join"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Push', { 'pushserver': this.state.pushserver, 'stream': this.state.stream })}
            title="I Show"
          />
        </View>

      </View>
    );
  }
}

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="none"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'iShow' }}
        />
        <Stack.Screen
          name="Play"
          component={PlayScreen}
        />
        <Stack.Screen
          name="Push"
          component={PushScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
