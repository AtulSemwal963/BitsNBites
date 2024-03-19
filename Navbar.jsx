import React,{useState,useEffect} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessScreen from './MessScreen';
import RestoUScreen from './RestoUScreen';
import TuckShopScreen from './TuckShopScreen';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

export default function Navbar({navigator}) {
  const RestoULabel=`🍔\nResto-U`;
  const MessLabel=`🍽️\nMess`;
  const TuckShopLabel='📏\nTuck Shop';
  const [mode] = useGlobalState('mode');
  const [backGroundColor] = useGlobalState('backGroundColor');
  const [fontColor] = useGlobalState('fontColor');
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

  return (   
<Tab.Navigator style={{backgroundColor:mode}} className='    text-center text-sm p-2 text-gray-500' screenOptions={{
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
        <Tab.Screen name={RestoULabel} component={RestoUScreen} />
        <Tab.Screen name={MessLabel} component={MessScreen} />
        <Tab.Screen name={TuckShopLabel} component={TuckShopScreen}/>
      </Tab.Navigator>
  )
}
