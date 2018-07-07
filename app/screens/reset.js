import React from 'react';
import { Button, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Text, Icon } from 'react-native-elements';

export default class ResetScreen extends React.Component {

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
                <Text h4 style={s.centeredStandardText}>Check your email inbox for your token:</Text>                
                <Text style={s.standardText}/>
                <TextInput style={s.entry} placeholder="Fill your reset token here" />
                <Text style={s.entryHeader}>New password</Text>
                <TextInput style={s.entry} placeholder="New password" />
                <Text style={s.entryHeader}>Confirm new password</Text>
                <TextInput style={s.entry} placeholder="Confirm new password" />
                <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => {}}>  
                    {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='key' type='font-awesome' /> }
                    <Text style={s.standardButtonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      )
    }
  }
  