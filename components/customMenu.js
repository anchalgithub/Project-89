import React,{Component} from 'react';
import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config'

export default class customMenu extends Component {

state = {
userId : firebase.auth().currentUser.email,
image : "#",
name : "",
docId: ""
}


selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
   db.collection("users")
    .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
       querySnapshot.forEach((doc) => {
        this.setState({
        name: doc.data().first_name + " " + doc.data().last_name,
          docId: doc.id,
         image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }


render(){
return(
<View style = {{flex:1}}>
<View style = {{flex:0.5, alignItems: "center", backgroundColor: "turquoise"}}>
<Avatar rounded source={{uri: this.state.image,}}size="medium"
onPress={() => this.selectPicture()}
containerStyle={styles.imageContainer}
showEditButton/>
<Text style={{ fontWeight: "100", fontSize: RFValue (20), padding:RFValue(10) }}> {this.state.name}</Text>
</View>

<DrawerItems {...this.props}/>

<View style={{flex:1,justifyContent:'flex-end',paddingBottom:30}}>
<TouchableOpacity style = {styles.container} onPress = {()=>{
this.props.navigation.navigate('WelcomeScreen')
firebase.auth().signOut()
}}>

<Icon name = "logout" type = "antdesign" size = {RFValue(20)} iconStyle = {{paddingLeft: RFValue(10)}}/>

<Text style = {{fontSize:RFValue(15), fontWeight:'bold', color:'black', marginLeft : RFValue(30)}}>Logout!</Text>
</TouchableOpacity>
</View>

</View>
)
}
}

const styles = StyleSheet.create({
container:{
justifyContent:'center',
padding:10,
height:30,
width:'100%'
},
DI:{
flex:1,
backgroundColor:'white'
},
})
