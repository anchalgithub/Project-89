import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen'
import Home from './screens/Home'
import Exchange from './screens/Exchange';
import Settings from './screens/Settings';
import MyBarters from './screens/MyBarters';
import Notifications from './screens/Notifications';
import customMenu from './components/customMenu'
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Icon} from 'react-native-elements'

export default function App() {
  return (
    <AppContainer/>
  );
}

const TabNavigator = createBottomTabNavigator({
Home: {screen: Home,
navigationOptions:{
tabBarIcon:<Image source ={("../assets/home-icon.png")} style = {{width:20, height:20}}/>,
tabBarLabel = "HomeScreen"
}},
EnterAnItem: {screen: Exchange,
navigationOptions:{
tabBarIcon:<Image source ={("../assets/ads-icon.png")} style = {{width:20, height:20}}/>,
tabBarLabel = "Exchange"},
}},
{
defaultNavigationOptions: ({navigation})=>({
tabBarIcon: ()=>{
const routeName = navigation.state.routeName;
if(routeName === "Home"){
return(
<Image
source={require("./assets/home.png")}
style={{width:20, height:20}}
/>
)
}
else if(routeName === "Exchange"){
return(
<Image
source={require("./assets/ads-icon.png")}
style={{width:20, height:20,}}
/>)

}
}
})
}
);


const AppDrawNavigator = createDrawerNavigator({
Home : {screen : TabNavigator, navigationOptions:{
drawerIcon: <Icon name = "home" type = "fontawesome5"/>
}},
Settings : {screen : Settings, navigationOptions:{
drawerIcon : <Icon name = "gift" type = "font-awesome"/>,
drawerLabel : "My Received Books"
}},
MyBarters : {screen: MyBarters},
Notifications : {screen : Notifications, navigationOptions:{
drawerIcon : <Icon name = "bell" type = "font-awesome"/>,
drawerLabel : "Notifications"
}}
},
{contentComponent: customMenu},
{initialRouteName : 'Home'})


const switchNavigator = createSwitchNavigator({
WelcomeScreen:{screen: WelcomeScreen},
AppDrawNavigator : AppDrawNavigator,
})

const AppContainer =  createAppContainer(switchNavigator);
