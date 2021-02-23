import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Modal from 'react-native-modal'
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends Component{
constructor(){
super();
this.state = {
emailId:'',
password:'',
isModalVisible:'false',
firstName: "",
lastName: "",
address:"",
contact:"",
confirmPassword:"",
currencyCode : ""
}
}

userLogin=(emailId, password)=>{
firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
this.props.navigation.navigate('Home')
})
.catch((error)=>{
var errorCode = error.code;
var errorMessage = error.message;
return Alert.alert(errorMessage)
})
}


userSignUp = (emailId, password,confirmPassword) =>{
if(password !== confirmPassword){
return Alert.alert("password doesn't match\nCheck your password.")
}else{
firebase.auth().createUserWithEmailAndPassword(emailId, password)
.then((response)=>{
return Alert.alert("User Added Successfully")
})
.catch(function(error) {
var errorCode = error.code;
var errorMessage = error.message;
return Alert.alert(errorMessage)
});
db.collection('users').add({
first_name:this.state.firstName,
last_name:this.state.lastName,
contact:this.state.contact,
emailId:this.state.emailId,
address:this.state.address
})
}
}

showModal =()=>{
return(
<Modal animationType = "fade" transparent = {true} visible={this.state.isModalVisible}>
<View style = {styles.modalContainer}>
<ScrollView style= {{width:'100%'}}>
<KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>

<Text style = {styles.modalTitle}> Registration </Text>
<TextInput style = {styles.formTextInput} placeholder = {"First Name"} maxLength = {8} onChangeText = {(text)=>{
this.setState({firstName:text})
}}/>

<TextInput  style = {styles.formTextInput} placeholder = {"Last Name"} maxLength = {8} onChangeText = {(text)=>{
this.setState({lastName:text})
}}/>

<TextInput style = {styles.formTextInput} placeholder = {"Contact Information"} maxLength = {8} keyboardType = {"numeric"} onChangeText = {(text)=>{
this.setState({contact:text})
}}/>

<TextInput style = {styles.formTextInput} placeholder = {"Email Address"} keyboardType = {'email-address'} onChangeText = {(text)=>{
this.setState({emailId:text})
}}/>

<TextInput style = {styles.formTextInput} placeholder = {"Address"} multiline = {true} onChangeText = {(text)=>{
this.setState({address:text})
}}/>

<TextInput style = {styles.formTextInput} placeholder = {"Password"} secureTextEntry = {true} onChangeText = {(text)=>{
this.setState({password:text})
}}/>

<TextInput style = {styles.formTextInput} placeholder = {"Confirm Password"} secureTextEntry = {true} onChangeText = {(text)=>{
this.setState({confirmPassword:text})
}}/>

<TextInput style = {styles.login} placeholder = {"Country Currency Code"} maxLength = {8} onChangeText = {(text)=>
{this.setState({currencyCode : text})
}}/>

<View style = {styles.ModalBackButton}>
<TouchableOpacity style = {styles.regButton} onPress = {()=>this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}>
<Text style = {styles.regButtonText}>Register</Text>
</TouchableOpacity>
</View>

<View style = {styles.ModalBackButton}>
<TouchableOpacity style = {styles.cancelButton} onPress = {()=>this.setState({"isModalVisible":false})}>
<Text style = {{color:'red'}}>Cancel</Text>
</TouchableOpacity>
</View>

</KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>
)
}


render(){
return(
<View style = {styles.container}>
<View style = {{justifyContent:'center', alignItems:'center'}}>{this.showModal()}</View>


<View style = {{justifyContent:'center', alignItems:'center'}}>
<Text style = {styles.title}> Barter </Text>
</View>

<View>
<TextInput style = {styles.login} placeholder = "Username" keyboardType = 'email-address' onChangeText = {(text)=>{this.setState({emailId: text})}}/>
<TextInput style = {styles.login} placeholder = "Password" secureTextEntry = {true} onChangeText = {(text)=>{this.setState({password: text})}}/>

<TouchableOpacity style = {[styles.button, {marginBottom:20, marginTop:20}]}
onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}>
<Text style = {styles.buttonText}>Login!</Text>
</TouchableOpacity>

<TouchableOpacity style = {styles.button}
onPress ={()=>{this.setState({'isModalVisible':true})}}>
<Text style = {styles.buttonText}>Sign Up!</Text>
</TouchableOpacity>
</View>
</View>
)
}
}

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:'white',
},

title :{
fontSize:30,
fontWeight:'bold',
color:'#000080',

},

login:{
width:300,
height:50,
margin:20,
justifyContent:'center',
alignItems:'center',
backgroundColor:'turquoise',
borderRadius:3,
shadowColor:'blue',
marginLeft:870,
shadowOffset:{
width:0,
height:8,

},
shadowOpacity:0.3,
shadowRadius:10.3,
elevation:60
},

button:{
borderWidth:2,
width:"10%",
marginLeft:930,
borderRadius:9,
height:25,
backgroundColor:'turquoise',
shadowColor:'blue',
shadowOffset:{
width:0,
height:8
},
shadowOpacity:0.3,
shadowRadius:10.3,
elevation:60
},
            
buttonText:{
fontFamily: 'Times New Roman',
marginLeft:60,
fontSize:20,
},

KeyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalTitle :{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:RFValue(45),
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:RFValue(10),
    paddingBottom : RFValue(10),
    marginBottom:RFValue(14),
    marginLeft:RFValue(20)
  },
  regButton:{
    width:200,
    height:RFValue(50),
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:RFValue(3),
    marginTop:RFValue(20),
    shadowColor : "#000",
    shadowOffset:{
    width:0,
    height:8
    },
    shadowOpacity: 0.44,
    shadowRadius:10,
    elevation:16,
    marginTop: RFValue(10)
  },

  regButtonText:{
    color:'#ff5722',
    fontSize:RFValue(23),
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
    fontSize : RFValue(20),
    fontWeight:'bold',
    color : 'red',
    marginTop : RFValue(10)
  },
 



})
