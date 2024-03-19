// android :  1949272309-0amp1jk7mdu29cjm0jqsa0v6muq4kv4g.apps.googleusercontent.com


import { Text, SafeAreaView,View,Button, Pressable} from 'react-native'
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
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App (props) {
  // useEffect(() => {
  //   const prepare = async () => {
  //     // keep splash screen visible
  //     await SplashScreen.preventAutoHideAsync()

  //     // pre-load your stuff
  //     await new Promise(resolve => setTimeout(resolve, 1000))

  //     // hide splash screen
  //     await SplashScreen.hideAsync()
  //   }
  //   prepare()
  // }, [])
  // const [mode] = useGlobalState('mode');
  //  const [backGroundColor] = useGlobalState('backGroundColor');
  // const [fontColor] = useGlobalState('fontColor');
  // useEffect(() => {
  //   const loadModeFromStorage = async () => {
  //     try {
  //       const storedMode = await AsyncStorage.getItem('mode');
  //       if (storedMode !== null) {
  //         setGlobalState('mode', storedMode);
  //       }
  //       const storedBgMode = await AsyncStorage.getItem('backGroundColor');
  //       if (storedBgMode !== null) {
  //         setGlobalState('backGroundColor', storedBgMode);
  //       }
  //       const storedFontMode = await AsyncStorage.getItem('fontColor');
  //       if (storedBgMode !== null) {
  //         setGlobalState('fontColor', storedFontMode);
  //       }
  //     } catch (error) {
  //       console.error('Error loading mode from AsyncStorage:', error);
  //     }
  //   };

  //   loadModeFromStorage();
  // }, []);

  const [mode, setMode] = useGlobalState('mode');
  const [modeText, setModeText] = useState(mode === '#121212' ? 'Dark Mode' : 'Light Mode');
 const [fontColor, setFontColor] = useGlobalState('fontColor');
  const [backgroundColor, setBackgroundColor] = useGlobalState('backGroundColor');
  
  useEffect(() => {
    loadMode(); // Load mode from AsyncStorage on component mount
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
  const title= <View className="flex-row justify-between w-full">
    <Text className="text-left text-white font-semibold text-lg">Welcome User</Text>
    <Text className="text-right text-white font-semibold text-lg left-36">₹0</Text>
  </View>;

  return (
    <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        // headerTitle:`${title}`,
        drawerStyle: {
          backgroundColor: mode, //Set Drawer background
          width: 250, //Set Drawer width
          paddingTop:10,
          borderRadius:5,
        },
        // drawerActiveBackgroundColor:"#BF1A2F",
        drawerActiveTintColor:"#BF1A2F",
        drawerInactiveTintColor:fontColor,
        headerStyle: {
          backgroundColor: '#BF1A2F', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          
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
         {/* <Drawer.Screen name="Settings" options={{
          label:"Settings",
          title: "Settings"
        }}
        component={SettingScreen}/> */}
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

//Red-#d32f2f
//grey text- #9e9e9e
//light grey bg- #eeeeee