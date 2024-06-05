import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import _ from "lodash";
import { ss, ssModal } from "../styles/Styles";
import BWPickerDate from "./BWPickerDate";
import { useDispatch, useSelector } from "react-redux";
import { selectorChange, dateFrom, dateTo } from "../redux/dateSelectorSlice";
import moment from "moment";
const BWModalDate = ({ type }) => {
  const _dateFrom = useSelector(dateFrom);
  const _dateTo = useSelector(dateTo);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [isPress, setIsPress] = useState(false);

  // var touchProps = {
  //   activeOpacity: 1,
  //   underlayColor: "blue", // <-- "backgroundColor" will be always overwritten by "underlayColor"
  //   style: isPress ? ssModal.btnPress : ssModal.btnNormal, // <-- but you can still apply other style changes
  //   onHideUnderlay: () => setIsPress(false),
  //   onShowUnderlay: () => setIsPress(true),
  //   onPress: () => console.log("HELLO"), // <-- "onPress" is apparently required
  // };

  return (
    <View style={ssModal.modalComponent}>
      {/* <TouchableHighlight {...touchProps}>
        <Text style={ssModal.textStyle}>Click here</Text>
      </TouchableHighlight> */}

      <TouchableOpacity style={ss.buttonBlue} onPress={() => setShow(true)}>
        <View>
          <Text style={ss.textButtonBlue}>
            {type === "from"
              ? moment(_dateFrom).toISOString()
              : moment(_dateTo).toISOString()}
          </Text>
          <Text style={ss.textButtonBlue}>
            {type === "from"
              ? moment(_dateFrom).format()
              : moment(_dateTo).format()}
          </Text>
          {/* <Text style={ss.textButtonBlue}>
            { type=== "from" ? moment(_dateFrom).toISOString() :  moment(_dateTo).toISOString()}
          </Text> */}
        </View>
      </TouchableOpacity>

      {/* 'none' | 'slide' | 'fade' */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <View style={ssModal.centeredView}>
          <View style={ssModal.modalView}>
            <BWPickerDate
              type={type}
              onOk={(val) => {
                setShow(false);
              }}
              onCancel={() => {
                setShow(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BWModalDate;
