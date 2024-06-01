import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import _ from "lodash";

import AndroidPickerMonth from "./components/AndroidPickerMonth";
import AndroidPickerDay from "./components/AndroidPickerDay";
import AndroidPickerYear from "./components/AndroidPickerYear";
import { useCallback, useEffect, useState } from "react";

import { ss, ssDate } from "./styles/Styles";

const PickerDate = (props) => {
  const [datevalue, setDatevalue] = useState(null);

  const [dateindex, setDateindex] = useState(null);
  const [monthindex, setMonthindex] = useState(null);
  const [yearindex, setYearindex] = useState(null);

  useEffect(() => {
    const newdate = new Date();
    const d = newdate.getDate();
    const m = newdate.getMonth();
    const y = newdate.getFullYear();

    setDatevalue(newdate);
    setDateindex(d - 1);
    setMonthindex(m);
    setYearindex(y - 2021);
  }, []);

  useEffect(() => {
    // props.onDatevalueChanged(datevalue);
    // 3 + ? = 2024
    const nd = new Date(yearindex + 2021, monthindex, dateindex + 1, 8, 8, 8);
    setDatevalue(nd);
  }, [dateindex, monthindex, yearindex]);

  const dateOnIndexChanged = useCallback((index) => {
    console.log(`PickerDate.AndroidPickerDay.onIndexChanged index: ${index}`);
    setDateindex(index);
  }, []);

  const monthOnIndexChanged = useCallback((index) => {
    console.log(
      `PickerDate.AndroidPickerMonth.onIndexChanged index: ${index} `,
    );
    setMonthindex(index);
  }, []);

  const yearOnIndexChanged = useCallback((index) => {
    console.log(`PickerDate.AndroidPickerYear.onIndexChanged index: ${index} `);
    setYearindex(index);
  }, []);

  if (props.showdate === false) {
    return null;
  }
  if (!_.isDate(datevalue)) {
    console.log("===============================");
    return <Text>Loading..........</Text>;
  }

  return (
    <View style={ssDate.container}>
      <View style={ssDate.wrapper} onPress={() => props.onCancel()}>
        <AndroidPickerDay
          onIndexChanged={dateOnIndexChanged}
          dateindex={dateindex}
          itemHeight={40}
          fontSize={18}
        />

        <AndroidPickerMonth
          onIndexChanged={monthOnIndexChanged}
          monthindex={monthindex}
          itemHeight={40}
          fontSize={18}
        />

        <AndroidPickerYear
          onIndexChanged={yearOnIndexChanged}
          yearindex={yearindex}
          itemHeight={40}
          fontSize={18}
        />
      </View>
      {/* <View style={ssDate.buttons}> */}
      <View style={ssDate.buttonWrapper}>
        <TouchableOpacity
          onPress={() => {
            const _today = new Date();
            const _date = _today.getDate();
            const _month = _today.getMonth();
            const _year = _today.getFullYear();

            setDateindex(_date - 1);
            setMonthindex(_month);
            setYearindex(_year - 2021);
          }}
        >
          <Text style={ss.textBlue}>วันนี้</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.onCancel();
          }}
        >
          <Text style={ss.textBlue}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.onOk(datevalue);
          }}
        >
          <Text style={ss.textBlue}>ตกลง</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </View>
  );
};

export default PickerDate;
