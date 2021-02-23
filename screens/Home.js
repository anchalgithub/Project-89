import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';


export default class Home extends Component{
constructor (){
super()
this.state ={
allRequests :[]
}
this.requestRef=null
}

getRequests = () => {
this.requestRef = db.collection("exchange_requests").onSnapshot((snapshot)=>{
var allRequests = [] 
snapshot.forEach((doc)=>{
allRequests.push(doc.data())
})
this.setState({allRequests:allRequests})
})
}

componentDidMount(){
this.getRequests();
}

componentWillUnmount(){
this.requestRef();
}

/*Its just allowing React Native to track the different list of objects we are rendering to the screen. */ 
keyExtractor = (item, index) => index.toString()

renderItem = ({item,i})=>{
return(
<ListItem key={i} title = {item.item_Name} titleStyle = {{color:'black', fontWeight:'bold'}} subtitle = {item.description} 
rightElement = {
<TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("UserDetails", {"details":item})}}>
<Text style={{color:'#ffff'}}>Exchange</Text>
</TouchableOpacity>
}
bottomDivider
/>
)
}

render(){
return(
<View style={{flex:1}}>
<MyHeader title="Request An Item"/>
<ScrollView>
<View style={{flex:1}}>
{this.state.allRequests.length === 0?(
<View style={{flex:1, fontSize: 20, justifyContent:'center', alignItems:'center'}}>
<Text style={{ fontSize: 20}}>List of all the Barter</Text>
</View>):(
<FlatList
keyExtractor={this.keyExtractor}
data={this.state.allRequests}
renderItem={this.renderItem}
/>
)
}
</View>
</ScrollView>
</View>
)
}
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })