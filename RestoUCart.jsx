
import React, { useState, useEffect } from 'react';
import { Text, View, Button, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState, setGlobalState } from './GlobalState';
import Modal from "react-native-modal";
import ToastManager, { Toast } from 'toastify-react-native';

export default function RestoUCart() {
  const [restoUCart, setRestoUCart] = useState([]);
  const [mode] = useGlobalState('mode');
  const [backGroundColor] = useGlobalState('backGroundColor');
  const [fontColor] = useGlobalState('fontColor');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [balance, setBalance] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const deductBalance=async()=>{
    
    const umail = await AsyncStorage.getItem("userEmail");
    const balance = -totalSum;
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
        Toast.success("Order placed successfully");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    getBalance()
  }

  const placeOrder = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('restoUCart');
      let cartItems = [];
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
      }
  
      const order = {
        items: cartItems.map(item => ({
          category: item.category,
          item: item.item,
          qty: item.qty
        }))
      };
      console.log("Items in the order:", order.items);

      const response = await fetch("https://bits-n-bitesbackendserver.onrender.com/placeOrderRestoU", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });
  
      if (response.ok) {
        console.log("Order placed successfully");
        Toast.success("Order Placed successfully");
        setIsModalVisible(false);
        await sendMail();
       await deductBalance();
       getBalance();
       await AsyncStorage.removeItem('restoUCart');

      setRestoUCart([]);
      } else if (response.status === 500) {
        Toast.error("Error placing order: Internal server error");

        setIsModalVisible(false);
        
        
      } else if (response.status === 404) {
        Toast.error("Error placing order: Resource not found");
        console.error("Error placing order: Resource not found");
        setIsModalVisible(false);
      } else {
        Toast.error("Error placing order:", response.statusText);
        console.error("Error placing order:", response.statusText);
        setIsModalVisible(false);
      }
    } catch (error) {
      Toast.error("Network error:", error);
      console.error("Network error:", error);
    }
  };
  
  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('restoUCart');
        if (storedCart !== null) {
          const parsedCart = JSON.parse(storedCart);
          setRestoUCart(parsedCart);
        }
      } catch (error) {
        console.error('Error loading RestoU cart:', error);
      }
    };

    loadCartFromStorage();

    const intervalId = setInterval(loadCartFromStorage, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  const deleteItem = async (index) => {
    try {
      const updatedCart = [...restoUCart];
      updatedCart.splice(index, 1);
      setRestoUCart(updatedCart);
      await AsyncStorage.setItem('restoUCart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  const totalSum = restoUCart.reduce((total, item) => total + item.price, 0);
const getBalance = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('balance');
        if (storedBalance !== null) {
          setBalance(storedBalance);
        }
      } catch (error) {
        console.error('Error retrieving balance from AsyncStorage:', error);
      }
    };
  useEffect(() => {
    getBalance();
  
    const intervalId = setInterval(getBalance, 5000);
  
    getBalance();
  
    return () => clearInterval(intervalId);
  }, []);

  const sendMail=async()=>{
   
    
    try {
      // Send a POST request to the /send-email endpoint with the user's email
      const userEmail = await AsyncStorage.getItem('userEmail');
      const storedCart = await AsyncStorage.getItem('restoUCart');
      let cartItems = [];
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
      }
    const order = {
      items: cartItems.map(item => ({
        category: item.category,
        item: item.item,
        qty: item.qty
      }))
    };
      const response = await fetch('https://bits-n-bitesserver.onrender.com/send-order-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail ,order})
      });

      if (response.ok) {
        // If the email is sent successfully, show a success message
        Toast.success("Please Check your mail for Order Summary");
        console.log("Mail Sent")
      } else {
        // If there's an error, show an error message
       
      }
    } 
  catch (error) {
      // If there's a network error, show an error message
      console.error('Network error:', error);
      alert('Network error. Please try again later.');
    }
}
  return (
    <View style={{ backgroundColor: mode, display: "flex", flexDirection: "column", justifyContent: "center" }}>
       <ToastManager duration={2000} width={300} height={70} className="text-lg" />
      <View className="h-full w-full " style={{}}>
        <View style={{ width: "40%", marginTop: "3%" }}>
          <Text className="text-center font-bold text-lg rounded-full" style={{ backgroundColor: "#BF1A2F", color: "white" }}>Your Total:₹{totalSum}</Text>
        </View>

        <ScrollView>
          {restoUCart.map((item, index) => (
            <View key={index} style={{ backgroundColor: backGroundColor, flexDirection: 'row', width: "95%", marginTop: "3%" }} className="  p-1.5 rounded-xl">
              <Image source={{ uri: item.image }} style={{ height: 120, width: 120 }} className="rounded-lg" />
              <View className="w-2/3 text-center self-center flex-wrap flex-col" style={{ width: "50%", height: "inherit", marginLeft: "3%" }}>
                <Text className="flex-wrap pb-2 font-semibold" style={{ width: "99%", color: fontColor }}><Text className="font-bold text-gray-500">Item:</Text> {item.item}</Text>
                <View className="flex-row pb-2 font-semibold justify-between" style={{ width: "80%" }}>
                  <View className="rounded-full" style={{ backgroundColor: mode, borderColor: 'rgb(185 28 28)', borderWidth: 1, marginRight: 10 }}>
                    <Text style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '100%' }}>
                      <Text style={{ fontWeight: 'bold', color: '#888888' }}>Quantity:</Text>
                      <Text style={{ color: fontColor }}>{item.qty}</Text>
                    </Text>
                  </View>
                  <View className="rounded-full " style={{ marginRight: 10 }}>
                    <Text className="bg-red-700 rounded-full text-white" style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '100%' }}>
                      <Text style={{ fontWeight: 'bold', color: 'white' }}>Total Price:₹</Text>
                      {item.price}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => deleteItem(index)}
                  className="rounded-sm self-center"
                  style={{ backgroundColor: "#BF1A2F", width: "47%", width: "120%" }}>
                  <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Delete</Text>
                </TouchableOpacity>

              </View>
            </View>
          ))}
        </ScrollView>
        {
  totalSum > 0 &&
  <TouchableOpacity
    className="self-center rounded-lg"
    style={{ backgroundColor: "#BF1A2F", width: "90%", height: "8%" }} // Note: Removed duplicated width style
    onPress={showModal}>
    <Text className="font-semibold text-lg p-1" style={{ color: "white", textAlign: "center" }}>
      Place Order
    </Text>
  </TouchableOpacity>
}
      </View>
      <Modal isVisible={isModalVisible}>
      <View className=" rounded-lg" style={{ height: "40%", backgroundColor: mode, padding: 20, borderColor: 'rgb(185 28 28)', borderWidth: 1, marginRight: 10 }}>
      <View className="flex-row justify-between" style={{ width: "90%" }}>
            <Text className="font-bold" style={{ color: fontColor }}>Subtotal</Text>
            <Text className="font-bold" style={{ color: fontColor }}>₹{totalSum}</Text>
          </View>
          <View className="flex-row justify-between my-3" style={{ width: "90%" }}>
            <Text className="font-bold" style={{ color: fontColor }}>Your Current Balance </Text>
            <Text className="font-bold" style={{ color: fontColor }}>₹{balance}</Text>
          </View>
          <View className="flex-row justify-between my-3" style={{ width: "90%" }}>
            <Text className="font-bold" style={{ color: fontColor }}>Your Balance After</Text>
            <Text className="font-bold" style={{ color: fontColor }}>₹{balance-totalSum}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: "-5%" }}>
            <TouchableOpacity onPress={
              ()=>{
                if(balance-totalSum<0){
                  setIsModalVisible(false);
                  Toast.info("Insufficient Balance");
                }
                else placeOrder();
              }
            }
              className="rounded-lg self-center"
              style={{ marginTop: 40, backgroundColor: "#BF1A2F", width: "40%" }}>
              <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Purchase </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}
              className="rounded-lg self-center"
              style={{ marginTop: 40, backgroundColor: "#BF1A2F", width: "40%" }}>
              <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
