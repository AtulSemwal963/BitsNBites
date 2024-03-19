
import React, { Component } from 'react';
import { View, Text, ScrollView, Image,Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState, setGlobalState } from './GlobalState';


class MessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt: new Date().toLocaleString(),
      dayOfWeekNumber: new Date().getDay(),
      mode: '', // Initialize mode in state
      backGroundColor: '', // Initialize backGroundColor in state
      fontColor: 'black', // Initialize fontColor in state
      breakfastMeals: [],
      lunchMeals: [],
      snackMeals: [],
      dinnerMeals: []
    };
  }

  calculateCountdown = (hours,minutes) => {
    const breakfastTime = new Date();
    breakfastTime.setHours(hours,minutes, 0); // Set breakfast time to 7:30 AM
  
    const currentTime = new Date();
  
    if (currentTime < breakfastTime) {
      const timeDifference = breakfastTime - currentTime;
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
  
      return ` serves in ${hours}:${minutes}:${seconds}`;
    } else {
      return ' served';
    }
  };

  fetchBreakfast = async () => {
      const response = await fetch('https://bits-n-bitesserver-2.onrender.com/messmenu');
      const data = await response.json();
      const menu = data[new Date().getDay()];
        this.setState({ breakfastMeals: menu.breakfast});
  };
  renderBreakfast=()=>{
  return this.state.breakfastMeals.map((element, index) => (
          <View key={index} className="p-1 items-center">
            <Text className="text-lg p-2 font-semibold" style={{ width: '95%',color:this.state.fontColor }}>{element.title}</Text>
            <Image source={{ uri: element.image }} className="rounded-lg" style={{ height: 150, width: 300}} />
          </View>
        ));
  }
 
  fetchLunch = async () => {
      const response = await fetch('https://bits-n-bitesserver-2.onrender.com/messmenu');
      const data = await response.json();
      const menu = data[new Date().getDay()]
        this.setState({ lunchMeals: menu.lunch });
  };
  renderLunch=()=>{
  
  return this.state.lunchMeals.map((element, index) => (
          <View key={index} className="p-1 items-center">
            <Text className="text-lg p-2 font-semibold" style={{ width: '95%',color:this.state.fontColor }}>{element.title}</Text>
            <Image source={{ uri: element.image }} className="rounded-lg" style={{ height: 150, width: 300}} />
          </View>
        ));
  }

  fetchSnacks = async () => {
      const response = await fetch('https://bits-n-bitesserver-2.onrender.com/messmenu');
      const data = await response.json();
      const menu = data[new Date().getDay()];
        this.setState({ snackMeals: menu.snacks })
  };
  renderSnacks=()=>{
  
  return this.state.snackMeals.map((element, index) => (
          <View key={index} className="p-1 items-center">
            <Text className="text-lg p-2 font-semibold" style={{ width: '95%',color:this.state.fontColor }}>{element.title}</Text>
            <Image source={{ uri: element.image }} className="rounded-lg" style={{ height: 150, width: 300}} />
          </View>
        ));
  }
 
  fetchDinner = async () => {
      const response = await fetch('https://bits-n-bitesserver-2.onrender.com/messmenu');
      const data = await response.json();
      const menu = data[new Date().getDay()];
        this.setState({ dinnerMeals: menu.dinner });
  };
  renderDinner=()=>{
  
  return this.state.dinnerMeals.map((element, index) => (
          <View key={index} className="p-1 items-center">
            <Text className="text-lg p-2 font-semibold" style={{ width: '95%',color:this.state.fontColor }}>{element.title}</Text>
            <Image source={{ uri: element.image }} className="rounded-lg" style={{ height: 150, width: 300}} />
          </View>
        ));
  }

 
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        dt: new Date().toLocaleString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        dayOfWeekNumber: new Date().getDay() // Update day of week number
      });
    }, 1000);
    this.loadModeFromStorage();
    this.throttledLoadModeFromStorage = this.throttle(this.loadModeFromStorage, 4000); // Throttle to call every 5 seconds
    this.intervalLoadMode = setInterval(this.throttledLoadModeFromStorage, 5000)
      this.fetchBreakfast();
    this.fetchLunch();
    this.fetchSnacks();
    this.fetchDinner();
     // Call initially
    
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
 
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const context = this;
      const args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  loadModeFromStorage = async () => {
    try {
      const storedMode = await AsyncStorage.getItem('mode');
      if (storedMode !== null) {
        this.setState({ mode: storedMode,
        backGroundColor:storedMode === '#121212' ? '#202020' : '#F6F6F6',
      fontColor:storedMode === '#121212' ? 'white' : 'black' });
      }
      
    } catch (error) {
      console.error('Error loading mode from AsyncStorage:', error);
    }
  };

render() {
  const { mode,backGroundColor,fontColor } = this.state;
  
  return (
    <View style={{ backgroundColor: mode }}>
      <ScrollView className="h-full top-3" style={{ width: '95%', backgroundColor:mode }}>
        <View className="p-4 rounded-xl" style={{ elevation: 2, backgroundColor: backGroundColor }}>
          <Text className="text-gray-500 text-lg font-semibold">Date</Text>
          <Text className="text-xl font-bold" style={{ color: fontColor }}>{this.state.dt}</Text>
        </View>
        <View>
          <View className="flex-row justify-between self-center" style={{ width: '95%', paddingTop: 15, paddingBottom: 10 }}>
            <Text className="text-xl font-bold self-end" style={{ color: fontColor }}>Breakfast
              <Text className="text-red-700 italic text-sm">{this.calculateCountdown(7, 30)} </Text>
            </Text>
            <Button title="Set Reminder" color="#BF1A2F" className="rounded-lg" disabled={this.calculateCountdown(7, 30) === ' served'} />
          </View>
          <View className="p-4 rounded-xl" style={{ backgroundColor: backGroundColor }}>
            {this.renderBreakfast()}
          </View>
        </View>
        <View>
          <View className="flex-row justify-between self-center" style={{ width: '95%', paddingTop: 15, paddingBottom: 10 }}>
            <Text className="text-xl font-bold self-end" style={{ color: fontColor }}>Lunch
              <Text className="text-red-700 italic text-sm">{this.calculateCountdown(11, 45)} </Text>
            </Text>
            <Button title="Set Reminder" color="#BF1A2F" className="rounded-lg" disabled={this.calculateCountdown(11, 45) === ' served'} />
          </View>
          <View className="p-4 rounded-xl" style={{ backgroundColor: backGroundColor }}>
            {this.renderLunch()}
          </View>
        </View>
        <View>
          <View className="flex-row justify-between self-center" style={{ width: '95%', paddingTop: 15, paddingBottom: 10 }}>
            <Text className="text-xl font-bold self-end" style={{ color: fontColor }}>Snacks
              <Text className="text-red-700 italic text-sm">{this.calculateCountdown(16, 15)} </Text>
            </Text>
            <Button title="Set Reminder" color="#BF1A2F" className="rounded-lg" disabled={this.calculateCountdown(16, 15) === ' served'} />
          </View>
          <View className="p-4 rounded-xl" style={{ backgroundColor: backGroundColor }}>
            {this.renderSnacks()}
          </View>
        </View>
        <View>
          <View className="flex-row justify-between self-center" style={{ width: '95%', paddingTop: 15, paddingBottom: 10 }}>
            <Text className="text-xl font-bold self-end" style={{ color: fontColor }}>Dinner
              <Text className="text-red-700 italic text-sm">{this.calculateCountdown(19, 30)} </Text>
            </Text>
            <Button title="Set Reminder" color="#BF1A2F" className="rounded-lg" disabled={this.calculateCountdown(19, 30) === ' served'} />
          </View>
          <View className="p-4 rounded-xl" style={{ backgroundColor: backGroundColor }}>
            {this.renderDinner()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

}

export default MessScreen;


