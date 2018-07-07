import React from 'react';
import { View, Picker, Button, Image, ScrollView, TextInput, TouchableOpacity, CheckBox, ActivityIndicator, Alert } from 'react-native';
import { ImagePicker } from 'expo';
import s from '../styles/styles';
import { Icon } from 'react-native-elements'
import WegpiraatService from '../service/wegpiraatservice';
import { Text } from 'react-native-elements'

export default class UploadScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          title: "",
          country: "",
          uri: "",
          upload: false,
          uploading: false
      };
    }

    choosePic = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      await this.setState({uri: result.uri, upload:true});     
    };

    upload = async() => {
      await this.setState({uploading:true});
      let data = {
        pic: this.state.uri,
        title: this.state.title,
        country: this.state.country
      };
      let service = new WegpiraatService();
      let resp = await service.upload(data);
      if (resp) {
          await this.setState({uploading:false, upload:false, title:"", uri:""});
          this.props.navigation.navigate('Posts', {filterType: 'profile', filter:'posts'})
          Alert.alert("You have uploaded a Wegpiraat", "New Wegpiraat!", [{text: 'OK', onPress: () => {}}]);
      }
    }
    
    render() {
    
      return (
        <ScrollView contentContainerStyle={s.scrollContainer}>
          <View style={s.container}>
            <Text h3 style={s.centeredStandardText}>Upload a Wegpiraat</Text> 
            <Text style={s.standardText} />
            <TextInput style={s.entry} onChangeText={(text)=>this.setState({title:text})} value={this.state.title} maxLength={40} placeholder="Title of post"/>
            <Picker style={{width:250}}
              selectedValue={this.state.language}
              onValueChange={(val, index) => this.setState({country: val})}>
              <Picker.Item label="Belgium" value="BE" />
              <Picker.Item label="Netherlands" value="NL" />
              <Picker.Item label="France" value="FR" />
              <Picker.Item label="Germany" value="GE" />
            </Picker>
            <Text style={s.standardText} />
            <TouchableOpacity style={s.uploadButton} onPress={()=> this.choosePic() }>
              <View style={s.rowContainer}>
                <CheckBox disabled={true} value={this.state.upload}/>            
                <Text style={s.standardButtonText}>Choose picture</Text>
              </View>
            </TouchableOpacity>
            <Text style={s.standardText}/>
            <View style={{width:250}}><Text style={s.centeredStandardText}>By uploading this image I confirm that it applies to the Wegpiraat Terms</Text></View>                                      
            <Text style={s.standardText}/>
            <TouchableOpacity style={[s.standardButton, s.buttonContainer]} onPress={()=> this.upload() }>
              {this.state.uploading && <ActivityIndicator animating={true} color="white" /> || <Icon name='arrow-up' type='font-awesome' /> }
              <Text style={s.standardButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>   
      )
    }
  }