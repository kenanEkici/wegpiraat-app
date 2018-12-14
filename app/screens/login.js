import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { Fumi } from 'react-native-textinput-effects';
import { iOSUIKit } from 'react-native-typography';
import Modal from 'react-native-modal';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      loading: false,
      username: "",
      password: ""
    }
  }

  static navigationOptions = {
    header: null
  };

  tryLogin = async () => {

    await this.setState({ loading: true });
    let service = new AuthService();
    let success = await service.login(this.state.username, this.state.password);
    await this.setState({ loading: false });
    if (success) {
      this.setState({ loginError: false });
      this.props.navigation.navigate('App');
    } else {
      this.setState({ loginError: true });
    }
  }

  render() {

    return (

      <ScrollView contentContainerStyle={s.scrollContainer}>
        {/* Header */}
        <View style={{ flex: 1, alignItems: 'center', flexDirection: "column" }}>
          {/* {
            <Image style={{ backgroundColor: '#ccc', flex: 1, position: 'absolute', width: '100%', height: '100%'              
            }} source={require('../public/road.jpg')} />
          } */}

          {/* Header */}
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center", paddingTop: 40, justifyContent: "flex-start" }}>
            <Image style={{ width: 300, height: 150, borderRadius: 12 }} source={require('../public/sign.png')} />
          </View>


          {/* Footer */}
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: 40 }}>

            <View style={{ margin: 10, height: 70, width: 300 }}>
              {/* You might have to change Fumi.js in node modules if it's not behaving correctly  */}
              <Fumi onChangeText={(text) => this.setState({ username: text })} value={this.state.username} label={'Email address'} iconClass={FontAwesome} iconName={'user'} iconColor={'black'} iconSize={30} />
            </View>

            <View style={{ margin: 10, height: 70, width: 300 }}>
              <Fumi onChangeText={(text) => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} label={'Password'} iconClass={FontAwesome} iconName={'lock'} iconColor={'black'} iconSize={30} />
            </View>

            <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => { this.tryLogin() }}>
              {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <FontAwesome name='check' color="#dfe6e9" />}
              <Text style={s.standardButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: "center", padding: 30, backgroundColor: "#ecf0f1" }}>
          <Text style={[iOSUIKit.subheadEmphasized, s.standardText]}>New to Wegpiraat?</Text>
          <Text style={[s.a, iOSUIKit.bodyEmphasized]} onPress={() => this.props.navigation.navigate('Register')}>Create an account.</Text>
        </View>

        <Modal
          onBackButtonPress={() => this.setState({ loginError: false })}
          onBackdropPress={() => this.setState({ loginError: false })}
          style={{ justifyContent: "flex-end", margin: 0 }}
          visible={this.state.loginError} >
          <View style={{ padding: 20, backgroundColor: "#c0392b", alignItems: "center" }}>
            <Text style={iOSUIKit.body}>Wrong password or email</Text>
            <Text style={[s.a, iOSUIKit.bodyEmphasized, s.margin]} onPress={async () => { await this.setState({ loginError: false }); await this.props.navigation.navigate('Password');}}>I forgot my password</Text>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}
