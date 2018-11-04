import React from 'react';
import {
  View, Button, Image, TouchableHighlight, Alert,
  ActivityIndicator, FlatList, Animated, TouchableOpacity, TextInput, ScrollView, Picker
} from 'react-native';
import WegpiraatService from '../service/wegpiraatservice';
import s from '../styles/styles';
import con from '../configuration/settings';
import Modal from 'react-native-modal';
import { Text, SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'

export default class FeedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.service = new WegpiraatService();
    this.state = {
      plate: "",
      loading: false,
      query: "Find a Roadhog",
      searchComplete: false,
      noResult: false,
      comments: [],
      comment: "",
      data:null,
      modalVisible: false,
      countryHog: null,
      creating: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Go back"
  });

  header = () => {
    return (
      <View style={{ padding: 20 }}>
        <View style={{paddingLeft: 10, paddingRight:10, backgroundColor:"#e9ece5",flexDirection:"row", alignItems:"center", justifyContent:"space-between",}}>
          <Text>Country: </Text>
          <Picker style={{ width: 140 }} selectedValue={this.state.countryFilter}
            onValueChange={(val, index) => this.filterQuery(val)}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Belgium" value="BE" />
            <Picker.Item label="Netherlands" value="NL" />
            <Picker.Item label="Germany" value="DE" />
            <Picker.Item label="France" value="FR" />
          </Picker>
        </View>
      </View>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  createWegpiraat = async () => {
    await this.setState({creating: true, loading:true});
    let data = {
      plate: this.state.plate,
      country: this.state.countryHog
    };
    let resp = await this.service.upload(data);
    if (resp) {      
      let resp2 = await this.service.comment(resp._id, this.state.comment);
      await this.query(resp.plate);
      //await this.setState({data: [resp], noResult: false, searchComplete:true});
    } else {
      Alert.alert("Something went wrong. Try again later.", [{text: 'OK', onPress: () => {}}]); 
    }
    await this.setState({creating: false, modalVisible:false, comment:""});
  }

  comment = async (item) => {
    await this.setState({ commenting: true });
    let resp = await this.service.comment(item._id, this.state.comment);
    if (resp) {      
      let data = this.state.data;
      data.forEach((el) => {
        if (el._id == item._id) {
          el.comments.unshift(resp);
        }
      });
      
      await this.setState({ comment: "", commenting: false, data:data });
    }
  }

  query = async (plate) => {
    await this.setState({ plate: plate, query: "Results for: " + plate, searchComplete: false, loading: true });
    if (plate == "") 
        await this.setState({query:"Find a Roadhog", noResult: false, loading: false});
    else {
      let data = await this.service.getWegpiratenByPlate(plate, 1);
      if (!data || data == undefined || data.docs.length == 0) {      
        await this.setState({ noResult: true, searchComplete: false });
      } else {
        await this.setState({ data: data.docs, noResult: false, searchComplete: true });
      }
      await this.setState({ loading: false });
    }
  }

  changeCountry = async (val) => {
    await this.setState({countryHog: val});
  }


  render() {

    return (
      <View style={s.feedContainer}>

        <View style={s.containerNoPadding}>      
          <Text style={s.h1}>
            {this.state.query}
          </Text>
        </View>

        <SearchBar
          containerStyle={{ width: "100%" }}
          autoCorrect={false}
          onChangeText={(text) => this.query(text)}
          clearIcon={{color:'red'}}
          inputStyle={{fontSize:24, textAlign: "center"}}
          showLoadingIcon={this.state.searching}
          searchIcon
          placeholder='Search a platenumber'>
        </SearchBar>

        {this.state.searchComplete &&
            <FlatList
            style={{flex:1}}
            contentContainerStyle={{flexGrow:1, padding:20, paddingBottom:80}}
            onRefresh={() => this.query(this.state.plate)}
            refreshing={this.state.loading}
            data={this.state.data}
            renderItem={({ item }) => {
              return (
                <View style={{marginBottom:70}}>
                  <Text style={{ width:500}}/>

                  <View style={{alignItems:"center"}}>                    
                    <Text h3 style={s.centeredStandardText}>{item.plate}</Text>
                    <Image style={{height:130, width:"100%"}} source={require('../public/car.png')}/>
                    <Text style={s.centeredStandardText}>{item.createdAt}</Text> 
                  </View>         

                  <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:20, marginTop:20}}>
                    <TextInput style={s.multiline} placeholder="Comment here (max. 80 characters)"
                      onChangeText={(text) => this.setState({ comment: text })} value={this.state.comment} maxLength={80} multiline={true} />
                    <TouchableOpacity style={s.optionsButton} onPress={() => { this.comment(item) }}>
                      {this.state.commenting && <ActivityIndicator animating={true} color="black" />}
                      {!this.state.commenting && <Icon name="send"/>}
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={item.comments}
                    renderItem={({ item }) => {
                      return (
                        <View style={s.commentContainer}>
                          <Text style={s.commentHeader}>{item.postedBy}</Text>
                          <Text style={s.commentBody}>{item.commentData}</Text>
                        </View>
                      )
                    }} />
                </View>
              )
            }
            }
            ListHeaderComponent={this.header}>
          </FlatList>
        }

        {this.state.loading && <ActivityIndicator size="large" /> }    
        {this.state.noResult && !this.state.loading &&
          <View style={{ marginTop: 30 }}>       
            <View>
              <Text style={s.centeredStandardText}>Road hog not found.</Text>
              <Text style={[s.a, s.centeredStandardText]} onPress={() => this.setModalVisible(!this.state.modalVisible)}>Be the first to comment.</Text>
            </View>          
          </View>
        }

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <ScrollView>
            <View style={s.scrollContainerCenter}>
                <Text h2 style={{marginBottom:40}}>Add <Text>{this.state.plate}</Text></Text> 
                <View style={{paddingLeft: 10, paddingRight:10, marginBottom:50, backgroundColor:"#e9ece5",flexDirection:"row", alignItems:"center", justifyContent:"space-between",}}>
                  <Text>Country: </Text>
                  <Picker style={{ width: 140 }} onValueChange={(val, index) => this.changeCountry(val)} selectedValue={this.state.countryHog}>
                    <Picker.Item label="Belgium" value="BE" />
                    <Picker.Item label="Netherlands" value="NL" />
                    <Picker.Item label="Germany" value="DE" />
                    <Picker.Item label="France" value="FR" />
                  </Picker>
                </View>
                <Image style={{height:100, width:"100%", marginBottom:60}} source={require('../public/car.png')}/>
                <TextInput style={s.multiline} placeholder="Comment here (max. 80 characters)"
                        onChangeText={(text) => this.setState({ comment: text })} value={this.state.comment} maxLength={80} multiline={true} />
                <View style={{flexDirection:"row", marginTop:20, alignItems:"center", justifyContent:"space-between",}}>
                  <TouchableOpacity disabled={this.state.creating} style={[s.standardButton2, s.buttonContainer]} onPress={() => { this.createWegpiraat()}}>  
                    {this.state.creating && <ActivityIndicator animating={true} color="white" /> || <Icon name='add' /> }
                    <Text style={s.standardButtonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={[s.standardButton2, s.buttonContainer]} onPress={() => { this.setState({modalVisible:false})}}>  
                    <Icon name='close' />
                    <Text style={s.standardButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View> 
              </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}