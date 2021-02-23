import React, { Component } from 'react';
import { Header,Icon, Badge } from 'react-native-elements';
import { StyleSheet, Text, View, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class MyHeader extends Component {
constructor(props){
super(props)
this.state = {
userId : firebase.auth().currentUser.email,
value :""
}
}



getNumberofUnNot(){
db.collection('all_notifications').where('notification_status', '==', "unread").where('targeted_user_id', '==', this.state.userId)
.onSnapshot((snapshot)=>{
var unreadNot = snapshot.docs.map((doc)=>doc.data())
this.setState ({
valye : unreadNot.length
})
})
}

componentDidMount(){
this.getNumberofUnNot()
}

BellIconWithBadge=()=>{
return(
<View>
<Icon name = 'Bell' type='font-awesome' color = 'black' size = {25}
onPress = {()=>this.props.navigation.navigate('Notifications')}/>
<Badge value = {this.state.value}
containerStyle={{position:'absolute', top:-4, right:-4}}/>
</View>
)
}

render(){
return(
<Header 
leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = "black"  onPress={() => this.props.navigation.toggleDrawer()}/>}
centerComponent={{text:this.props.title, style:{color:'#90A5A9', fontSize:20, fontWeight:"bold"}}} 
rightComponent={<this.BellIconWithBadge{...this.props}/>}
backgroundColor = "#add8e6"
/>
)
}
}