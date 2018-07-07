import React from 'react';
import { Button, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Text, Icon } from 'react-native-elements';

export default class PasswordScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: false      
      }
    }

    static navigationOptions = ({navigation}) => ({
      headerTitle: "Go back"
    });
  
    render() {

      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
            <View style={s.centerContainer}>
                <Text h3 style={s.centeredStandardText}>Send a reset token to your email</Text>
                <Text style={s.standardText}/>
                <TextInput placeholder="Email" style={s.entry} />                
                <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => {}}>  
                    {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='arrow-up' type='font-awesome' /> }
                    <Text style={s.standardButtonText}>Send</Text>
                </TouchableOpacity>
                <Text style={[s.a]} onPress={()=>this.props.navigation.navigate('Reset')}>I already have a token</Text>        
            </View>  
        </ScrollView>
      )
    }
  }
  