import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogTitle,
  DialogButton,
  DialogFooter,
} from "react-native-popup-dialog";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
console.disableYellowBox = true;
import Share from "react-native-share";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DialogBox1: false,
      DialogBox2: false,
      DialogBox3: false,
      code: "",
      f: 0,
      f2: 0,
    };
  }
  render() {
    onClick = () => {
      this.props.navigation.navigate("Table", { name: this.state.name });
    };
    let shareImageBase64 = {
      title: "React Native",
      message:
        "!!!Manoj wants to play Bingo with you!!!   secret code : 4838241 ",
      url: IMAGE,
      subject: "Share Link", //  for email
    };

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://wallpaperaccess.com/full/117415.jpg",
          }}
          style={styles.image}
        >
          <View style={styles.welcome}>
            <Text style={styles.text}>Welcome {global.n}</Text>
          </View>

          <View style={styles.button2}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ DialogBox1: true });
              }}
            >
              <Text style={styles.buttonText}>CREATE ROOM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button1}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ DialogBox2: true });
              }}
            >
              <Text style={styles.buttonText}>JOIN ROOM</Text>
            </TouchableOpacity>
          </View>
          <Dialog
            style={{ height: 700 }}
            visible={this.state.DialogBox1}
            width={300}
            height={300}
            rounded={true}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            dialogTitle={
              <DialogTitle
                style={{ backgroundColor: "#b1dce0" }}
                title="CREATE ROOM"
              />
            }
            onTouchOutside={() => {
              this.setState({ DialogBox1: false, f2: 1 });
            }}
            onDismiss={() => {
              if (this.state.f2 != 1) this.setState({ DialogBox3: true });
              console.log(this.state.f2);
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="TWO PLAYERS"
                  onPress={() => {
                    this.setState({ DialogBox1: false, f2: 2 });
                  }}
                />
                <DialogButton
                  text="THREE PLAYERS"
                  onPress={() => {
                    this.setState({ DialogBox1: false, f2: 2 });
                  }}
                />
                <DialogButton
                  text="FOUR PLAYERS"
                  onPress={() => {
                    this.setState({ DialogBox1: false, f2: 2 });
                  }}
                />
              </DialogFooter>
            }
          ></Dialog>
          <Dialog
            visible={this.state.DialogBox2}
            width={300}
            height={200}
            rounded={true}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            dialogTitle={
              <DialogTitle
                style={{ backgroundColor: "#b1dce0" }}
                title="JOIN ROOM"
              />
            }
            onTouchOutside={() => {
              this.setState({ DialogBox2: false, f: 1 });
            }}
            onDismiss={() => {
              if (this.state.f == 2)
                this.props.navigation.navigate("Table")
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  textStyle={{ color: "green" }}
                  text="OK"
                  onPress={() => {
                    this.setState({ DialogBox2: false, f: 2 });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <View style={styles.textbox}>
                <TextInput
                  style={{ height: 40 }}
                  placeholder="Enter the code"
                  onChangeText={(text) => this.setState({ code: text })}
                  value={this.state.code}
                />
              </View>
            </DialogContent>
          </Dialog>
          <Dialog
            visible={this.state.DialogBox3}
            width={300}
            height={150}
            rounded={true}
            dialogAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            dialogTitle={
              <DialogTitle
                style={{ backgroundColor: "#b1dce0" }}
                title="ROOM CODE"
              />
            }
            onDismiss={() => {
              Share.open(shareImageBase64);
              this.props.navigation.navigate("Table")
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  textStyle={{ color: "blue" }}
                  text="Share code"
                  onPress={() => {
                    this.setState({ DialogBox3: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <View style={styles.textbox}>
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  4838241
                </Text>
              </View>
            </DialogContent>
          </Dialog>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 50,
    textAlign: "center",
    margin: 20,
    color: "white",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "grey",
    fontSize: 40,
    fontFamily: "notoserif",
    fontWeight: "bold",
    marginTop: hp("-60%"),
  },
  button2: {
    margin: 90,
    backgroundColor: "#abc2c1",
    width: wp("50%"),
    borderRadius: 25,
    paddingVertical: hp("1.7%"),
    marginTop: hp("-10%"),
    marginBottom: hp("-10"),
    fontFamily: "san",
  },
  dbtn: {
    height: 30,
    width: 40,
  },
  textbox: {
    backgroundColor: "rgba(176, 156, 141,0.0)",
    color: "#212121",
    fontFamily: "san",
  },
  button1: {
    margin: 90,
    backgroundColor: "#abc2c1",
    width: wp("50%"),
    borderRadius: 25,
    paddingVertical: hp("1.7%"),
    marginTop: hp("15%"),
    marginBottom: hp("-40"),
    fontFamily: "san",
  },
  buttonText: {
    fontSize: wp("4.4%"),
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "san",
  },
  col: {
    backgroundColor: "#cfe1e3",
    alignItems: "center",
  },
});
const IMAGE =
  "data:image/jpeg;base64,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";
