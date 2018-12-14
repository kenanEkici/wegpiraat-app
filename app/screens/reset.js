import React from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Text } from 'react-native-elements';
import { Sae } from 'react-native-textinput-effects';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class ResetScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: "",
      email: this.props.navigation.getParam('email', ''),
      password: "",
      confirm: ""
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Go back"
  });

  resetPassword = async () => {
    let service = new AuthService();
    await this.setState({ loading: true });
    let success = await service.resetPassword(this.state.token, this.state.email, this.state.password, this.state.confirm);
    if (success) {
      this.props.navigation.navigate('Login');
      Alert.alert("Password has been reset.", "Success", [{ text: 'OK', onPress: () => { } }]);
    } else {
      Alert.alert("Something went wrong, try again.", "Error", [{ text: 'OK', onPress: () => { } }]);
    }
    await this.setState({ loading: false });
  }

  render() {

    return (
      <ScrollView contentContainerStyle={s.scrollContainer}>
        <View style={s.centerContainer}>
          <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "flex-start" }}>
            <Text h4 style={s.centeredStandardText}>Check your email inbox for your token:</Text>

            <Sae label={'Reset token'} iconClass={FontAwesome} iconName={'pencil'}
              iconColor={'black'} autoCapitalize={'none'} autoCorrect={false}
              onChangeText={(text) => this.setState({ token: text })} value={this.state.token}
            />
            <Sae label={'Email address'} iconClass={FontAwesome} iconName={'pencil'}
              iconColor={'black'} autoCapitalize={'none'} autoCorrect={false}
              onChangeText={(text) => this.setState({ email: text })} value={this.state.email}
            />

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width:"90%" }} ></View>

            <Sae label={'New Password'} iconClass={FontAwesome} iconName={'pencil'}
              iconColor={'black'} autoCapitalize={'none'} autoCorrect={false}
              onChangeText={(text) => this.setState({ password: text })} value={this.state.password}
            />

            <Sae label={'Confirm New Password'} iconClass={FontAwesome} iconName={'pencil'}
              iconColor={'black'} autoCapitalize={'none'} autoCorrect={false}
              onChangeText={(text) => this.setState({ confirm: text })} value={this.state.confirm}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
            <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => this.resetPassword()}>
              {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <FontAwesome name='key' />}
              <Text style={s.standardButtonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}
