import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class UserDetails extends Component{

constructor(props){
super(props);
this.state = {
userId:firebase.auth().currentUser.email,
receiverId:this.props.navigation.getParam('details')["username"],
exchangeId:this.props.navigation.getParam('details')["exchangeId"],
itemName:this.props.navigation.getParam('details')["item_name"],
description:this.props.navigation.getParam('details')["description"],
recieverName: '',
recieverContact: '',
recieverAddress: '',
recieverRequestDocId : '',
currencyCode
}
}

addNotifications=()=>{
var message = this.state.userName + "would like to exchange the item with you."
db.collection("all_notifications").add({
"targeted_user_id" : this.state.receiverId,
"donor_id" : this.state.userId,
"exchangeId" : this.state.exchangeId,
"item_name" : this.state.itemName,
"date" : firebase.firestore.FieldValue.serverTimestamp(),
"notification_status" : "Unread",
"message" : message
})
}

getRecieverDetails(){
db.collection('users').where('emailId','==',this.state.receiverId).get()
.then(snapshot=>{
snapshot.forEach(doc=>{
this.setState({
receiverName    : doc.data().first_name,
receieverContact : doc.data().contact,
receieverAddress : doc.data().address,
})
})
});
db.collection('exchange_requests').where('exchangeId','==',this.state.exchangeId).get()
.then(snapshot=>{
snapshot.forEach(doc => {
this.setState({recieverRequestDocId:doc.id})
})
})}
  
addBarters=()=>{
db.collection('all_Barters').add({
book_name : this.state.itemName,
exchange_id : this.state.exchangeId,
requested_by : this.state.recieverName,
donor_id : this.state.userId,
request_status :  "Person Interested"
})
}
   
componentDidMount(){
this.getRecieverDetails()
}

render(){
return(
<View style = {{flex:1}}>
<View style = {{flex:1}}>

<Header leftComponent ={<Icon name='arrow-left' type='feather' color='blue'  onPress={() => this.props.navigation.goBack()}/>}
centerComponent={{ text:"Exchange Items", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }} backgroundColor = "blue" />

</View>
<View style = {{flex:0.3}}>

<Card>
<Text style = {{fontWeight:'bold'}}> Item Name : {this.state.itemName}</Text>
</Card>

<Card>
<Text style = {{fontWeight:'bold'}}> Description : {this.state.description}</Text>

</Card>
<Text style = {{fontWeight:'bold'}}> Item Value : {this.state.currencyCode}</Text>
<Card>

</Card>
</View>

<View style = {{flex:0.3}}>
<Card title = {"Receiver Information"} titleStyle = {{fontSize:20, fontFamily:'times new roman'}}>

<Card>
<Text style = {{fontWeight:'bold'}}>Name : {this.state.name}</Text>
</Card>

<Card>
<Text style = {{fontWeight:'bold'}}>Contact Information : {this.state.receiverContact}</Text>
</Card>

<Card>
<Text style = {{fontWeight:'bold'}}>Address : {this.state.receiverAddress}</Text>
</Card>
</Card>

</View>
<View style = {{flex:0.3, justifyContent:'center', alignItems:'center', marginTop : RFValue(30)}}>
{this.state.receiverId!==this.state.userId?(
<TouchableOpacity style = {styles.button} onPress = {()=> {this.addBarters() 
this.props.navigation.navigate('MyBarters') 
this.addNotifications()}}>
<Text>I want to exchange</Text>
</TouchableOpacity>
): null }
</View>
</View>
)
}
}

const styles = StyleSheet.create({
button :{
width:200,
height:50,
justifyContent:'center',
borderRadius:10,
backgroundColor:'pink',
shadowColor:"#000",
shadowOffset:{
width:0,
height:8,
},
elevation:16
}
})