import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // React Native와 React.js는 다르다.
    // <div> 대신에 <View>를 쓴다. -> import 해줘야한다.
    // 모든 <View>는 flex container다. (flex-direction은 column이 default다.)
    // 모든 텍스트는 <Text> 안에 써야한다.
    // StatusBar는 핸드폰에 시간, 와이파이, 배터리를 의미한다.
    // flex는 화면의 비율이다 (1:2:1). 부모의 flex는 비교대상이 없기 때문에 바꿔도 똑같다.
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 2, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet.create를 쓰면 자동완성을 지원하기 때문에 도움이 된다.
// 웹이 아니기 때문에 모든 CSS가 적용되지는 않는다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
