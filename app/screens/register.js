import React from 'react';
import { TouchableOpacity, TextInput, View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import s from '../styles/styles';
import { Icon, Text } from 'react-native-elements';
import AuthService from '../service/authservice';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { iOSUIKit } from 'react-native-typography'

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            password: "",
            fullName: "",
            confirm: "",
            email: ""
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "Go back"
    });

    validate = async() => {
        return {fullName:this.state.fullName, email: this.state.email, password: this.state.password, confirm: this.state.confirm}
    }

    tryRegister = async() => {
        await this.setState({loading: true});
        let service = new AuthService();
        let success = await service.register(await this.validate());
        await this.setState({loading: false});
        if (success) {
            this.props.navigation.navigate('Login');
            Alert.alert("Verification email has been sent.", "Check your email", [{text: 'I certainly will', onPress: () => {}}]);
        } else {
            Alert.alert("Something went wrong. Try again later!", "Oops", [{text: 'Got it', onPress: () => {}}]);              
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={s.scrollContainer}>
                <View style={{flex:1, alignItems:"center", padding:10}}>
                    <View style={{flex:1, padding:20, alignItems:"center", justifyContent:"flex-start"}}>
                        <Text h4>All fields are required</Text>
                        <Sae label={'Email Address'} iconClass={FontAwesomeIcon} iconName={'pencil'}
                            iconColor={'black'} autoCapitalize={'none'} autoCorrect={false} 
                            onChangeText={(text)=>this.setState({email:text})} value={this.state.email}
                        />
                        <Sae label={'Full name'} iconClass={FontAwesomeIcon} iconName={'pencil'}
                            iconColor={'black'} autoCapitalize={'none'} autoCorrect={false} 
                            onChangeText={(text)=>this.setState({fullName:text})} value={this.state.fullName}
                        />
                        <Sae label={'Password'} iconClass={FontAwesomeIcon} iconName={'pencil'}
                            iconColor={'black'} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true}
                            onChangeText={(text)=>this.setState({password:text})} value={this.state.password}
                        />
                        <Sae label={'Confirm password'} iconClass={FontAwesomeIcon} iconName={'pencil'}
                            iconColor={'black'} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true}
                            onChangeText={(text)=>this.setState({confirm:text})} value={this.state.confirm}
                        />
                    </View>                    
                    
                    <View style={{flex:1, alignItems:"center", justifyContent:"space-between"}}>
                        <View style={s.rowContainer}>
                            <Text>By creating an account you agree with the</Text>                    
                        </View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Terms') }>
                            <Text style={[s.a, iOSUIKit.bodyEmphasized]}> Terms and Conditions </Text>
                        </TouchableOpacity>
                        <Text>and the</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Privacy') }>
                            <Text style={[s.a, iOSUIKit.bodyEmphasized]}> Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, alignItems:"center", justifyContent:"flex-end"}}>
                        <TouchableOpacity disabled={this.state.loading} style={[s.standardButton, s.buttonContainer]} onPress={() => { this.tryRegister()}}>  
                            {this.state.loading && <ActivityIndicator animating={true} color="white" /> || <Icon name='user' type='font-awesome' /> }
                            <Text style={s.standardButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}