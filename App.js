
import { Text, SafeAreaView,View,Button, Pressable,LogBox} from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Navbar from './Navbar.jsx';
import AccountManagement from './AccountManagement.jsx';
import QueryWallet from './QueryWallet.jsx';
import ThemeSelectionPage from './ThemeSelectionPage.jsx';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import MessScreen  from './MessScreen.jsx';
import OrderCart from './OrderCart.jsx';
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App (props) {

  const [mode, setMode] = useGlobalState('mode');
  const [modeText, setModeText] = useState(mode === '#121212' ? 'Dark Mode' : 'Light Mode');
 const [fontColor, setFontColor] = useGlobalState('fontColor');
  const [backgroundColor, setBackgroundColor] = useGlobalState('backGroundColor');
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn');



  useEffect(() => {
    LogBox.ignoreLogs(['Possible unhandled promise rejection'])
    loadMode(); 
  }, []);
useEffect(() => {
    setFontColor(mode === '#121212' ? 'white' : 'black');
    setBackgroundColor(mode === '#121212' ? '#202020' : '#F6F6F6');
   
  }, [mode]);
 const loadMode = async () => {
    try {
      const storedMode = await AsyncStorage.getItem('mode');
      if (storedMode !== null) {
        setMode(storedMode);
        setModeText(storedMode === '#121212' ? 'Dark Mode' : 'Light Mode');
        const storedStatus = await AsyncStorage.getItem('isLoggedIn');
        if (storedStatus !== null) {
          setIsLoggedIn(storedStatus === 'true');
        }
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
  if(!isLoggedIn){
    return(<AccountManagement/>)
  }

  return (
    <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: mode, 
          width: 250, 
          paddingTop:10,
          borderRadius:5,
        },
        drawerActiveTintColor:"#BF1A2F",
        drawerInactiveTintColor:fontColor,
        headerStyle: {
          backgroundColor: '#BF1A2F', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold', 
          
        }
      }}>
      <Drawer.Screen
        name="MainPage"
        options={{
          label:"Home",
          title: "Home"
        }}
        component= {Navbar}
         />
         <Drawer.Screen name="AccountManagement" options={{
          label:"AccountManagement",
          title: "Account Management",
          
        }}
        component={AccountManagement}/>
        <Drawer.Screen name="QueryWallet" options={{
          label:"QueryWallet",
          title: "BnB Wallet"
        }}
        component={QueryWallet}/>
                <Drawer.Screen name="OrderCart" options={{
          label:"OrderCart",
          title: "View Cart",
        }}
        component={OrderCart}/>
        <Drawer.Screen name="ThemeSelectionPage" options={{
          label:"ThemeSelectionPage",
          title: "Theme Selection",
        }}
        
        component={ThemeSelectionPage}/>
        {() => <MessScreen bgColor={backgroundColor} theme={mode} fontColor={fontColor} />}
    </Drawer.Navigator>
    
  </NavigationContainer>

  )
} 