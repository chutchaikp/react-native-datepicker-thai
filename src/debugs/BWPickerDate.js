import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import _ from "lodash";

import AndroidPickerMonth from "../components/DatetimeSelector/AndroidPickerMonth";
import AndroidPickerDay from "../components/DatetimeSelector/AndroidPickerDay";
import AndroidPickerYear from "../components/DatetimeSelector/AndroidPickerYear";
import { memo, useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectorChange, dateFrom, dateTo } from "../redux/dateSelectorSlice";

import { ss, ssDate } from "../styles/Styles";
import moment from "moment";

// type = [ "from", "to" ]
const BWPickerDate = memo(({ type, onCancel, onOk }) => {
  const _dateFrom = useSelector(dateFrom);
  const _dateTo = useSelector(dateTo);

  const dispatch = useDispatch();

  const [datevalue, setDatevalue] = useState(null);

  const [dateindex, setDateindex] = useState(null);
  const [monthindex, setMonthindex] = useState(null);
  const [yearindex, setYearindex] = useState(null);

  useEffect(() => {
    let newdate = moment(_dateFrom); //  new Date();
    if (type === "to") {
      newdate = moment(_dateTo);
    }

    const d = newdate.date(); // .getDate();
    const m = newdate.month(); //.getMonth();
    const y = newdate.year(); // .getFullYear();

    // setDatevalue(newdate);
    setDateindex(d - 1);
    setMonthindex(m);
    setYearindex(y - 2021);
  }, []);

  useEffect(() => {
    // .onDatevalueChanged(datevalue);
    // 3 + ? = 2024
    const m = moment().utcOffset(7 * 60);
    m.set({
      year: yearindex + 2021,
      month: monthindex,
      date: dateindex + 1,
      hour: 0,
      minute: 0,
    });
    // const nd = new Date(yearindex + 2021, monthindex, dateindex + 1, 8, 8, 8);
    const iso = m.toISOString();
    console.log(`iso: ${iso} type: ${type}`);
    setDatevalue(iso);
  }, [dateindex, monthindex, type, yearindex]);

  const dateOnIndexChanged = useCallback((index) => {
    // console.log(`PickerDate.AndroidPickerDay.onIndexChanged index: ${index}`);
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

  return (
    <View style={ssDate.container}>
      <View style={ssDate.wrapper} onPress={() => onCancel()}>
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
            onCancel();
          }}
        >
          <Text style={ss.textBlue}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // dispatch
            if (type === "from") {
              dispatch(selectorChange({ dateFrom: datevalue }));
            } else {
              dispatch(selectorChange({ dateTo: datevalue }));
            }

            onOk(null);
          }}
        >
          <Text style={ss.textBlue}>ตกลง</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </View>
  );
});

BWPickerDate.displayName = "BWPickerDate";
export default BWPickerDate;
