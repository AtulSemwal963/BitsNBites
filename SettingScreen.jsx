
import { Text, SafeAreaView,View,Button} from 'react-native'
import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();


// export default function SettingScreen ({navigation}) { 
//     return (
//          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>       
//     )
// }

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginLogoutPage from './AccountManagement';

let Stack= createNativeStackNavigator();
export default function SettingScreen({ navigation }) {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button
    //     title="Login/Logout"
    //     onPress={() => navigation.navigate(LoginLogoutPage)}
    //   />
    // </View>
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate(LoginLogoutPage)}
    />
  </View>
    

  );
}