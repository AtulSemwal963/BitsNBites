
import React, { useState,useEffect } from 'react';
import { StyleSheet,Image,View,Text, Button,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import storeImage from './data/images/storeImage.png';
import { ScrollView } from 'react-native-gesture-handler';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import HamLogo from './data/images/hamLogo.png'
import ToastManager, { Toast } from 'toastify-react-native';

const RestoUScreen = () => {

  const [value, setValue] = useState(null);
  const [imageDisplay,setImageDisplay]= useState("flex");
  const [menu,setMenu]=useState();
  const [mode] = useGlobalState('mode');
  const [backGroundColor] = useGlobalState('backGroundColor');
  const [fontColor] = useGlobalState('fontColor');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn] = useGlobalState('isLoggedIn');
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty,setQty]=useState(1);
  useEffect(()=>{
    Toast.success("Logged in Successfully");
  },[isLoggedIn])
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
  
  
  const orderItem = async (item, qty, image, totalPrice,CATEGORY) => {
    try {
      const storedCart = await AsyncStorage.getItem('restoUCart');
      let updatedCart = [];
      if (storedCart) {
        updatedCart = JSON.parse(storedCart);
      }
      const newItem = {
        item,
        qty,
        image,
        price: totalPrice,
        category:CATEGORY
      };
      updatedCart.push(newItem);
      await AsyncStorage.setItem('restoUCart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error ordering item:', error);
    }
    setIsModalVisible(false);
  };
  
  
  const data = [
    { label: '🍪Biscuits', value: 'biscuits' },
    { label: '🥔Chips', value: 'chips'},
    { label: '🍫Chocolates', value: 'chocolates' },
    { label: '🥤Drinks', value: 'drinks'},
    { label: '🍦Ice Creams', value: 'iceCreams'},
    { label: '🥨Snacks', value: 'snacks'}
  ];
  const [restoU, setRestoU] = useState([]);
 
  const showModal=(item)=>{
    setSelectedItem(item);
    setQty(1);
    setIsModalVisible(true);
  }
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bits-n-bitesserver-2.onrender.com/restoumenu");
        const data = await response.json();
        const categoryData = data.find(category => category[value] !== undefined);
        setRestoU(categoryData ? categoryData[value] : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    if (value) {
      fetchData();
    }
  }, [value]);

  return (
    <View className="h-full  flex item-center" style={{ backgroundColor: mode,width:"100%"  }}>
    <Dropdown
    className=" rounded-lg "
      style={{
        margin: 16,
        height: 50,
        borderColor:'gray',
        elevation:2,
        paddingRight:"3em",
        backgroundColor:backGroundColor,
      }}
      placeholderStyle={{
        fontSize: 16,
    color:fontColor
      }}
      selectedTextStyle={{ fontSize: 16,color:fontColor}}
      inputSearchStyle={{
        height: 40,
    fontSize: 16,
      }}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Category"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        setImageDisplay("none");
        setMenu(item.value)
      }}
      renderLeftIcon={() => (
        <AntDesign style={{display:imageDisplay}} color="black" name="Safety" size={20} />
      )}
    />
    <ToastManager duration={5000} width={300} height={50}  className="text-lg"/>
    <View className="w-100 h-100 text-red-600 items-center justify-center" style={{display:imageDisplay}}>
      <Image source={storeImage} style={{height:200,width:200,opacity:0.5}}/>
      <Text className="text-gray-500">Please Select A Category</Text>
      </View>

<ScrollView>
  {restoU.length > 0 && (
    <View key={value} className="  p-1.5 rounded-xl" style={{width:"95%",height:"max-content",backgroundColor:backGroundColor}}>
      {restoU.map((item) => (
         < View key={item.item} className="flex-row pb-3 h-max">
         <View style={{width:"45%"}}>
       <Image source={{uri:item.image}} style={{height:140,width:140}} className="rounded-lg"/>
       </View>
        <View className="w-2/3 text-center self-center flex-wrap flex-col" style={{width:"50%", height:"inherit"}}>
       <Text className="flex-wrap pb-2 font-semibold" style={{width:"95%",color:fontColor}}><Text className="font-bold text-gray-500">Item:</Text> {item.item}</Text> 
       <View className="flex-row pb-2 font-semibold justify-between" style={{width:"80%"}}>
       <View className="rounded-full" style={{ backgroundColor: mode, borderColor: 'rgb(185 28 28)', borderWidth: 1, marginRight:10 }}>
<Text style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '100%' }}>
  <Text style={{ fontWeight: 'bold', color: '#888888' }}>Price:₹</Text>
 <Text style={{color:fontColor}}>{item.price}</Text> 
</Text>
</View>
<View className="rounded-full " style={{  marginRight:10 }}>
       <Text className="bg-red-700 rounded-full text-white" style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '100%' }}>
  <Text style={{ fontWeight: 'bold', color: 'white' }}>In stock:</Text>
  {item.qty}
</Text>
</View>
       </View>
       <Button title="Reserve" color="#BF1A2F" className="rounded-lg" disabled= {item.qty==0?true:false}onPress={() => showModal(item)} key={item.item}/>
       </View>
      </View>
      ))}
    </View>
  )}
</ScrollView>
<Modal isVisible={isModalVisible}>
        <View className=" rounded-lg"style={{ backgroundColor: mode, padding: 20,borderColor: 'rgb(185 28 28)', borderWidth: 1, marginRight:10 }}>
        {isLoggedIn ? selectedItem?<View>
  <Text className="font-bold text-gray-500 text-center p-2">{selectedItem.item}</Text>
  <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
    <Image source={{ uri: selectedItem.image }} style={{ height: 100, width: 100 }} className="rounded-lg" />
    <View style={{ width: "100%", display: "flex", flexDirection: "row", marginLeft: "15%", height: "100%" }} >
      <TouchableOpacity style={{ backgroundColor: qty >= (selectedItem.qty) ? "gray" : "#BF1A2F", width: "10%", height: "30%", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} onPress={() => { if (qty <= selectedItem.qty - 1) setQty(prevQty => prevQty + 1) }}><Text className="text-center text-white text-lg">+</Text></TouchableOpacity>
      <Text style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '15%', borderColor: 'rgb(185 28 28)', borderWidth: 1, height: "30%" ,color:fontColor}} className="text-center">
        {qty}
      </Text>
      <TouchableOpacity onPress={() => setQty(prevQty => prevQty > 0 ? prevQty - 1 : 0)} style={{ backgroundColor: (qty <= 0) ? "gray" : "#BF1A2F", width: "5%", height: "20%", width: "10%", height: "30%", borderTopRightRadius: 5, borderBottomRightRadius: 5 }}><Text className="text-center text-white text-lg">-</Text></TouchableOpacity>
    </View>
  </View>
  <Text style={{ textAlign: "center", marginTop:-60,width:"50%" , marginLeft:90, color:fontColor}} className="text-lg font-bold self-center"><Text style={{color:"gray"}}>Total:₹</Text>{qty*selectedItem.price}</Text>
  <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
    <TouchableOpacity onPress={()=>orderItem(selectedItem.item,qty,selectedItem.image,qty*selectedItem.price,selectedItem.category)}
      className="rounded-lg self-center" 
      style={{ marginTop: 40, backgroundColor: "#BF1A2F", width: "40%" }}>
      <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Add to Cart</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setIsModalVisible(false)}
      className="rounded-lg self-center"
      style={{ marginTop: 40, backgroundColor: "#BF1A2F", width: "40%" }}>
      <Text className="font-semibold text-base p-1" style={{ color: "white", textAlign: "center" }}>Cancel</Text>
    </TouchableOpacity>
  </View>
</View>
:<Text>No Item</Text> : <View> 
        <Text className="font-bold text-gray-500 text-center text-lg">Uh-oh! Looks like you're not logged in. Sign in to make reservations.{"\n"}{"\n"}
        <Text  className=" font-bold text-center" style={{color:"#6B7280",width:"60%",textAlign:"center"}}>
                    Tap   <Image source={HamLogo} className="rounded-lg" style={{height:20,width:20,paddingTop:"10px"}}/>   and navigate to "Account Management" tab 
                </Text>
                </Text>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}
      className="rounded-lg self-center"
      style={{ marginTop: 40,backgroundColor:"#BF1A2F" ,width:"70%"}}>
    <Text className="font-semibold text-base p-1"style={{color:"white",textAlign:"center"}}>Close</Text>
</TouchableOpacity>
          </View>}
        </View>
      </Modal>
    </View>

  );
};

export default RestoUScreen;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderColor:'gray',
    elevation:2,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    
  },
  selectedTextStyle: {
    fontSize: 16,
    
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    
  },
  
});
