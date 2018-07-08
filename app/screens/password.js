import React from 'react';
import { Button, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Text, Icon } from 'react-native-elements';

export default class PasswordScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        email: ""  
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Go back"
    });

    sendResetToken = async() => {
      let service = new AuthService();
      await this.setState({loading:true});
      let success = await service.sendResetToken(this.state.email);
      if (success) {
        this.props.navigation.navigate('Reset', {email:this.state.email});
        Alert.alert("Reset token has been sent.", "Check your email", [{text: 'OK', onPress: () => {}}]);
      } else {
        Alert.alert("Something went wrong, try again.", "Error", [{text: 'OK', onPress: () => {}}]);
      }
      await this.setState({loading:false});
    }
  
    render() {

      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
            <View style={s.centerContainer}>
                <Text h3 style={s.centeredStandardText}>Send a reset token to your email</Text>
                <Text style={s.standardText}/>
                <TextInput onChangeText={(text)=>this.setState({email:text})} value={this.state.email} placeholder="Email" style={s.entry} />                
                <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => this.sendResetToken()}>  
                    {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='arrow-up' type='font-awesome' /> }
                    <Text style={s.standardButtonText}>Send</Text>
                </TouchableOpacity>
                <Text style={[s.a]} onPress={()=>this.props.navigation.navigate('Reset')}>I already have a token</Text>        
            </View>  
        </ScrollView>
      )
    }
  }
  