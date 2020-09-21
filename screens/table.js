import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    global.i = 1;
    this.state = {
      HeadTable: ["B", "I", "N", "G", "O"],
      DataTable: [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
      ],
      filled: false,
      name: this.props.navigation.getParam("name", ""),
    };
  }
  _alertIndex(index, data) {
    console.log(this.state.DataTable);
    this.state.DataTable[index][data] = global.i;
    global.i = global.i + 1;
    this.setState({
      DataTable: this.state.DataTable,
    });
    if (global.i == 25) {
      this.setState({ filled: true });
    }

    console.log(this.state.DataTable);
  }
  randomize() {
    var k = 0,
      r;
    var ins = [],
      arr = [];
    while (k < 25) {
      r = Math.floor(Math.random() * 25) + 1;
      if (arr[r] != -1) {
        ins[k] = r;
        k += 1;
      }
      arr[r] = -1;
    }
    var t = 0;
    for (var j = 0; j < 5; j++) {
      for (var l = 0; l < 5; l++) {
        this.state.DataTable[j][l] = ins[t++];
      }
    }
    this.setState({
      DataTable: this.state.DataTable,
      filled: true,
    });
  }
  check() {
    if (!this.state.filled) Alert.alert("PLEASE FILL THE TABLE");
    else
      this.props.navigation.navigate("Play", {
        DataTable: this.state.DataTable,
      });
  }
  clear() {
    globalThis.i = 1;
    this.setState({
      DataTable: [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
      ],
      filled: false,
    });
  }
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index, data)}>
        <View>
          <Text>{this.state.DataTable[index][data]}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              "https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-full-3d-chinese-grey-charcoal-wood-frame-background-graingrayframechinese-style3dwoodwoodenretroantiquitylifelikestereoscopic-image_87516.jpg",
          }}
          style={styles.image}
        >
          <Text style={styles.Head}>TABLE CREATION</Text>
          <Table borderStyle={{ borderWidth: 3, borderColor: "white" }}>
            <Row
              data={state.HeadTable}
              style={styles.HeadStyle}
              textStyle={styles.TablehText}
            />
            {state.DataTable.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      this.state.DataTable[index][cellIndex] == " "
                        ? element(cellIndex, index)
                        : this.state.DataTable[index][cellIndex]
                    }
                    textStyle={styles.TableText}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => this.randomize()}>
              <Text style={styles.buttonText}>RANDOMIZE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button2}>
            <TouchableOpacity onPress={() => this.clear()}>
              <Text style={styles.buttonText}>CLEAR</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button3}>
            <TouchableOpacity onPress={() => this.check()}>
              <Text style={styles.buttonText}>ENTER ROOM</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  Head: {
    textAlign: "center",
    marginTop: hp("3%"),
    fontSize: 30,
    color: "orange",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#8f8874",
  },
  TablehText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
  },
  TableText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
    backgroundColor: "#f2c649",
  },
  row: { flexDirection: "row", height: 50 },
  buttonText: {
    fontSize: wp("4.4%"),
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    fontFamily: "san",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "center"
  },
  button: {
    margin: 0,
    backgroundColor: "rgba(153, 148, 144,0.7)",
    width: wp("40%"),
    borderRadius: 25,
    paddingVertical: hp("1.7%"),
    marginTop: hp("10%"),
    fontFamily: "san",
    marginHorizontal: hp("2.3%"),
  },
  button2: {
    margin: 170,
    backgroundColor: "rgba(153, 148, 144,0.7)",
    width: wp("42%"),
    borderRadius: 25,
    paddingVertical: hp("1.7%"),
    marginTop: hp("-6.3%"),
    marginHorizontal: hp("27.9%"),
    fontFamily: "san",
  },
  button3: {
    margin: 70,
    backgroundColor: "rgba(153, 148, 144,0.7)n",
    width: wp("42%"),
    borderRadius: 25,
    paddingVertical: hp("1.7%"),
    marginTop: hp("-16.3%"),
    fontFamily: "san",
    marginHorizontal: hp("15.0%"),
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    margin: 10,

    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text1: {
    margin: 5,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: hp("0%"),
  },
});
