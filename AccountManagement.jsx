// import React, { useCallback, useEffect, useState } from "react";
// import { Alert, Button, Linking, Platform, StyleSheet, Text, View } from "react-native";



// const AccountManagement = () => {

//     const url1 = "https://github.com/vishal-pawar";
//     const url2 = "abcd://abcd.com";
//     const number = '+910987654321'
//     const message = "hello there!!"

//     const openAlarmApp = async() => {
//       if (Platform.OS === 'ios') {
//         Linking.openURL('clock://');
//     } else if (Platform.OS === 'android') {
//         // On Android, you can try opening the system settings
//         // where users can find the alarm app.
//         await Linking.openSettings();
//     } else {
//         console.log("Could not open Alarm App");
//     }
//   }
    
//     const sendTextMessage = useCallback(async (phNumber, message) => {
//         const separator = Platform.OS === 'ios' ? '&' : '?'
//         const url = `sms:${phNumber}${separator}body=${message}`
//         await Linking.openURL(url)
//     }, [])

//     const openPhotos = () => {
//         if (Platform.OS == 'ios') {
//             Linking.openURL("photos-redirect://");
//         } else if (Platform.OS == 'android') {
//             Linking.openURL("content://media/internal/images/media");
//         } else {
//             console.log("Could not open Photos")
//         }
//     }

//     const openInsta = () => {
//         Linking.openURL('instagram://user?username=instagram')
//             .catch(() => {
//                 Linking.openURL('https://www.instagram.com/instagram');
//             })
//     }
//     return (
//         <View style={styles.container}>
           
//             <View style={styles.buttonContainer}>
//                 <Button title="Open Alarm App" onPress={openAlarmApp} color="orange" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="call" onPress={() => {
//                     Linking.openURL(`tel:${number}`)
//                 }} color="red" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="SMS" onPress={() => sendTextMessage(number, message)} color="gold" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="mail" onPress={() => {
//                     Linking.openURL(`mailto:support@me.com?subject=testing&body=${message}`)
//                 }} color="#ff6767" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="Open setting" onPress={() => {
//                     Linking.openSettings()
//                 }} color="#112233" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="Open Whatsapp" onPress={() => {
//                     Linking.openURL(`whatsapp://send?phone=${number}&text=${message}`)
//                 }} color="green" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="Map" onPress={() => {
//                     Linking.openURL(`https://www.google.com/maps/search/?api=1&query=india`)
//                 }} color="" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="open Youtube" onPress={() => {
//                     Linking.openURL(`https://www.youtube.com`)
//                 }} color="darkred" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="open facebook" onPress={() => {
//                     Linking.openURL(`fb://profile/`)
//                 }} color="blue" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="open Gallery" onPress={openPhotos} color="powderblue" />
//             </View>
//             <View style={styles.buttonContainer}>
//                 <Button title="Open Instagram" onPress={openInsta} color="steelblue" />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: "center", alignItems: "center" },
//     buttonContainer: {
//         margin: 10
//     }
// });

// export default AccountManagement

import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
// import { LogLevel, OneSignal } from 'react-native-onesignal';

// // Add OneSignal within your App's root component
// const AccountManagement = () => {

//   // Remove this method to stop OneSignal Debugging
//   OneSignal.Debug.setLogLevel(LogLevel.Verbose);

//   // OneSignal Initialization
//   OneSignal.initialize("ONESIGNAL_APP_ID");

//   // requestPermission will show the native iOS or Android notification permission prompt.
//   // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
//   OneSignal.Notifications.requestPermission(true);

//   // Method for listening for notification clicks
//   OneSignal.Notifications.addEventListener('click', (event) => {
//     console.log('OneSignal: notification clicked:', event);
//   });

// }

// export default AccountManagement;
































// const useMount = func => useEffect(() => func(), []);

// const useInitialURL = () => {
//     const [url, setUrl] = useState(null);
//     const [processing, setProcessing] = useState(true);

//     useMount(() => {
//         const getUrlAsync = async () => {
//             // Get the deep link used to open the app
//             const initialUrl = await Linking.getInitialURL();

//             // The setTimeout is just for testing purpose
//             setTimeout(() => {
//                 setUrl(initialUrl);
//                 setProcessing(false);
//             }, 1000);
//         };

//         getUrlAsync();
//     });

//     return { url, processing };
// };


{/* <Text>
                {processing
                    ? `Processing the initial url from a deep link`
                    : `The deep link is: ${initialUrl || "None"}`}
            </Text> */}