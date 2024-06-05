import { Text, View } from "react-native";
import React from "react";
import { ss } from "../styles/Styles";
import BWModalTime from "./BWModalTime";
import BWDateModal from "./BWModalDate";

const BWDatetimeSelectorApp = () => {
  return (
    <View style={ss.viewCenter}>
      <Text>BWDatetimeSelectorApp</Text>

      <View style={ss.viewColumn}>
        <BWDateModal type="from" />
        {/* <BWModalTime /> */}

        {/* <BWDateModal /> */}
        {/* <View style={{ backgroundColor: "yellow" }}>
          <BWDateModal />
          <BWTimeModal />
        </View> */}
      </View>

      <View style={ss.viewColumn}>
        <BWDateModal type="to" />
      </View>
    </View>
  );
};

export default BWDatetimeSelectorApp;
