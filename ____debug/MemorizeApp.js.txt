import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import _ from 'lodash';

// how memo working

const MemorizeApp = () => {
  const [myname, setMyname] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');

  console.log(`- MemorizeApp - Rendering... search: ${search}`);

  return (
    <View style={styles.main}>
      <Text>Search</Text>
      <SearchBox
        search={search}
        onCompleted={(val) => {
          setSearch(val);
        }}
      />
      <Text style={styles.textResult}>{search}</Text>

      <Text>Name </Text>
      <TextInput value={myname} style={styles.textInput} onChangeText={(text) => setMyname(text)} />
      <NameComponent myname={myname} />
      {/* 
      <Text>Email</Text>
      <TextInput value={email} style={styles.textInput} onChangeText={(text) => setEmail(text)} />
      <EmailComponent email={email} /> */}
    </View>
  );
};

export default MemorizeApp;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f05',
    padding: 50,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 40,
    paddingLeft: 20,

    // height: 40,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
  },
  textResult: {
    color: 'red',
    fontSize: 25,
  },
});

// components
const NameComponent = memo(
  ({ myname }) => {
    console.log('NameComponent - Rendering!');
    return <Text style={styles.textResult}>{myname}</Text>;
  },
  (prev, next) => {
    // console.log('NameComponent - C omparing!');
    return prev.myname === next.myname;
  }
);
// (prevProps, nextProps) => {
//   return  nextProps.myname === prevProps.myname
// }
const EmailComponent = memo(
  ({ email }) => {
    console.log('Rendering EmailComponent!');
    return <Text style={styles.textResult}>{email}</Text>;
  },
  (prev, next) => {
    return prev.email === next.email;
  }
);

//#region How to useDebounce
const useDebounce = ({ searchVal, delay }) => {
  const [debounceValue, setDebounceValue] = useState(searchVal);
  console.log(
    `--- useDebounce - Rendering.... searchVal: ${searchVal} debounceValue: ${debounceValue} `
  );
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(
        `--- useDebounce - ValueChanged! searchVal: ${searchVal} debounceValue: ${debounceValue} `
      );
      setDebounceValue(searchVal); // re-render function useDebounce when any state changed
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal, delay]);

  // console.log(`--- useDebounce - RETURN searchVal: ${searchVal} debounceValue: ${debounceValue} `);
  // return debounceValue;

  if (searchVal === debounceValue) {
    console.log(
      `--- useDebounce =====> RETURN searchVal: ${searchVal} debounceValue: ${debounceValue} `
    );
    return debounceValue;
  }
};

const SearchBox = memo(
  ({ onCompleted }) => {
    const [searchVal, setSearchVal] = useState('');
    console.log(`-- SearchBox - Rendering...  searchVal: ${searchVal}`);

    // TODO: check - can not pass the argruments to custom hook ?
    const debounceValue = useDebounce({ searchVal, delay: 2000 });

    useEffect(() => {
      console.log('-- SearchBox - useEffect[debounceValue]', debounceValue);
      console.log(`typeof ${typeof debounceValue} `);
      if (_.isString(debounceValue)) {
        onCompleted(debounceValue);
      }
    }, [debounceValue]);

    return <TextInput style={styles.textInput} onChangeText={(text) => setSearchVal(text)} />;
  },
  (prevProps, nextProps) => {
    const isEqual = prevProps.search === nextProps.search;
    console.log(`-- SearchBox.memo Comparing...${isEqual ? 'truex' : 'falsex'}`);
    return prevProps.search === nextProps.search;
  }
);
//#endregion
