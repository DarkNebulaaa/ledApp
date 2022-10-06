import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons , MaterialCommunityIcons } from '@expo/vector-icons';
import init from 'react_native_mqtt';


const topicsub = "esp32/test" ;
const topic = "esp32/test"
init({
  size : 10000 ,
 storageBackend : AsyncStorage ,
 defaultExpires : 1000 * 3600 * 24 ,
 enableCache : true ,
  reconnect : false ,
 sync : {}
});


export default function App() {

  useEffect( () => {
    // write your code here , it's like componentwillMount
     console.log ( " mounted " ) ;
     setIsLED1Disabled(true);
   }, [] )


   const onMessageArrived = (message) =>{
    console.log ( " onMessageArrived : " + message.payloadString);
    if( message.payloadString == "pong"){
      console.log("arrived")
    onLED1Connect ( ) ;
    }
 }


 const onLED1Connect = () =>{
 console.log ( " led connected " ) ;
  setIsLED1Disabled (false) ;
 }


 const onConnect = () => {
 console.log ( " onConnect " ) ;
 client.subscribe (topicsub) ;
  client.publish ( topic,"ping") ;
 }
 const onFailure = () => {
  console.log ( " failure " ) ;
  }
const onLight = () => {
  client.publish ( topic ,"power");
  console.log("onlight " ) ;
}
const [ isLED1Disabled , setIsLED1Disabled ] = useState(false) ;
const client = new Paho.MQTT.Client ( 'cd1e0119.us-east-1.emqx.cloud', 8083 , "clientID-" + parseInt(Math.random() * 100)) ;
client.onMessageArrived = onMessageArrived ;
client.connect ( { onSuccess : onConnect , useSSL : false , userName : 'ESP32' , password : 'esp32', onFailure: onFailure});

return (
  <View style ={styles.container}>
   <View
     style={styles.buttonContainer }
    >
      <Text style = {styles.buttonText}> LED1 </Text>
      <TouchableOpacity
        style = {styles.button}
        disabled = {isLED1Disabled}
        onPress = {onLight}
        >
        <Ionicons name = "power" size = { 80 } color = " # fff " />
      </TouchableOpacity>
   </View>
   <StatusBar style = " auto " />
  </View>

);
}

const styles = StyleSheet.create({
 container : {
   flexDirection : "column",
    flex : 1 ,
    backgroundColor : ' #fff ' ,
   justifyContent : ' center ' ,
    paddingHorizontal : 20 ,
    paddingTop : 200 ,
 },
 buttonContainer : {
   height : 160 ,
   backgroundColor : '#841584',
   borderRadius : 8,
   padding : 10 ,
    borderWidth : 2 ,
    flexDirection : " row " ,
   justifyContent : " flex - start "
 } ,
 button : { 
    padding : 5 ,
   alignSelf : " center " ,
 },
 buttonText : {
    fontSize : 30 ,
    color : " #fff " ,
    fontWeight : " bold " ,
   textTransform : " uppercase "
 },
});


