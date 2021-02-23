import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class Exchange extends Component {

constructor(){
super()
this.state = {
userName: firebase.auth().currentUser.email,
itemName :'',
description :'',
requestedItemName :"",
exchangeId:"",
itemStatus:"",
docId:"",
currencyCode:""
}
}

createUniqueId(){
return Math.random().toString(36).substring(7);
}
addItem = async (itemName, description)=>{
var userName = this.state.userName;
exchangeId = this.createUniqueId();
db.collection("exchange_requests").add({
"username" : userName,
"item_Name" : itemName,
"description" : description,
"exchangeId" : exchangeId,
"item_status" :"requested",
"date":firebase.firestore.FieldValue.serverTimestamp()
})

await this.getExchangeRequest()
db.collection('users').where("username", "==", userName).get().then()
.then((snapshot)=>{
snapshot.forEach((doc)=>{
db.collection('users').doc(doc.id).update({
IsExchangeRequestActive:true
})
})
})

this.setState({
itemName:'',
description:''
})
this.setState({
itemName:'',
description:''
})
return Alert.alert ('Item ready to exchange.'), ' ', [{text:'Okay', onPress:()=>{
this.props.navigation.navigate('Home')
}}]
}

getIsExchangeRequestActive(){
db.collection('users').where('username', '==', this.state.userName)
.onSnapshot(querySnapshot=>{
querySnapshot.forEach(doc=>{
this.setState({
IsExchangeRequestActive:doc.date().IsExchangeRequestActive,
userDocId : doc.id,
currencyCode : doc.data().currencyCode
})
})
})
}

getExchangeRequest=()=>{
var exchangeRequest = db.collection('exchange_requests').where
('username', '==', this.state.userName).get()
.then((snapshot)=>{
snapshot.forEach((doc)=>{
if(doc.data().item_status!=="recieved"){
this.setState({
exchangeId:doc.data().exchangeId,
requestedItemName:doc.data().item_name,
itemStatus:doc.data().item_status,
docId :doc.id
})
}
})
})
}

getData(){
fetch ("http://data.fixer.io/api/latest?access_key=1f7dd48123a05ae588283b5e13fae944&format=1").then(response=>{
return response.json();
}).then(responseData=>{
var currencyCode = this.state.currencyCode
var currency = responseData.rates.INR
var values = 69/currency
})
}



componentDidMount(){
this.getIsExchangeRequestActive(
this.getExchangeRequest()
)
}

receivedItem = (itemName)=>{
var userId = this.state.userName
var exchangeId = this.state.exchangeId
db.collection('received_items').add({
"user_id" : userId,
"item_name" : itemName,
"exchange_id" : exchangeId,
"itemStatus" : "received"
})
}

updateExchangeRequestStatus = ()=>{
db.collection('requested_requests').doc(this.state.docId).update({
item_status:'recieved'
})
db.collection('users').where('username', '==', this.state.userName).get()
.then ((snapshot)=>{
snapshot.forEach((doc)=>{
db.collection('users').doc(doc.id).update({
IsExchangeRequestActive:false
})
})
})
}

sendNotification=()=>{
db.collection('users').where('username', '==', this.state.userName).get()
.then((snapshot)=>{snapshot.forEach((doc)=>{
var name = doc.date.first_name
var lastName = doc.data().last_name

db.collection('all_notifications').where('exchangeId', '==', this.state.exchangeId).get()
.then((snapshot)=>{
snapshot.forEach((doc)=>{
var donorId = doc.data().donor_id
var bookName = doc.data().item_name

db.collection('all_notifications').add({
"targeted_user_id" : donorId,
"message" : name + "" +lastName + "has received the item " + itemName,
"notification_status" : "unread",
"item_name" : itemName
})
})
})
})
})
}


render(){
if(this.state.IsExchangeRequestActive===true){
return(
<View style = {{flex:1,justifyContent:'center'}}>
<View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
<Text>Item Name:</Text>
<Text>{this.state.requestedItemName}</Text>
</View>
    
<View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
<Text> Item Status: </Text>
<Text>{this.state.itemStatus}</Text>
</View>

<TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
onPress={()=>{this.sendNotification()
this.updateExchangeRequestStatus();
this.receivedItem(this.state.requestedItemName)
}}>
<Text>I received the item!</Text>
</TouchableOpacity>
</View>
)
} else {
return(
<View style = {{flex:1}}>

<MyHeader title = "Enter an Item" />
<KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
<TextInput style = {styles.textInput1}placeholder = {"Item Name"} numberOfLines={5} onChangeText = {(text)=>{this.setState({itemName:text})}} value = {this.state.itemName}  />
<TextInput style = {styles.textInput2} placeholder = {"Item Description"} multiline numberOfLines={80} onChangeText = {(text)=>{this.setState({description:text})}} value = {this.state.description}/>


<TouchableOpacity style = {styles.title} onPress = {()=>{this.addItem(this.state.itemName, this.state.description)}}>
<Text style = {styles.titleText}> Enter an Item </Text>
</TouchableOpacity>

</KeyboardAvoidingView>
</View>
)
}
}
}


const styles = StyleSheet.create ({
textInput1:{
borderWidth:2,
width:500,
height:50,
marginLeft:50,
marginTop:20,
borderRadius:10,
borderColor:'pink'
},

textInput2:{
borderWidth:2,
width:500,
height:250,
marginLeft:50,
marginTop:30,
borderRadius:10,
borderColor:'pink'
},

title : {
borderWidth:5,
borderColor:'orange',
width:200,
backgroundColor:'orange',
borderRadius:10,
marginLeft:50,
marginTop:40
},

titleText:{
fontSize:20,
fontFamily:'Times New Roman',
fontWeight:'bold',
marginLeft:30
}
})