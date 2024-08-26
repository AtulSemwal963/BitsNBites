import 'react-native-gesture-handler';
import TuckShopCart from './TuckShopCart';
import RestoUCart from './RestoUCart';
import React,{useState,useEffect} from 'react'
import { Text, View, Button, ScrollView, Image, TouchableOpacity,TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HamLogo from './data/images/hamLogo.png'
import LoggedOutGif from './data/images/loggedOutGif.gif'

const Tab = createMaterialTopTabNavigator();

export default function OrderCart() {
  const RestoULabel=`🍔\nResto-U`;
  const TuckShopLabel='📏\nTuck Shop';
  const [mode] = useGlobalState('mode');
  const [backGroundColor] = useGlobalState('backGroundColor');
  const [fontColor] = useGlobalState('fontColor');
  const [isLoggedIn] = useGlobalState('isLoggedIn');

  useEffect(() => {
    const loadModeFromStorage = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('mode');
        if (storedMode !== null) {
          setGlobalState('mode', storedMode);
        }
        const storedBgMode = await AsyncStorage.getItem('backGroundColor');
        if (storedBgMode !== null) {
          setGlobalState('backGroundColor', storedBgMode);
        }
        const storedFontMode = await AsyncStorage.getItem('fontColor');
        if (storedBgMode !== null) {
          setGlobalState('fontColor', storedFontMode);
        }
      } catch (error) {
        console.error('Error loading mode from AsyncStorage:', error);
      }
    };
    

    loadModeFromStorage();
  }, []);

  if(isLoggedIn){
    return(
<Tab.Navigator style={{backgroundColor:mode}} className='text-center text-sm p-2 text-gray-500' screenOptions={{
  tabBarInactiveTintColor:" rgb(107 114 128)",
  tabBarActiveTintColor:"rgb(107 114 128)",
  tabBarIndicatorStyle:{
    backgroundColor:'#BF1A2F',
  },
  tabBarStyle: {
    borderRadius:5,
    width:"103%",
    alignSelf:"center",
    marginTop:-7,
    backgroundColor:backGroundColor
},
tabBarLabelStyle:{textTransform:'capitalize'},

}}>
        <Tab.Screen name={RestoULabel} component={RestoUCart} />
        <Tab.Screen name={TuckShopLabel} component={TuckShopCart}/>
      </Tab.Navigator>
    )
  }
  else{
    return(
      <View className="h-max w-max" style={{backgroundColor:backGroundColor,height:"100%",width:"100%",flexDirection:"column",alignItems:"center"}}>
      <Text className="text-lg font-bold my-8" style={{color:"#6B7280",width:"90%",textAlign:"center"}}> Uh-oh! Looks like someone's floating out there. </Text>
      <Image source={LoggedOutGif} style={{height:200,width:200,opacity:0.4}}/>
      <Text className="text-lg font-bold my-8" style={{color:"#6B7280",width:"90%",textAlign:"center"}}>
      Log in to access your Cart!
      </Text>
      <Text  className="text-lg font-bold" style={{color:"#6B7280",width:"60%",textAlign:"center"}}>
          Tap   <Image source={HamLogo} className="rounded-lg" style={{height:30,width:30}}/>   and navigate to "Account Management" tab 
      </Text>
  </View>
    )
  }
}
