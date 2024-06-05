import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import AndroidPickerTimeHour from "../components/DatetimeSelector/AndroidPickerTimeHour";
import AndroidPickerTimeMinute from "../components/DatetimeSelector/AndroidPickerTimeMinute";
import { ss, ssTime } from "../styles/Styles";

const BWPickerTime = ({ onOk, onCancel, onOther }) => {
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

  // if (p rops.showtime === false) {
  //   return null;
  // }
  if (!_.isDate(datevalue)) {
    console.log("===============================");
    return <Text>Loading..........</Text>;
  }

  return (
    <View style={ssTime.container}>
      {/* <View style={ss.viewLog}>
        <Text style={ss.textGreen}>
          {datevalue.toLocaleTimeString("th-TH")}
        </Text>
      </View> */}

      <View style={ssTime.wrapper}>
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

      {/* <View style={ssTime.buttons}> */}
      <View style={ssTime.buttonWrapper}>
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
            onCancel();
          }}
        >
          <Text style={ss.textButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ss.button}
          onPress={() => {
            onOk(datevalue);
          }}
        >
          <Text style={ss.textButton}>OK</Text>
        </TouchableOpacity>

        {/* <Text style={{ color: 'red', fontSize: 20 }}>{monthindex}</Text> */}
      </View>
      {/* </View> */}
    </View>
  );
};

export default BWPickerTime;
