import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import AndroidPickerTimeHour from "./AndroidPickerTimeHour";
import AndroidPickerTimeMinute from "./AndroidPickerTimeMinute";
import { ss } from "./Style";

// const newdate = new Date();

const PickerTime = (props) => {
  const [datevalue, setDatevalue] = useState(null);

  const [hourindex, setHourindex] = useState(null);
  const [minuteindex, setMinuteindex] = useState(null);

  useEffect(() => {
    const nd = new Date();
    const _hour = nd.getHours(); // getUTCdate()
    const _minute = nd.getMinutes();

    setHourindex(_hour);
    setMinuteindex(_minute);

    console.log(`<=== useEffect[] xx`);

    // setDatevalue(nd);
  }, []);

  useEffect(() => {
    console.log(`<=== useEffect[hourindex, minuteindex]`);

    const nd = new Date(2024, 1, 1, hourindex, minuteindex, 0);
    setDatevalue(nd);
  }, [hourindex, minuteindex]);

  const hourOnIndexChanged = useCallback((index) => {
    console.log(
      `PickerTime.AndroidPickerTimeHour.onIndexChanged index: ${index} `,
    );
    setHourindex(index);
  }, []);

  const minuteOnIndexChanged = useCallback((index) => {
    console.log(
      `PickerTime.AndroidPickerTimeMinute.onIndexChanged index: ${index} `,
    );
    setMinuteindex(index);
  }, []);

  if (props.showtime === false) {
    return null;
  }
  if (!_.isDate(datevalue)) {
    console.log("===============================");
    return <Text>Loading..........</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={ss.viewLog}>
        <Text style={ss.textGreen}>
          {datevalue.toLocaleTimeString("th-TH")}
        </Text>
      </View>

      <View style={styles.wrapper}>
        <AndroidPickerTimeHour
          onIndexChanged={hourOnIndexChanged}
          hourindex={hourindex}
          itemHeight={40}
          fontSize={25}
        />

        <AndroidPickerTimeMinute
          onIndexChanged={minuteOnIndexChanged}
          minuteindex={minuteindex}
          itemHeight={40}
          fontSize={25}
        />
      </View>

      <View
        style={{
          // backgroundColor: 'red',
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <Text style={{ width: 150, textAlign: "center" }}>ชั่วโมง</Text>
        <Text style={{ width: 150, textAlign: "center" }}>นาที</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={ss.button}
            onPress={() => {
              const _now = new Date();
              const _hourindex = _now.getHours();
              const _minuteindex = _now.getMinutes();

              console.log(`hour: ${_hourindex} minute: ${_minuteindex}`);

              setHourindex(_hourindex);
              setMinuteindex(_minuteindex);
            }}
          >
            <Text style={ss.textButton}>NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ss.button}
            onPress={() => {
              props.onCancel();
            }}
          >
            <Text style={ss.textButton}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ss.button}
            onPress={() => {
              props.onOk(datevalue);
            }}
          >
            <Text style={ss.textButton}>OK</Text>
          </TouchableOpacity>

          {/* <Text style={{ color: 'red', fontSize: 20 }}>{monthindex}</Text> */}
        </View>
      </View>

      {/* <Text style={{ color: 'red', fontSize: 20 }}>MonthIndex {monthindex}</Text> */}
      {/* {__DEV__ && _.isDate(datevalue) && (
        <Text style={{ fontSize: 22 }}>{datevalue.toISOString()}</Text>
      )}
       */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    backgroundColor: "#1f1f1f8a",
    height: "100%",
    width: "100%",
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
  },
  wrapper: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    // fix show line issue
    width: "100%",
    // z Index: 1,
  },
  buttons: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: 300,
    backgroundColor: "white",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export default PickerTime;
