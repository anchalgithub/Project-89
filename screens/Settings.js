import React, { Component } from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

export default class Settings extends Component {

constructor(){
super();
this.state = {
emailId:'',
firstName:'',
lastName:'',
address:'',
contact:'',
docId:'',
}
}

getData(){
var user = firebase.auth().currentUser;
var email = user.email

db.collection('users').where('username', '==', email).get()
.then(snapshot=>{
snapshot.forEach(doc=>{
var data = doc.data()
this.setState({
emailId:data.username,
firstName:data.first_Name,
lastName:data.last_Name,
address:data.address,
contact:data.contact,
docId:doc.id
})
})
})
}

updateData(){
db.collection('users').doc(this.state.docId).update({
first_Name:this.state.firstName,
last_Name:this.state.lastName,
address:this.state.address,
contact:this.state.contact,
})
}

componentDidMount(){
this.getData()
}

render(){
return(
<View style = {styles.container}>

<MyHeader title = "Settings" />
<MyHeader title = "Change Your Information" />

<View style ={{flex:1,width:'100%',alignItems: 'center'}}>
<TextInput  style = {styles.formTextInput} placeholder = {"First Name"} maxLength = {8} onChangeText = {(text)=>{
this.setState({firstName:text})
}} value = {this.state.firstName}/>

<TextInput  style = {styles.formTextInput} placeholder = {"Last Name"} maxLength = {8} onChangeText = {(text)=>{
this.setState({lastName:text})
}} value = {this.state.lastName}/>

<TextInput  style = {styles.formTextInput} placeholder = {"Contact"} maxLength = {10} keyboardType = {'numeric'} onChangeText = {(text)=>{
this.setState({contact:text})
}} value = {this.state.contact}/>

<TextInput  style = {styles.formTextInput} placeholder = {"Address"} multiline={true} onChangeText = {(text)=>{
this.setState({address:text})
}} value = {this.state.address}/>

<TextInput  style = {styles.formTextInput} placeholder = {"Email"} keyboardType={'email-address'} onChangeText = {(text)=>{
this.setState({emailId:text})
}}/>

<TouchableOpacity style = {styles.saveButton} onPress = {()=>{this.updateData()}}>
<Text style = {styles.saveButtonText}>Save!</Text>
</TouchableOpacity>

</View>
</View>
)
}
}

const styles = StyleSheet.create({
container:{
flex:1, 

},

formTextInput:{
width:"75%",
height:35,
alignSelf:'center',
borderColor:'#ffab91',
borderRadius:10,
borderWidth:1,
marginTop:20,
padding:10
},

saveButton:{
width:200,
height:40,
alignItems:'center',
justifyContent:'center',
borderWidth:1,
borderRadius:10,
marginTop:30
},
saveButtonText:{
color:'#ff5722',
fontSize:15,
fontWeight:'bold'
},

})