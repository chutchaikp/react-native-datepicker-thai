// Avoid anonymous function on renderItem

// For functional components, move the renderItem function
// outside of the returned JSX. Also, ensure that it is wrapped in
// a useCallback hook to prevent it from being recreated each render.

// For class componenents, move the renderItem function outside of the render function,
// so it won't recreate itself each time the render function is called.

// const renderItem = useCallback(({item}) => (
// 	<View key={item.key}>
// 		 <Text>{item.title}</Text>
// 	</View>
// ), []);
// return (
//  // ...
//  <FlatList data={items} renderItem={renderItem} />;
//  // ...
// );

// useCallback ------- cache a function
// useCallback is a React Hook that lets you cache a function definition between re-renders.

// React Hooks เพิ่มความสามารถและความยืดหยุ่นในการจัดการสถานะและ lifecycle ใน React function components โดยมี fuctions หลักๆ คือ useState, useEffect, และ useCallback

// ในบทความนี้ เราจะทำความเข้าใจเกี่ยวกับ useCallback ฟีเจอร์ที่อาจดูเหมือนไม่มีความสำคัญมากนัก แต่ useCallback เป็นเครื่องมือที่ดีมากๆ สำหรับการเพิ่มประสิทธิภาพและประสิทธิผลของแอปพลิเคชัน React

// ป็นวิธีที่มีประโยชน์มากในการป้องกันการสร้าง function ใหม่ทุกครั้งที่ component มีการ render
// หรือ re-render, ซึ่งสามารถนำไปสู่ประสิทธิภาพที่ลดลงเนื่องจากใช้ทรัพยากรณ์เพิ่มขึ้นเพื่อใช้สร้างฟังชั่นเดิมๆ

// ความสำคัญของ useCallback อยู่ที่สามารถช่วยปรับปรุงประสิทธิภาพการทำงานของ React component
// ได้ด้วยการกำหนด function ที่จะไม่ถูกสร้างใหม่เวลา re-render

// ทั้งนี้การใช้งาน useCallBack อาจจะต้องเข้าใจเกี่ยวกับ closure ใน JavaScript
// และการทำงานของ React ในการจัดการการ render และ re-render ของ components ซะก่อน

// closure = ?

// จากผลลัพสรุปได้ว่า memo ไม่ช่วยเลย เพราะในกรณีนี้ functions onClick มีการเปลี่ยนแปลงตลอดนั่นเองครับซึ่งก็เปลี่ยนแปลงเพราะ component App มีการ re-render เนื่องจาก state count มีการ update (มาเป็นทอดๆ)
// ลองเปลี่ยนไปใช้ useCallback

import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';

const ExpensiveApp = ({ onUpdate }) => {
  console.log('--ExpensiveApp - rendering...');

  return (
    <Pressable style={styles.button} onPress={onUpdate}>
      <Text style={styles.buttonText}>Expensive button</Text>
    </Pressable>
  );
};

const MemoExpensiveApp = memo(ExpensiveApp);

//   },
//   (prev, next) => {
//     console.log(` prev.onPress === next.onPress ${prev.onPress == next.onPress} `);
//     console.log(` prev === next ${prev == next} `);
//     return prev == next;
//   }
// );

const UsecallbackApp = () => {
  console.log('-UsecallbackApp - rendering...');
  const [count, setCount] = useState(0);

  const updateCounter = useCallback(() => {
    // console.log('updateCounter() - re-created count: ' + count);
    setCount((c) => c + 1);
  }, []);

  return (
    <View style={styles.main}>
      <MemoExpensiveApp onUpdate={updateCounter} />
      <Text>{count}</Text>
    </View>
  );
};

const UsecallbackAppBak2 = () => {
  const [num, setNum] = useState(0);

  const [search, setSearch] = useState('init');

  const update = () => {
    setNum(num + 1);
    setSearch(search + (num + 1).toString());

    const now = new Date().toISOString();
    console.log(now);
  };

  const updateCallback = useCallback(() => {
    console.log(`num: ${num} search: ${search}`);

    const now = new Date().toISOString();
    console.log(now);
  }, []);

  const updateCallback2 = useCallback(() => {
    console.log(`num: ${num} search: ${search}`);
    const now = new Date().toISOString();
    console.log(now);
  }, [search, num]);

  return (
    <View style={styles.main}>
      <Pressable style={styles.button} onPress={update}>
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={updateCallback}>
        <Text style={styles.buttonText}>Update callback</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={updateCallback2}>
        <Text style={styles.buttonText}>Update callback 2</Text>
      </Pressable>

      <Text style={styles.textResult}>
        num: {num} search: {search}
      </Text>
    </View>
  );
};

const UsecallbackAppBak = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const updateText = () => {
    console.log('Text updated');
    setText(text + count.toString());
  };

  const updateCount = () => {
    console.log('Count updated'); // , new Date().toISOString());
    setCount(count + 1);
  };

  const printCount = useCallback(() => {
    console.log('Count =', count);
  }, [count]);

  return (
    <View style={styles.main}>
      <Pressable style={styles.button} onPress={updateText}>
        <Text style={styles.buttonText}>Update text</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={updateCount}>
        <Text style={styles.buttonText}>Update count</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={printCount}>
        <Text style={styles.buttonText}>Print count</Text>
      </Pressable>

      <Text style={styles.textResult}>text: {text}</Text>
      <Text style={styles.textResult}>count: {count}</Text>
    </View>
  );
};

export default UsecallbackApp;

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
  button: {
    // width: 55,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'blue',
    fontWeight: '700',
  },
});

// components
