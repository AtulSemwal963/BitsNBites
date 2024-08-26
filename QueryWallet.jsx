import React from 'react';
import {useState,useEffect} from 'react';
import {Text,View,Image,TextInput,TouchableOpacity,ScrollView,Animated} from 'react-native';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoggedOutGif from './data/images/loggedOutGif.gif'
import HamLogo from './data/images/hamLogo.png'
import Modal from "react-native-modal";
import visaLogo from './data/images/visaLogo.png'
import mastercardLogo from './data/images/mastercardLogo.jpg'
import paytmLogo from './data/images/paytmLogo.png'
import gpayLogo from './data/images/gpayLogo.png'
import ToastManager, { Toast } from 'toastify-react-native';
import { RefreshControl } from 'react-native-web-refresh-control'
const FLASH_INTERVAL = 3000;
export default function QueryWallet() {
  
  const [mode] = useGlobalState('mode');
  const [backGroundColor] = useGlobalState('backGroundColor');
  const [fontColor] = useGlobalState('fontColor');
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn');
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, onChangeName] = useState('');
  const [number, onChangeNumber] = useState('');
  const [exp, onChangeExp] = useState('');
  const [cvv, onChangeCvv] = useState('');
  const [balance, setBalance] = useState(0);
  const [userEmail, setUserEmail] = useState(null);

  const opacity = new Animated.Value(1); 

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: FLASH_INTERVAL / 2,
            useNativeDriver: true, 
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: FLASH_INTERVAL / 2,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(); 
  }, []);


  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail !== null) {
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error retrieving userEmail from AsyncStorage:', error);
      }
    };

    getUserEmail();

    const userEmailInterval = setInterval(() => {
      getUserEmail();
    }, 60000);

    return () => clearInterval(userEmailInterval);
  }, []);

  const onChangeText = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setValue(numericValue);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

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
  
          const storedStatus = await AsyncStorage.getItem('isLoggedIn');
          if (storedStatus !== null) {
            setIsLoggedIn(storedStatus === 'true');
          }
        } catch (error) {
          console.error('Error loading data from AsyncStorage:', error);
        }
      };
  
      loadModeFromStorage();
    }, []);

  useEffect(() => {
    const updateBalanceInterval = setInterval(() => {
      if (isLoggedIn && userEmail) {
        getBalance();
      }
    }, 60000);

    return () => clearInterval(updateBalanceInterval);
  }, [isLoggedIn, userEmail]);

  const getBalance = async () => {
    try {
      const response = await fetch('https://bits-n-bitesbackendserver-1.onrender.com/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ umail: userEmail }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setBalance(responseData.balance);
        await AsyncStorage.setItem('balance', responseData.balance.toString());
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const addBalance=async()=>{
    
    const umail = userEmail;
    const balance = parseInt(value);
    const data = { umail, balance };

    try {
      const response = await fetch("https://bits-n-bitesbackendserver-1.onrender.com/addbalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setValue('');
    setIsModalVisible(false);
  }
  const userName = userEmail ? userEmail.split('@')[0].replace(/\d+/g, '').split('.')[0].replace(/^\w/, (c) => c.toUpperCase()) : '';

    if (!isLoggedIn) return (
    <View className="h-max w-max" style={{ backgroundColor: backGroundColor, height: "100%", width: "100%", flexDirection: "column", alignItems: "center" }}>
      <Text className="text-lg font-bold my-8" style={{ color: "#6B7280", width: "90%", textAlign: "center" }}> Uh-oh! Looks like someone's floating out there. </Text>
      <Image source={LoggedOutGif} style={{ height: 200, width: 200, opacity: 0.4 }} />
      <Text className="text-lg font-bold my-8" style={{ color: "#6B7280", width: "90%", textAlign: "center" }}>
        Log in to access your BnB wallet!
        </Text>
      <Text className="text-lg font-bold" style={{ color: "#6B7280", width: "60%", textAlign: "center" }}>
        Tap   <Image source={HamLogo} className="rounded-lg" style={{ height: 30, width: 30 }} />   and navigate to "Account Management" tab
                </Text>
    </View>

  )
  
  else if (isLoggedIn) return (
    <ScrollView style={{height:"100%",backgroundColor:backGroundColor}} refreshControl={
      <RefreshControl refreshing={false} tintColor={"red"} onRefresh={async () => {
        console.log("loading");
        try {
          const response = await fetch('https://bits-n-bitesbackendserver-1.onrender.com/balance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ umail: userEmail }),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            setBalance(responseData.balance);
            await AsyncStorage.setItem('balance', responseData.balance.toString());
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Network error:', error);
        }} }/>
   }>
      <View style={{ backgroundColor: backGroundColor }} className="h-full w-full flex-col items-center">
       <ToastManager duration={5000} width={300} height={70} className="text-lg" />
      <Text className="text-center text-lg my-3 font-bold" style={{ color: fontColor }}>
        Hi {userName}!{'\n'}Your Bits 'n Bites wallet balance is
                </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: 200, height: 200, borderRadius: 100, backgroundColor: mode, borderColor: 'rgb(185 28 28)', borderWidth: 1 }}>
        <Text style={{ fontWeight: 'bold', color: '#888888', fontSize: 50 }}>₹{balance}</Text>
      </View>
      <Text className="w-50 text-left text-xl font-bold my-3" style={{ color: fontColor }}> Add Balance to your wallet</Text>
      <TextInput
        className="rounded-md"
        style={{
          height: 40,
          marginTop: 32,
          borderWidth: 2,
          borderColor: "#BF1A2F",
          padding: 10,
          backgroundColor: { mode },
          width: "90%",
          color: fontColor
        }}
        onChangeText={onChangeText}
        value={value}
        placeholder="Enter Amount"
        placeholderTextColor="#6B7280"
        keyboardType="numeric"

      />
      <TouchableOpacity onPress={() => {
    if (balance + parseInt(value) > 5000) {
      Toast.info("Your wallet balance should not exceed ₹5000");
    } else {
      showModal();
    }
  }}
        className="self-center rounded-lg my-4"
        style={{ backgroundColor: "#BF1A2F", width: "47%", width: "90%", height: "8%" }}>
        <Text className="font-semibold text-lg p-1" style={{ color: "white", textAlign: "center" }} >Pay Now</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View className=" rounded-lg h-full w-full" style={{ height: "100%", backgroundColor: mode, padding: 20, borderColor: 'rgb(185 28 28)', borderWidth: 1, marginRight: 10 }}>
          <Text className="text-xl font-bold" style={{ color: "#6B7280" }}>Card Details</Text>
          <Text className="my-5" style={{ color: "#6B7280" }}>Card Type</Text>
          <View className="flex-row justify-between" style={{ width: "70%" }}>
            <Image source={visaLogo} style={{ width: 50, height: 30, backgroundColor: "white" }} />
            <Image source={mastercardLogo} style={{ width: 50, height: 30, backgroundColor: "white" }} />
            <Image source={gpayLogo} style={{ width: 70, height: 30, backgroundColor: "white" }} />
          </View>
          <TextInput
            className="rounded-md"
            style={{
              height: 40,
              marginTop: 32,
              borderWidth: 2,
              borderColor: "#BF1A2F",
              padding: 10,
              backgroundColor: { mode },
              width: "90%",
              color: fontColor
            }}
            onChangeText={onChangeName}
            value={name}
            placeholder="Cardholder's Name"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"

          />
          <TextInput
            className="rounded-md"
            style={{
              height: 40,
              marginTop: 32,
              borderWidth: 2,
              borderColor: "#BF1A2F",
              padding: 10,
              backgroundColor: { mode },
              width: "90%",
              color: fontColor
            }}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Card Number"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"

          />
          <View className="flex-row justify-between" style={{ width: "90%" }}>

            <TextInput
              className="rounded-md"
              style={{
                height: 40,
                marginTop: 32,
                borderWidth: 2,
                borderColor: "#BF1A2F",
                padding: 10,
                backgroundColor: { mode },
                width: "45%",
                color: fontColor
              }}
              onChangeText={onChangeExp}
              value={exp}
              placeholder="Expiration"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"

            /><TextInput
              className="rounded-md"
              style={{
                height: 40,
                marginTop: 32,
                borderWidth: 2,
                borderColor: "#BF1A2F",
                padding: 10,
                backgroundColor: { mode },
                width: "45%",
                color: fontColor
              }}
              onChangeText={onChangeCvv}
              value={cvv}
              placeholder="Cvv"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"

            />
          </View>
          <View className="my-7" style={{ backgroundColor: "#BF1A2F", height: "0.2%", width: "90%" }}></View>
          <View className="flex-row justify-between" style={{ width: "90%" }}>
            <Text className="font-bold" style={{ color: fontColor }}>Subtotal</Text>
            <Text className="font-bold" style={{ color: fontColor }}>₹{value}</Text>
          </View>
          <View className="flex-row justify-between my-3" style={{ width: "90%" }}>
            <Text className="font-bold" style={{ color: fontColor }}>Taxes (2%)</Text>
            <Text className="font-bold" style={{ color: fontColor }}>₹{(value / 100) * 2}</Text>
          </View>
          <View className="flex-row justify-between" style={{ width: "95%" }}>
            <Text className="font-bold" style={{ color: fontColor }}>Grand Total (Incl. taxes)</Text>
            <View className="rounded-lg " >
              <Text className="bg-red-700 rounded-lg text-white" style={{ flexWrap: 'wrap', padding: 5, fontWeight: 'bold', width: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>₹{Math.ceil(((parseInt(value) / 100) * 2) + parseInt(value))}</Text>

              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: "-5%" }}>
            <TouchableOpacity onPress={addBalance}
              className="rounded-lg self-center"
              style={{ marginTop: 40, backgroundColor: "#BF1A2F", width: "40%" }}>
              <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Checkout ➡️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}
              className="rounded-lg self-center"
              style={{ marginTop: 40, backgroundColor: "#BF1A2F", width: "40%" }}>
              <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Animated.Text className="font-medium text-base" style={{ color: '#BF1A2F', opacity }}>
      Swipe down along the screen for manual refresh
    </Animated.Text>
    </View> 
    </ScrollView>
   
  )

}
