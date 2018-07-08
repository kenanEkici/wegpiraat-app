import React from 'react';
import { Text, Button, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import Modal from 'react-native-modal';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Icon } from 'react-native-elements'

export default class LoginScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loginError: "",
        loading: false,
        username: "kenan.ekici@outlook.com",
        password: "kenan123"
      }
    }

    static navigationOptions = {
      header: null
    };

    tryLogin = async () => {  

      await this.setState({loading: true});
      let service = new AuthService();
      let success = await service.login(this.state.username, this.state.password);
      await this.setState({loading: false});
      if (success) {
          this.props.navigation.navigate('App');
      } else {
          this.setState({loginError: "Wrong email or password. Try again."});                
      }
    }
  
    render() {

      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
          <View style={s.centerContainer}>
            <Text style={s.h1}>Login to Wegpiraat</Text>
            <Image style={{height:150, width:230}} source={require('../public/login.png')}/>
            <Text style={[s.errorMessage]}>{this.state.loginError}</Text>
            <TextInput onChangeText={(text)=>this.setState({username:text})} value={this.state.username} style={s.entry} placeholder="Email" />
            <TextInput onChangeText={(text)=>this.setState({password:text})} value={this.state.password} secureTextEntry={true} style={s.entry} placeholder="Password"/>     
            <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => { this.tryLogin()}}>  
                {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='check' type='font-awesome' /> }
                <Text style={s.standardButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={[s.a]} onPress={()=>this.props.navigation.navigate('Password')}>I forgot my password</Text>        
          </View>

          <View style={[s.stretchContainer, s.smallShadow]}>
            <Text style={[s.standardText]}>New to Wegpiraat?</Text> 
            <Text style={[s.a]} onPress={()=>this.props.navigation.navigate('Register')}>Create an account.</Text>  
          </View>

        </ScrollView>
      )
    }
  }
  