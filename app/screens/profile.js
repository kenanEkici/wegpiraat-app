import React from 'react';
import { Button, View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import AuthService from '../service/authservice';
import s from '../styles/styles';
import { Icon } from 'react-native-elements'

export default class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          service: new AuthService(),
          username: null,
          email: null,
          filter: ""
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
        await this.setState({username:user.username});
        await this.setState({email:user.email});
    }

    render() {

        return (
            <ScrollView contentContainerStyle={s.scrollContainerCenter}>
                <Image style={s.profile} source={require('../public/profile.png')}/>
                <Text style={s.h2}>{this.state.username}</Text>
                <Text style={s.h3}>{this.state.email}</Text>
                <View style={s.profileCard}>
                    <TouchableOpacity style={[s.profileButton]} onPress={() => this.props.navigation.navigate('Posts', {filterType: 'profile', filter:'posts'})}>
                        <Text style={s.profileButtonText}>Posts</Text>
                        <Icon name='car' type='font-awesome' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.profileButton]} onPress={() => this.props.navigation.navigate('Posts', {filterType: 'profile', filter:'likes'})}>
                        <Text style={s.profileButtonText}>Likes</Text>
                        <Icon name='heart' type='font-awesome' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.profileButton]} onPress={() => this.props.navigation.navigate('Posts', {filterType: 'profile', filter:'comments'})}>
                        <Text style={s.profileButtonText}>Comments</Text>
                        <Icon name='comment' type='font-awesome' />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={() => this.props.navigation.navigate('Settings')}>  
                        <Icon name='wrench' type='font-awesome' />                      
                        <Text style={s.standardButtonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={() => this.logout()}>
                        <Icon name='user' type='font-awesome' />
                        <Text style={s.standardButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}