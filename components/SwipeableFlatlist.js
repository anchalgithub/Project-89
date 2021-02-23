import React, { Component } from 'react';
import { Dimensions, Text, StyleSheet, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeableListView} from 'react-native-swipe-list-view'
import db from '../config'

export default class SwipeableFlatlist extends Component{
constructor(props){
super(props);
this.state={
allNotifications:allNotifications
}
}

updateMarkAsRead = (notification)=>{
db.collection("all_notifications").doc(notification.doc_id).update({
"notfication_status" :"Read"
})
}

onSwipeValueChange = swipeData =>{
var allNotifications = this.state.allNotifications
const{key,value} = swipeData;
if(value <-Dimensions.get('window').width){
const newData = [...allNotifications]
const prevIndex = allNotifications.findIndex(item=>item.key ===key)
this.updateMarkAsRead(allNotifications[prevIndex]); 
newData.splice(prevIndex,1)
this.setState({
allNotifications:newData
})
}
}

renderItem = data =>(
<ListItem title = {data.item.item_name}
titleStyle={{color:'black', fontWeight:'bold'}}
subtitle={data.item.message}
bottomDivider
/>
)

renderHiddenItem = () =>(
<View style = {{ alignItems: 'center',
backgroundColor: 'orange',
flex: 1,
flexDirection: 'row',
justifyContent: 'space-between',
paddingLeft: 15,}}>

<View style = {[styles.backRight, styles.backRight2]}>
<Text style = {styles.backText}></Text>
</View>
</View>
)

render(){
return(
<View style = {{flex:1, backgroundColor:'white'}}>
<SwipeableListView disableRightSwipe
data={this.state.allNotifications}
renderItem={this.renderItem}
renderHiddenItem={this.renderHiddenItem}
rightOpenValue = {-Dimensions.get('window').width}
previewRowKey={'0'}
previewOpenValue = {-40}
previewOpenDelay={3000}
onSwipeValueChange={this.onSwipeValueChange}
/>
</View>
)
}
}

const styles = StyleSheet.create({
backRight:{
alignItems:'center',
bottom: 0,
justifyContent: 'center',
position: 'absolute',
top: 0,
width: 100,
},

backRight2:{
backgroundColor:'turquoise',
right:0
},

backText:{
color :'black',
fontWeight:'bold',
fontSize:15
}
})