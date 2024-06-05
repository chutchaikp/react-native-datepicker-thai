import { Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import _ from "lodash";
import { ss, ssModal } from "../styles/Styles";
import BWPickerTime from "./BWPickerTime";

const BWModalTime = () => {
  const [show, setShow] = useState(false);
  const [datevalue, setDatevalue] = useState(null);

  return (
    <View style={ssModal.modalComponent}>
      <TouchableOpacity style={ss.buttonBlue} onPress={() => setShow(true)}>
        {_.isDate(datevalue) ? (
          <View>
            <Text style={ss.textButtonBlue}>{datevalue.toISOString()}</Text>
            <Text style={ss.textButtonBlue}>{datevalue.toString()}</Text>
          </View>
        ) : (
          <Text>No date</Text>
        )}
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
            <BWPickerTime
              onOk={(val) => {
                setDatevalue(val);
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

export default BWModalTime;
