import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  TouchableNativeFeedback,
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
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogTitle,
  DialogButton,
  DialogFooter,
} from "react-native-popup-dialog";
import io from "socket.io-client";
console.disableYellowBox = true;
let pos = 0;
export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dummy: [" ", " ", " ", " ", " ", " "],
      HeadTable: ["B", "I", "N", "G", "O"],
      DataTable: this.props.navigation.getParam("DataTable", []),
      t1: [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
      ],
      cut: " ",
      num: 0,
      win: false,
      f: 3,
    };
    
    console.log(this.state);
  }
  componentDidMount(){
    this.socket = io("http://192.168.56.1:3000");
    this.socket.on("cut",msg=>{
    let ind,cellind;
    let seen =false;
    console.log(this.state.DataTable[msg.row][msg.col]);
     for(var i = 0 ; i < 5 ;i++)
      {
        for(var j = 0;j<5;j++)
        {
        if(this.state.DataTable[i][j] == msg){
          cellind = j;
          ind = i;
          seen = true;
          break;
        }
        if(seen)
          break;
      }
      }
      this.state.t1[ind][cellind] = "1";
      this.setState({
        t1: this.state.t1,
      })
      if(msg<24)
      this.socket.emit("cut",msg+1);

    })
    

  }
  
  see(index, data) {
    if (this.state.t1[index][data] == " ") {
      this.state.t1[index][data] = "1";
      this.setState({
        t1: this.state.t1,
        cut: this.state.DataTable[index][data],
      });
      this.socket.emit("cut",this.state.DataTable[index][data]);
      var s = 0;
      for (var l = 0; l < 5; l++) {
        if (this.state.t1[index][l] == "1") s = s + 1;
      }
      if (s == 5) {
        this.state.dummy[pos] = "B";
        this.setState({ dymmy: this.state.dummy });
        pos += 1;
      }
      s = 0;
      for (var r = 0; r < 5; r++) {
        if (this.state.t1[r][data] == "1") s = s + 1;
        else break;
      }
      if (s == 5) {
        this.state.dummy[pos] = "B";
        this.setState({ dymmy: this.state.dummy });
        pos += 1;
        //console.log(this.state.dummy[pos-1]);
      }
      if (index == data) {
        s = 0;
        for (var l = 0; l < 5; l++) {
          if (this.state.t1[l][l] == "1") s += 1;
          else break;
        }
        if (s == 5) {
          this.state.dummy[pos] = "B";
          this.setState({ dymmy: this.state.dummy });
          pos += 1;
          //console.log(this.state.dummy[pos-1]);
        }
      }
      if (index == 4 - data) {
        s = 0;
        for (var l = 0; l < 5; l++) {
          //console.log(this.state.t1[l][4 - l]);
          if (this.state.t1[l][4 - l] == "1") s += 1;
          else break;
        }
        if (s == 5) {
          this.state.dummy[pos] = "B";
          this.setState({ dymmy: this.state.dummy });
          pos += 1;
          //console.log(this.state.dummy[pos-1]);
        }
      }
    }
    if (pos == 5) {
      this.setState({ win: true });
      pos = 0;
    }
    //console.log(this.state.win);
  }
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this.see(index, data)}>
        <View
          style={
            this.state.t1[index][data] == "1"
              ? styles.HeadStyleCC
              : styles.TableText
          }
        >
          <Text
            style={
              this.state.t1[index][data] == "1"
                ? styles.TableTextC
                : styles.TableText
            }
          >
            {this.state.DataTable[index][data]}
          </Text>
        </View>
      </TouchableOpacity>
    );
    const check = (data) => (
      <View style={styles.HeadStyleC}>
        <Text style={styles.Tableh1Text}>{this.state.HeadTable[data]}</Text>
      </View>
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
          <Text style={styles.text1}>
            {global.n} CUTS :{" "}
            <Text style={{ color: "orange" }}>{this.state.cut}</Text>
          </Text>
          <Table borderStyle={{ borderWidth: 3, borderColor: "white" }}>
            {
              <TableWrapper style={styles.HeadStyle}>
                {state.HeadTable.map((celldata, k) => (
                  <Cell
                    key={k}
                    data={this.state.dummy[k] == " " ? celldata : check(k)}
                    textStyle={styles.TablehText}
                  />
                ))}
              </TableWrapper>
            }
            {state.DataTable.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={element(cellIndex, index)}
                    textStyle={styles.TableText}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ImageBackground>
        <Dialog
          visible={this.state.win}
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
              title="!!!WON!!!"
            />
          }
          onTouchOutside={() => {
            this.setState({ win: false });
          }}
          onDismiss={() => {
            if (this.state.f == 1) this.props.navigation.navigate("Table");
            else this.props.navigation.navigate("Room");
          }}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={{ color: "green" }}
                text="PLAY AGAIN"
                onPress={() => {
                  this.setState({ win: false, f: 1 });
                }}
              />
              <DialogButton
                textStyle={{ color: "red" }}
                text="MAIN MENU"
                onPress={() => {
                  this.setState({ win: false, f: 2 });
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <View style={styles.textbox}>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {global.n} WON THE GAME
              </Text>
            </View>
          </DialogContent>
        </Dialog>
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
    marginBottom: hp("4%"),
    fontSize: 30,
    color: "grey",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#8f8874",
    flexDirection: "row",
  },
  textbox: {
    backgroundColor: "rgba(176, 156, 141,0.0)",
    color: "#212121",
    fontFamily: "san",
  },
  HeadStyleC: {
    height: 50,
    alignContent: "center",
    backgroundColor: "red",
    //flexDirection: "row"
  },

  HeadStyleCC: {
    height: 50,
    alignContent: "center",
    backgroundColor: "orange",
    //flexDirection: "row"
  },
  TablehText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
  },
  Tableh1Text: {
    margin: 10,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  TableText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },
  TableTextC: {
    margin: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },
  TableText2: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "red",
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
    marginBottom: hp("9%"),
    marginTop: hp("-8%"),
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: hp("4%"),
  },
});
