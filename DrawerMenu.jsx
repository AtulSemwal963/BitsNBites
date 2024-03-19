// import React, {useState} from 'react';
// import {View, Switch, StyleSheet,Image,Text} from 'react-native';
// import SwitchSelector from "react-native-switch-selector";
// import NightModeIcon from './data/images/nightMode.png';
// import LightModeIcon from './data/images/brightMode.png';

// const DrawerMenu = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
// const logo=<Image source={{uri:"https://www.flaticon.com/free-icons/light"}}/>
//   return (
// //     <SwitchSelector
// //   initial={0}
// //   onChange={value =>setIsEnabled( true)
// //   textColor="red"
// //   selectedColor="black"
// //   buttonColor="pink"
// //   borderColor="pink"
// //   hasPadding
// //   options={[
// //     // { label: "Feminino", value: "f", imageIcon: images.feminino }, //images.feminino = require('./path_to/assets/img/feminino.png')
// //     // { label: "Masculino", value: "m", imageIcon: images.masculino } //images.masculino = require('./path_to/assets/img/masculino.png')
// //     { label: "Feminino", value: "f"}, //images.feminino = require('./path_to/assets/img/feminino.png')
// //     { label: "Masculino", value: "m" } //images.masculino = require('./path_to/assets/img/masculino.png')
// //   ]}
// //   testID="gender-switch-selector"
// //   accessibilityLabel="gender-switch-selector"
// // />
// <View>
//   <Text className="text-lg">Theme</Text>
// <SwitchSelector
// className="scale-95"
//   textColor="black"
//   selectedColor="white"
//   buttonColor="#d32f2f"
//   borderColor="#d32f2f"
//   borderRadius={10}
//   size={10}
//   hasPadding
//     options={[
//     { value: "light", imageIcon:LightModeIcon}, //images.feminino = require('./path_to/assets/img/feminino.png')
//     {  value: "dark", imageIcon:NightModeIcon } //images.masculino = require('./path_to/assets/img/masculino.png')
//   ]}
//   initial={0}
//   onPress={value => console.log(`Call onPress with value: ${value}`)}
// />
// </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     transform:[
//       {scale:0.5},
//   ]
//   },

// });

// export default DrawerMenu

// import 'react-native-gesture-handler';
// import { createStackNavigator } from '@react-navigation/stack';
// import SettingScreen from './SettingScreen'
// import { NavigationContainer } from '@react-navigation/native';
// const Stack = createStackNavigator();

// export default function DrawerMenu() {
//   return (
//     <NavigationContainer independent={true}> 
//       <Stack.Navigator >
//     <Stack.Screen name="Settings" component={SettingScreen} />
//   </Stack.Navigator>
//   </NavigationContainer>
   
//   );
// }

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from './SettingScreen.jsx';

const Drawer = createDrawerNavigator();

export default class DrawerMenu extends Component {
  render() {
    return (
      <Drawer.Screen name="Settings" options={{
        label:"Settings",
        title: "Settings"
      }}
      component={SettingScreen}/>
    )
  }
}
