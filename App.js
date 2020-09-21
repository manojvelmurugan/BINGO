import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import home from "./screens/home";
import table from "./screens/table";
import room from "./screens/room";
import play from "./screens/play";
import test from "./screens/test"
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createSwitchNavigator(
  {
    Home: {
      screen: home,
    },
    Table: {
      screen: table,
    },
    Play: {
      screen: play,
    },
    Room: {
      screen: room,
    },
    Test :{
      screen : test,
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});