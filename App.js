import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';

// 핸드폰 너비 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 원래 API_KEY는 보안상 이렇게 쓰면 안된다.
const API_KEY = "4df12dc05ba30fc9f2bbf52c85e6861c";

// 필요한 아이콘
const icons = {
  "Clouds" : "cloudy",
  "Clear" : "day-sunny",
  "Snow" : "snow",
  "Rain" : "rains",
}

// ScrollView는 style이 안 먹힌다. -> contentContainerStyle을 사용한다.
export default function App() {
  // 유저 위치 정보 얻기
  const [ city, setCity ] = useState("Loading..");
  const [ days, setDays ] = useState([]);
  const [ ok, setOk ] = useState(true);
  const getWeather = async() => {
    // 사용자 허용
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    // 위도와 경도 추출
    const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // reverseGeocodeAsync : 위도와 경도를 가져와 사람이 알 수 있는 주소로 바꿔준다.
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false});
    setCity(location[0].city);
    // API call
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, [])
  return (
    <View style={ styles.container }>
      <StatusBar style="light"></StatusBar>
      <View style={ styles.city }>
        <Text style={ styles.cityName }>{city}</Text>
      </View>
      <ScrollView 
        horizontal 
        pagingEnabled
        showsHorizontalScrollIndicator="false" 
        contentContainerStyle={ styles.weather }
      >
        {days.length === 0 ? (
        <View style= { styles.day }>
          <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }}/>
        </View>
        ) : (
          days.map((day, index) => 
          <View key={ index } style= { styles.day }>
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
              <Text style={ styles.temperature }>{ parseFloat(day.temp.day).toFixed(1) }</Text>
              <Fontisto name={ icons[day.weather[0].main] } size={ 68 } color="white" />
            </View>
            <Text style={ styles.description }>{ day.weather[0].main }</Text>
            <Text style={ styles.tinyText }>{ day.weather[0].description }</Text>
          </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "black",
  },
  city: {
    flex: 1,
    // 세로로 중앙에 위치
    justifyContent: "center",
    // 가로로 중앙에 위치
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    fontWeight: "500",
    color: "white",
  },
  weather: {
    // ScrollView는 swipe하면서 화면이 넘어가는게 당연하므로 flex속성을 주지 않는다.
  },
  day: {
    width: SCREEN_WIDTH,
  },
  temperature: {
    marginTop: 50,
    fontSize: 120,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 60,
    color: "white",
  },
  tinyText: {
    fontSize: 30,
    color: "white",
  },
})
