import React from 'react';
import { Text, ScrollView, ActivityIndicator, View } from 'react-native';
import s from '../styles/styles';
import AuthService from '../service/authservice';

export default class TermsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            loading: true
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "Go back"
    });

    async componentDidMount(){       
        let service = new AuthService();
        let data = await service.getTerms();
        if (!data)
        Alert.alert("Something went wrong.", "Error", [{text: 'Well this is awkward.', onPress: () => {}}]);
        else
            await this.setState({content: data.data, loading: false});
    }

    render() {

        if(this.state.loading){
            return(
              <View style={s.container}>   
                <Text h3>Loading...</Text>
                <ActivityIndicator />
              </View>
            )
        }

        return (
            <ScrollView contentContainerStyle={s.scrollContainerPadding}>
                <Text style={s.centeredStandardText}>{this.state.content}</Text>
            </ScrollView>
        )
    }
}