import React from 'react';
import { Button, View, ScrollView, Image, TouchableOpacity, TouchableHighlight, Text, Modal} from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Icon } from 'react-native-elements'

export default class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          service: new AuthService(),
          email: null,
          fullName: ""
        } 
    }

    static navigationOptions = {
        header: null
    };

    async componentDidMount() {
        await this.getData();
    }

    async logout() {
        await this.state.service.logout();
        this.props.navigation.navigate('Auth');
    }

    async getData() {
        let user = await this.state.service.getUser();
        await this.setState({username:user.fullName});
        await this.setState({email:user.email});
    }

    render() {

        return (
            <ScrollView contentContainerStyle={s.scrollContainerCenter}>
           
                <View style={{alignItems:"center", borderRadius:6, backgroundColor:"white", width:250, padding:20}}>
                    <Image style={s.profile} source={require('../public/profile.png')}/>
                    <Text style={s.h2}>{this.state.fullName}</Text>
                    <Text style={s.h3}>{this.state.email}</Text>
                </View>
                
                <View style={{flex:1, justifyContent:"center"}}>
                    <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={() => this.props.navigation.navigate('Settings')}>  
                        <Icon name='wrench' type='font-awesome' />
                        <Text style={s.standardButtonText}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={() => this.logout()}>
                        <Icon name='user' type='font-awesome' />
                        <Text style={s.standardButtonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}