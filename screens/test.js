import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";
export default class App extends Component {
    componentDidMount(){
        const socket = io("http://192.168.56.1:3000")
    }
    render() {
      return (
          <Text>hi</Text>
      );
    }
  }