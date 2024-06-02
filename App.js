import { useState } from "react";
import _ from "lodash";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import PickerDate from "./src/PickerDate";
import PickerTime from "./src/PickerTime";
// import LifeCycleApp from "./src/debugs/LifeCycleApp.js";

import { ss } from "./src/styles/Styles.js";
import CustomSwitch from "./src/components/switch2/CustomSwitch.js";
// import TimerApp from "./src/debugs/TimerApp.js";
// import BWModalApp from "./src/debugs/BWModalApp.js";
// import BWDatetimeSelectorApp from "./src/debugs/BWDatetimeSelectorApp.js";
// import LifeCycle2App from "./src/debugs/LifeCycle2App.js";
// import SwitchApp from "./src/components/switch/SwitchApp.js";

const App = () => {
  const [onleft, setOnleft] = useState(false);

  return (
    <View style={{ ...ss.viewFull, backgroundColor: "#1f1f1f" }}>
      {/* <LifeCycleApp /> */}
      {/* <LifeCycle2App /> */}
      {/* <TimerApp /> */}
      {/* <BWModalApp /> */}
      {/* <BWDatetimeSelectorApp /> */}

      {/* https://github.com/arshigtx/react-native-custom-switch */}

      <TouchableOpacity onPress={() => setOnleft(!onleft)}>
        <Text style={{ color: "white", fontSize: 33 }}>
          {onleft ? "on" : "off"}
        </Text>
      </TouchableOpacity>

      <CustomSwitch
        startOnLeft={onleft}
        buttonWidth={20}
        switchWidth={70}
        buttonPadding={2}
        // buttonText={"o"}
        // onSwitchButtonText={"o"}
        switchBackgroundColor={"#cbcbcb"}
        onSwitchBackgroundColor={"#09c628"}
        buttonColor={"#EFE6DD"}
        switchBorderColor={"#F3DFA2"}
        buttonBorderColor={"#997048"}
        switchLeftText={"เปิด"}
        switchLeftTextStyle={{ color: "green", fontSize: 18 }}
        switchRightText={"ปิด"}
        switchRightTextStyle={{ color: "brown", fontSize: 18 }}

        // switchBackgroundColor={"#7EBDC2"}
        // onSwitchBackgroundColor={"#BB4430"}
      />

      <Text style={{ color: "white" }}>จับกลุ่มยานพาหนะ</Text>

      {/* <CustomSwitch 
  buttonText={'Hello'}
  onSwitchButtonText={'Bye'}
/>    */}
    </View>
  );
};

const App1 = () => {
  const [count, setCount] = useState(0);

  const [datevalue, setDatevalue] = useState(null);

  const [showdate, setShowdate] = useState(false);
  const [showtime, setShowtime] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ ...ss.viewColumn, alignItems: "center" }}>
        <Pressable
          style={ss.button}
          onPress={() => {
            setCount(count + 1);
          }}
        >
          <Text style={ss.textButton}>count: {count}</Text>
        </Pressable>

        <Pressable style={ss.buttonBlue} onPress={() => setShowdate(!showdate)}>
          <Text style={ss.textButtonBlue}>Show date</Text>
        </Pressable>

        <Pressable style={ss.button} onPress={() => setShowtime(!showtime)}>
          <Text style={ss.textButton}>Show time</Text>
        </Pressable>

        {datevalue && _.isDate(datevalue) && (
          <View>
            <Text style={ss.textPurple}>
              {datevalue.toLocaleDateString("th-TH")}
            </Text>
            <Text style={ss.textTeal}>
              {datevalue.toLocaleTimeString("th-TH")}
            </Text>
            <Text style={ss.textResult}>{datevalue.toISOString()}</Text>
          </View>
        )}
      </View>

      <PickerDate
        showdate={showdate}
        onOk={(val) => {
          try {
            let _datevalue = datevalue || new Date();
            const y = val.getFullYear();
            const m = val.getMonth();
            const d = val.getDate();

            const _hours = _datevalue.getHours();
            const _minutes = _datevalue.getMinutes();

            const _newdate = new Date(y, m, d, _hours, _minutes);

            setDatevalue(_newdate);

            setShowdate(false);
          } catch (error) {
            console.log(error);
          }
        }}
        onCancel={() => {
          setShowdate(false);
        }}
      />

      <PickerTime
        showtime={showtime}
        onOk={(val) => {
          let _datevalue = datevalue || new Date();
          const y = _datevalue.getFullYear();
          const m = _datevalue.getMonth();
          const d = _datevalue.getDate();

          const _hours = val.getHours();
          const _minutes = val.getMinutes();

          const _newdate = new Date(y, m, d, _hours, _minutes);

          setDatevalue(_newdate);

          setShowtime(false);
        }}
        onCancel={() => {
          setShowtime(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1f1f1f',
    // height: '100%',
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    // alignItems: 'center',
    // marginLeft: 30,
    // marginRight: 30,
    position: "relative",
    zIndex: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // width: 55,
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    // fontSize: 26,
    color: "blue",
    // fontWeight: '700',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textResult: {
    color: "#666",
    fontSize: 20,
  },
});

export default App;
