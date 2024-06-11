import { useState } from "react";
import _ from "lodash";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BWPickerDate from "./src/debugs/BWPickerDate.js";
import BWPickerTime from "./src/debugs/BWPickerTime.js";
// import LifeCycleApp from "./src/debugs/LifeCycleApp.js";

import { ss } from "./src/styles/Styles.js";
// import CustomSwitch from "./src/components/_____switch2/CustomSwitch.js";
// import BWSwitch from "./src/components/switch/BWSwitch.js";
// import BWRefs from "./src/components/refs/BWRefs.js";
// import TimerApp from "./src/debugs/TimerApp.js";
// import BWModalApp from "./src/debugs/BWModalApp.js";
import BWDatetimeSelectorApp from "./src/debugs/BWDatetimeSelectorApp.js";
// import LifeCycle2App from "./src/debugs/LifeCycle2App.js";
// import SwitchApp from "./src/components/switch/SwitchApp.js";
import BWMoment from "./src/components/moment/BWMoment.js";
import BWUseEffectApp from "./src/components/useeffect/BWUseEffectApp.js";

import { store } from "./src/redux/store.js";
import { Provider } from "react-redux";
import ReduxApp from "./src/components/ReduxApp/ReduxApp.js";
import BWModal from "./src/components/modal/BWModal.js";
import FlatlistApp from "./src/components/FlatlistApp/FlatlistApp.js";
import CustomlistApp from "./src/components/CustomlistApp/CustomlistApp.js";

import BWChartApp from "./src/components/BWChart/BWChartApp.js";
import GradientApp from "./src/components/GradientApp/GradientApp.js";

const App = () => {
  const [onleft, setOnleft] = useState(false);

  return (
    <Provider store={store}>
      <View style={{ margin: 0, padding: 0, alignSelf: "stretch" }}>
        {/* <LifeCycleApp /> */}
        {/* <LifeCycle2App /> */}
        {/* <TimerApp /> */}
        {/* <BWModalApp /> */}
        {/* <BWRefs /> */}
        {/* <BWMoment /> */}

        {/* <BWDatetimeSelectorApp /> */}
        {/* <BWUseEffectApp /> */}
        {/* <BWModal /> */}

        <ReduxApp />
        {/* <FlatlistApp /> */}
        {/* <CustomlistApp /> */}
        {/* <BWChartApp /> */}
        {/* <GradientApp /> */}
      </View>
    </Provider>
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

      <BWPickerDate
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

      <BWPickerTime
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
