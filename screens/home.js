import React, { Component, useState } from 'react';
import { StyleSheet, View ,TouchableOpacity,TextInput,Text, Alert,ImageBackground,Image, EventEmitter} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
console.disableYellowBox = true;
export default class App extends Component {
  constructor(props){
    super(props);
        this.state = {
          name : ""
        }
    }
    
  render() {
    global.n=this.state.name;
  onClick = () => {
    if(this.state.name!="")
    this.props.navigation.navigate("Room",{name:this.state.name});
    else  
      Alert.alert("PLEASE ENTER THE USER NAME");
  }
  return (
    <View style={styles.container}>  
        
    <ImageBackground source={{
      uri:'https://image.freepik.com/free-photo/3d-render-wooden-table-against-metal-background_1048-5526.jpg'}} style={styles.image}>
    <Text style={styles.text2}>
        WELCOME TO BINGO
    </Text>
    
    <Text style={styles.text1}>USER NAME </Text>
    <View style={styles.textbox}>
      <TextInput
        style={{height: 40}}
        placeholder="ENTER YOR NAME"
         onChangeText={(text)=>this.setState({name:text})}
         value = {this.state.name}

      />
      </View>
      <View style={styles.button}>

            <TouchableOpacity onPress={onClick.bind(this)}>
              <Text style={styles.buttonText}>PLAY</Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
      </View>
   
  );
}
}
const styles = StyleSheet.create({
    textbox: { 
        width: wp('77%'),
        margin:40,
         backgroundColor: 'rgba(176, 156, 141,0.5)',
        borderRadius: 25,
        paddingHorizontal: wp('7.1%'),
        color: '#212121',
        marginTop: hp('-7.90%'),
        marginBottom:hp('-46'),
        fontFamily:"san"
    },
    container: {
        flex: 1,
        flexDirection: "column"
      },
      image: {
        flex: 1,
         resizeMode: "cover",
        //justifyContent: "center"
      },
      text1: {
        color: 'rgb(212, 205, 195)',
        margin:53,
        fontSize: 18,
        marginTop:hp('35'),
        fontWeight: "bold"
      },
      button:
  {
    margin:100,
    backgroundColor: 'rgba(153, 148, 144,0.7)',
    width: wp('45%'),
    borderRadius: 35,
    paddingVertical: hp('1.7%'),
    marginTop:hp('59%'),
    fontFamily:"san"
  },
  buttonText:{
    
    fontSize: wp("4.4%"),
    fontWeight:'500',
    color:"#000000",
    textAlign:'center',
    fontFamily:"san"
},
text2: {
    color: "rgba(153, 148, 144,0.3)",
    margin:30,
    fontSize: 30,
    fontWeight: "bold"
  }});
