import React from 'react';
import { Text, TouchableOpacity, Image, TextInput, View, ScrollView, CheckBox, ActivityIndicator} from 'react-native';
import s from '../styles/styles';
import { Icon } from 'react-native-elements';
import AuthService from '../service/authservice';

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            username: "kenanekici",
            password: "Kenan1997",
            confirm: "Kenan1997",
            email: "kenan.anonymous@outlook.com"
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "Go back"
    });

    validate = async() => {
        return {username: this.state.username, email: this.state.email, password: this.state.password, confirm: this.state.confirm}
    }

    tryRegister = async() => {
        await this.setState({loading: true});
        let service = new AuthService();
        let success = await service.register(await this.validate());
        await this.setState({loading: false});
        if (success) {
            this.props.navigation.navigate('Login');
        } else {
            this.setState({error: "Something went wrong, please try again."});                
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={s.container}>
                <Text style={s.h2}>* All fields are required</Text>
                <Text style={s.standardText}/>
                <Text style={[s.errorMessage]}>{this.state.error}</Text>
                <TextInput onChangeText={(text)=>this.setState({email:text})} value={this.state.email} style={s.entry} placeholder="Email" />
                <TextInput onChangeText={(text)=>this.setState({username:text})} value={this.state.username} style={s.entry} placeholder="Username" />
                <TextInput onChangeText={(text)=>this.setState({password:text})} value={this.state.password} style={s.entry} placeholder="Password" />
                <TextInput onChangeText={(text)=>this.setState({confirm:text})} value={this.state.confirm} style={s.entry} placeholder="Confirm Password" />                    
                <View style={s.rowContainer}>
                    <CheckBox/>
                    <Text>I have read the </Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack() }>
                        <Text style={s.a}>Wegpiraat Terms.</Text>
                    </TouchableOpacity>
                </View>
                <Text style={s.standardText}/>
                <Text style={s.standardText}/>
                <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => { this.tryRegister()}}>  
                    {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='user' type='font-awesome' /> }
                    <Text style={s.standardButtonText}>Create Account</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}