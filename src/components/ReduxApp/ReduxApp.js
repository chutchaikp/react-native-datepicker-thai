import {
  Button,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Header from "./Header";
import Footer from "./Footer";
import { ssRedux } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCount } from "../../redux/counterSlice";
import { ss } from "../../styles/Styles";

const ReduxApp = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const [showpopup, setShowpopup] = useState(false);

  const handleOnClose = useCallback(() => setShowpopup(false), []);
  return (
    <View style={ssRedux.container}>
      <Header />
      <View style={ssRedux.viewRow}>
        <Text>ReduxApp</Text>
        <Text>Redux Example</Text>
        <Text style={ssRedux.textCounter}>Count: {count}</Text>

        <Button
          color={"#019199"}
          // style={ssRedux.button}
          title="Increment"
          onPress={() => dispatch(increment())}
        />

        <Button
          style={ssRedux.button}
          title="Decrement"
          onPress={() => dispatch(decrement())}
        />

        <TouchableOpacity onPress={() => setShowpopup(true)}>
          <Text>SHOW POPUP</Text>
        </TouchableOpacity>

        {/* theme={{colors: {backdrop: 'rgba(255, 255, 255, 0.7)'}} */}

        <Modal transparent style={{ padding: 30 }} visible={showpopup}>
          <Mypopup onClose={handleOnClose} />
        </Modal>
      </View>
      <Footer />
    </View>
  );
};

export default ReduxApp;

const Mypopup = memo(
  ({ onClose }) => {
    console.log("Mypopup - render");
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [itemData] = useState(() => {
      return [
        { title: "Title Text", key: "item1" },
        { title: "Title Text 2", key: "item2" },
        { title: "Title Text 3", key: "item3" },
      ];
    });

    useEffect(() => {
      console.log("Mypopup - useEffect[]");
    }, []);

    console.log("Mypopup - render 2");

    const onRenderItem = useCallback(
      ({ item, index, separators }) => {
        console.log("Flatlist - onRenderItem");
        return (
          <TouchableHighlight
            key={item.key}
            onPress={() => console.log("Onpress")}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
          >
            <View style={{ backgroundColor: "white" }}>
              <Text>{item.title}</Text>
            </View>
          </TouchableHighlight>
        );
      },
      [itemData],
    );

    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={ss.buttonBlue}
            onPress={() => dispatch(increment())}
          >
            <Text>{count}</Text>
          </TouchableOpacity>

          <FlatList
            // ItemSeparatorComponent={
            //   Platform.OS !== "android" &&
            //   (({ highlighted }) => <View style={{ marginLeft: 0 }} />)
            // }
            // keyExtractor={(itm) => itm.key}
            data={itemData}
            renderItem={onRenderItem}
          />

          <TouchableOpacity style={ss.buttonBlue} onPress={onClose}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  (prev, next) => {
    return _.isEqual(prev, next);
  },
);
Mypopup.displayName = "Mypopup";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: "yellow",
    backgroundColor: "transparent",
  },
  modalView: {
    alignSelf: "stretch",
    margin: 20,
    backgroundColor: "red",
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
});
