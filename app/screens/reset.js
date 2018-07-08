import React from 'react';
import { Button, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Text, Icon } from 'react-native-elements';

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

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Go back"
    });

    resetPassword = async() => {
      let service = new AuthService();
      await this.setState({loading:true});
      let success = await service.resetPassword(this.state.token, this.state.email, this.state.password, this.state.confirm);
      if (success) {
        this.props.navigation.navigate('Login');
        Alert.alert("Password has been reset.", "Success", [{text: 'OK', onPress: () => {}}]);
      } else {
        Alert.alert("Something went wrong, try again.", "Error", [{text: 'OK', onPress: () => {}}]);
      }
      await this.setState({loading:false});
    }
  
    render() {

      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>            
            <View style={s.centerContainer}>
                <Text h4 style={s.centeredStandardText}>Check your email inbox for your token:</Text>                
                <Text style={s.standardText}/>
                <TextInput style={s.entry} onChangeText={(text)=>this.setState({token:text})} value={this.state.token} placeholder="Fill your reset token here" />
                <TextInput style={s.entry} onChangeText={(text)=>this.setState({email:text})} value={this.state.email} placeholder="Email address" />
                <Text style={s.entryHeader}>New password</Text>
                <TextInput style={s.entry} onChangeText={(text)=>this.setState({password:text})} value={this.state.password} placeholder="New password" />
                <Text style={s.entryHeader}>Confirm new password</Text>
                <TextInput style={s.entry} onChangeText={(text)=>this.setState({confirm:text})} value={this.state.confirm} placeholder="Confirm new password" />
                <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => this.resetPassword()}>  
                    {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='key' type='font-awesome' /> }
                    <Text style={s.standardButtonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      )
    }
  }
  