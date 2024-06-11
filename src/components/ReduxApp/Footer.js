import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ssRedux } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCount } from "../../redux/counterSlice";
import { fetchUserData } from "../../redux/personSlice";
import { ss } from "../../styles/Styles";
import { useAppDispatch } from "../../redux/store";

const Footer = () => {
  console.log("Footer - render...");

  const dispatch = useAppDispatch(); // useDispatch();

  const { data, loading, error } = useSelector((state) => state.person);

  const count = useSelector(selectCount);

  const [speedData, setSpeedData] = useState([]);

  useEffect(() => {
    console.log(JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    console.log(` error: ${error} loading: ${loading} data: ${data} `);
  }, [data, loading, error]);

  // const handleMe = () => {
  //   dispatch(fetchUserData())
  //     .unwrap()
  //     .then((originalPromiseResult) => {
  //       // handle result here
  //       // originalPromiseResult
  //       console.log("if done ======> ", originalPromiseResult);
  //     })
  //     .catch((rejectedValueOrSerializedError) => {
  //       // handle error here
  //       console.log("if catch");
  //     });
  // };

  // OK WORKING
  const handleMeOK = async () => {
    try {
      const resultAction = await dispatch(fetchUserData());
      if (fetchUserData.fulfilled.match(resultAction)) {
        // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
        const data = resultAction.payload;
        // showToast('success', `Updated ${user.first_name} ${user.last_name}`)
        console.log("DATA OK", data);
      } else {
        if (resultAction.payload) {
          console.log("Error 1 :(");
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
          console.log(resultAction.payload.error);
          // resultAction.payload; //  .field_errors
        } else {
          // showToast('error', `Update failed: ${resultAction.error}`)
          console.log("Something went wrong :(");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // OK - WORKING TOO
  const handleMe = async () => {
    try {
      // await dispatch(fetchUserData());
      // {"meta": {"arg": undefined, "requestId": "Loa03nf-wXglKpldbSmZh", "requestStatus": "fulfilled"}, "payload": [{"F

      // .unwrap() = get payload prop
      const speeds = await dispatch(fetchUserData()).unwrap();
      console.log("OK", speeds);
      setSpeedData(speeds);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      // console.log(JSON.stringify(err));
    }
  };

  return (
    <View style={ssRedux.viewRow}>
      {loading && (
        <View>
          <Text> Loading.. </Text>
        </View>
      )}

      {error && (
        <View>
          <Text>Error: {error} </Text>
        </View>
      )}

      <Text>Footer</Text>
      <Text>{count}</Text>

      <TouchableOpacity style={ss.button} onPress={handleMe}>
        <Text>load async thunk</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ss.button} onPress={() => setSpeedData([])}>
        <Text>clear</Text>
      </TouchableOpacity>

      <Text> Speed data: {speedData.length} </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
