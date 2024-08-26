import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './data/images/logo.png';
import { useGlobalState, setGlobalState } from './GlobalState';
import ToastManager, { Toast,toast } from 'toastify-react-native';





const AccountManagement = () => {
  const [mode] = useGlobalState('mode');
  const [backGroundColor] = useGlobalState('backGroundColor');
  const [fontColor] = useGlobalState('fontColor');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [mail, onChangeMail] = useState('');
  const [pass, onChangePass] = useState('');
  const [loginClicked, setLoginClicked] = useState(false);
  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);
  useEffect(() => {
    loadLoginStatus(); 
  }, []);

  const handleLoginPress = async() => {
    
    setLoginClicked(true);
    await handleLogin() 
  };
 
  const showToastsSuccess = async (message, email) => {
    Toast.success(message);
    setIsLoggedIn(true);
    const saveData = async () => {
      try {
        setGlobalState('isLoggedIn',true)
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userEmail', mail);
        console.log('isLoggedIn and userEmail saved to AsyncStorage',);
        const retrievedEmail = await AsyncStorage.getItem('userEmail');
        console.log('Retrieved userEmail from AsyncStorage:', retrievedEmail);
       
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };
  
    saveData();
  
    setGlobalState('isLoggedIn', true, () => {
      console.log('isLoggedIn updated to true in global state');
    });
    
    
  };
  

  const showToastsError = (message) => {
    Toast.error(message);
  };

  const handleLogout = async() => {
    setIsLoggedIn(false);
      Toast.success("Successfully Logged Out");
   setGlobalState('isLoggedIn', false, () => {
     console.log('isLoggedIn updated to false in global state');
   });
   saveLoginStatus(false);
  };
  const handleLogin = async () => {
    const umail = mail;
    const password = pass;
    const data = { umail, password };

    try {
      const response = await fetch('https://bits-n-bitesbackendserver-1.onrender.com/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        if (responseData.message === 'Account created successfully' || responseData.message === 'User logged in successfully') {
          showToastsSuccess(responseData.message);
        } else {
          showToastsError(responseData.message);
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  useEffect(() => {
    if (loginClicked) {
      handleLogin(); 
      onChangeMail(''); 
      onChangePass(''); 
      setLoginClicked(false);
    }
  }, [loginClicked]);

  const loadLoginStatus = async () => {
    try {
      const storedIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (storedIsLoggedIn !== null) {
        setIsLoggedIn(storedIsLoggedIn === 'true');
      }
    } catch (error) {
      console.error('Error loading login status:', error);
    }
  };

  const saveLoginStatus = async (isLoggedIn) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', isLoggedIn.toString());
    } catch (error) {
      console.error('Error saving login status:', error);
    }
  };

  return (
    <View className="h-max w-max" style={{ backgroundColor: mode, height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
      <ToastManager duration={5000} width={300} height={70} className="text-lg" />
      <View classname="my-8" style={{ height: '25%', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: '3%' }}>
        <Image source={Logo} style={{ height: 140, width: 140 }} classname="self-center" />
      </View>
  
      <View
        className="rounded-2xl"
        style={{
          height: '70%',
          width: '95%',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '3%',
          backgroundColor: backGroundColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
        }}
      >
        <Text className="p-4 text-center font-semibold" style={{ color: fontColor, fontSize: 13 }}>
          Hate waiting in lines? Skip the rush with Bits 'n' Bites!
        </Text>
        <TextInput
          className="rounded-2xl"
          style={{
            height: 40,
            margin: 12,
            borderWidth: 2,
            borderColor: '#BF1A2F',
            padding: 10,
            backgroundColor: { mode },
            width: '90%',
            color: fontColor,
          }}
          onChangeText={onChangeMail}
          value={mail}
          placeholder="University E-Mail"
          placeholderTextColor="#6B7280"
          keyboardType="default"
        />
        <TextInput
          className="rounded-2xl"
          style={{
            height: 40,
            margin: 12,
            borderWidth: 2,
            borderColor: '#BF1A2F',
            padding: 10,
            backgroundColor: { mode },
            width: '90%',
            color: fontColor,
          }}
          onChangeText={onChangePass}
          value={pass}
          placeholder="Password"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          secureTextEntry={true}
        />
        {!isLoggedIn && ( 
          <TouchableOpacity onPress={handleLoginPress} className="rounded-lg" style={{ marginTop: 40, backgroundColor: '#BF1A2F', width: '80%' }}>
            <Text className="font-semibold text-base p-1" style={{ color: 'white', textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        )}
        {isLoggedIn && ( 
          <TouchableOpacity onPress={handleLogout} className="rounded-lg" style={{ marginTop: 30, backgroundColor: '#BF1A2F', width: '80%' }}>
            <Text className="font-semibold text-base p-1" style={{ color: 'white', textAlign: 'center' }}>
              Logout
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  
};

export default AccountManagement;
