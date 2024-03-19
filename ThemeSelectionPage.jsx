
import React, { useState, useEffect } from 'react';
import { View, Switch, Text } from 'react-native';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeSelectionPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useGlobalState('mode');
  const [modeText, setModeText] = useState(mode === '#121212' ? 'Dark Mode' : 'Light Mode');
  
  // Get fontColor and backgroundColor from global state
  const [fontColor, setFontColor] = useGlobalState('fontColor');
  const [backgroundColor, setBackgroundColor] = useGlobalState('backGroundColor');
  
  useEffect(() => {
    loadMode(); // Load mode from AsyncStorage on component mount
  }, []);

  useEffect(() => {
    setFontColor(mode === '#121212' ? 'white' : 'black');
    setBackgroundColor(mode === '#121212' ? '#202020' : '#F6F6F6');
  }, [mode]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    const newMode = mode === 'white' ? '#121212' : 'white';
    setMode(newMode);
    setModeText(newMode === '#121212' ? 'Dark Mode' : 'Light Mode');
    saveMode(newMode);
  };

  const loadMode = async () => {
    try {
      const storedMode = await AsyncStorage.getItem('mode');
      if (storedMode !== null) {
        setMode(storedMode);
        setIsEnabled(storedMode === '#121212');
        setModeText(storedMode === '#121212' ? 'Dark Mode' : 'Light Mode');
        // No need to set fontColor and backgroundColor here, they will be updated in the useEffect
      }
    } catch (error) {
      console.error('Error loading mode:', error);
    }
  };

  const saveMode = async (newMode) => {
    try {
      await AsyncStorage.setItem('mode', newMode);
    } catch (error) {
      console.error('Error saving mode:', error);
    }
  };

  return (
    <View style={{ backgroundColor: mode, alignItems: 'center', flex: 1 }}>
      <Text className="text-lg font-semibold text-gray-500 self-start my-4 mx-4">Toggle Mode</Text>
      <View className="flex-row justify-around rounded-xl" style={{ backgroundColor: backgroundColor, width: "95%" }}>
        <Text className="justify-center font-semibold top-3" style={{ fontSize: 17, color: fontColor }}>{modeText}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#F98080' }}
          thumbColor={isEnabled ? '#C81E1E' : '#C81E1E'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} // Scale the Switch
        />
      </View>
    </View>
  );
};

export default ThemeSelectionPage;


