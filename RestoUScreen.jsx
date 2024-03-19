// import React, { useState,useEffect } from 'react';
// import { StyleSheet,Image,View,Text, Button } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import storeImage from './data/images/storeImage.png';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useGlobalState, setGlobalState } from './GlobalState';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   // Your Firebase configuration
//   apiKey: "AIzaSyCHvaylPr59C3Qw8nHOig3m3eysgH2aTPA",
//   authDomain: "myapp-bcb8b.firebaseapp.com",
//   projectId: "myapp-bcb8b",
//   storageBucket: "myapp-bcb8b.appspot.com",
//   messagingSenderId: "571267166277",
//   appId: "1:571267166277:web:ac766e89e26d2f3db0732c",
//   databaseURL:"https://myapp-bcb8b-default-rtdb.firebaseio.com/"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);


// const RestoUScreen = () => {

//   const [value, setValue] = useState(null);
//   const [imageDisplay,setImageDisplay]= useState("flex");
//   const [menu,setMenu]=useState();
//   const [mode] = useGlobalState('mode');
//   const [backGroundColor] = useGlobalState('backGroundColor');
//   const [fontColor] = useGlobalState('fontColor');
//   useEffect(() => {
//     const loadModeFromStorage = async () => {
//       try {
//         const storedMode = await AsyncStorage.getItem('mode');
//         if (storedMode !== null) {
//           setGlobalState('mode', storedMode);
//         }
//         const storedBgMode = await AsyncStorage.getItem('backGroundColor');
//         if (storedBgMode !== null) {
//           setGlobalState('backGroundColor', storedBgMode);
//         }
//         const storedFontMode = await AsyncStorage.getItem('fontColor');
//         if (storedBgMode !== null) {
//           setGlobalState('fontColor', storedFontMode);
//         }
//       } catch (error) {
//         console.error('Error loading mode from AsyncStorage:', error);
//       }
//     };
    

//     loadModeFromStorage();
//   }, []);
//   const data = [
//     { label: '🍪Biscuits', value: 'biscuits' },
//     { label: '🥔Chips', value: 'chips'},
//     { label: '🍫Chocolates', value: 'chocolates' },
//     { label: '🥤Drinks', value: 'drinks'},
//     { label: '🍦Ice Creams', value: 'iceCreams'},
//     { label: '🥨Snacks', value: 'snacks'}
//   ];
//   const [restoU, setRestoU] = useState([]);
 

//   useEffect(() => {
//     const dbRef = ref(database);

//     onValue(dbRef, (snapshot) => {
//       setRestoU(snapshot.val()[0].restoU);
//     });
//   }, []);

  
//   return (
//     <View className="h-full w-full" style={{ backgroundColor: mode, flex: 1 }}>
//     <Dropdown
//     className=" rounded-lg pr-4"
//       style={{
//         margin: 16,
//         height: 50,
//         borderColor:'gray',
//         elevation:2,
//         backgroundColor:backGroundColor,
//       }}
//       placeholderStyle={{
//         fontSize: 16,
//     color:fontColor
//       }}
//       selectedTextStyle={{ fontSize: 16,color:fontColor}}
//       inputSearchStyle={{
//         height: 40,
//     fontSize: 16,
//       }}
//       iconStyle={styles.iconStyle}
//       data={data}
//       search
//       maxHeight={300}
//       labelField="label"
//       valueField="value"
//       placeholder="Select Category"
//       searchPlaceholder="Search..."
//       value={value}
//       onChange={item => {
//         setValue(item.value);
//         setImageDisplay("none");
//         setMenu(item.value)
//       }}
//       renderLeftIcon={() => (
//         <AntDesign style={{display:imageDisplay}} color="black" name="Safety" size={20} />
//       )}
//     />
//     <View className="w-100 h-100 text-red-600 items-center justify-center" style={{display:imageDisplay}}>
//       <Image source={storeImage} style={{height:200,width:200,opacity:0.5}}/>
//       <Text className="text-gray-500">Please Select A Category</Text>
//       </View>
//       <ScrollView>
//   {Object.keys(restoU).includes(menu) && (
//     <View  key={menu} className=" bg-gray-200 self-center p-2 rounded-xl" style={{width:"95%",height:"max-content"}}>
//       {restoU[menu].map((item) => (
//         < View key={item.item} className="flex-row pb-3 h-max">
//            <View style={{width:"45%"}}>
//          <Image source={{uri:item.image}} style={{height:150,width:150}} className="rounded-lg"/>
//          </View>
//           <View className="w-2/3 text-center self-center flex-wrap flex-col" style={{width:"50%", height:"inherit"}}>
//          <Text className="flex-wrap pb-2 font-semibold" style={{width:"95%"}}><Text className="font-bold text-gray-500">Item:</Text> {item.item}</Text> 
//          <View className="flex-row pb-2 font-semibold justify-between" style={{width:"80%"}}>
//          <View className="rounded-full" style={{ backgroundColor: 'white', borderColor: 'rgb(185 28 28)', borderWidth: 1, marginRight:10 }}>
//   <Text style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '100%' }}>
//     <Text style={{ fontWeight: 'bold', color: '#888888' }}>Price:₹</Text>
//     {item.price}
//   </Text>
// </View>
// <View className="rounded-full " style={{ backgroundColor: 'white', marginRight:10 }}>
//          <Text className="bg-red-700 rounded-full text-white" style={{ flexWrap: 'wrap', padding: 7, fontWeight: 'bold', width: '100%' }}>
//     <Text style={{ fontWeight: 'bold', color: 'white' }}>In stock:</Text>
//     {item.qty}
//   </Text>
//   </View>
//          </View>
//          <Button title="Reserve" color="#BF1A2F" className="rounded-lg" />
//          </View>
//         </View>
//       ))}
//     </View >
//   )}
// </ScrollView>
//     </View>
//   );
// };

// export default RestoUScreen;

// const styles = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     borderColor:'gray',
//     elevation:2,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 16,
    
//   },
//   selectedTextStyle: {
//     fontSize: 16,
    
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
    
//   },
  
// });


import React, { useState,useEffect } from 'react';
import { StyleSheet,Image,View,Text, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import storeImage from './data/images/storeImage.png';
import { ScrollView } from 'react-native-gesture-handler';
import { useGlobalState, setGlobalState } from './GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';



const RestoUScreen = () => {

  const [value, setValue] = useState(null);
  const [imageDisplay,setImageDisplay]= useState("flex");
  const [menu,setMenu]=useState();
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
  const data = [
    { label: '🍪Biscuits', value: 'biscuits' },
    { label: '🥔Chips', value: 'chips'},
    { label: '🍫Chocolates', value: 'chocolates' },
    { label: '🥤Drinks', value: 'drinks'},
    { label: '🍦Ice Creams', value: 'iceCreams'},
    { label: '🥨Snacks', value: 'snacks'}
  ];
  const [restoU, setRestoU] = useState([]);
 

  // useEffect(() => {
  //   const dbRef = ref(database);

  //   onValue(dbRef, (snapshot) => {
  //     setRestoU(snapshot.val()[0].restoU);
  //   });
  // }, []);
  // useEffect(() => {
  //   // Define the fetch function inside useEffect
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://bits-n-bitesserver-2.onrender.com/restoumenu");
  //       const data = await response.json();
  //       // Set the state with the item you want to display
  //       const categoryData = data.find(category => category[value] !== undefined);
  //       // Update state with the found category's items, or an empty array if not found
  //       setRestoU(categoryData ? categoryData[value] : [])
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   // Call the fetch function
  //   fetchData();
  // }, []); // Empty dependency array means this effect runs once on mount
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bits-n-bitesserver-2.onrender.com/restoumenu");
        const data = await response.json();
        // Set the state with the item you want to display
        const categoryData = data.find(category => category[value] !== undefined);
        // Update state with the found category's items, or an empty array if not found
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
    <View className="h-full w-full" style={{ backgroundColor: mode, flex: 1 }}>
    <Dropdown
    className=" rounded-lg pr-4"
      style={{
        margin: 16,
        height: 50,
        borderColor:'gray',
        elevation:2,
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
    <View className="w-100 h-100 text-red-600 items-center justify-center" style={{display:imageDisplay}}>
      <Image source={storeImage} style={{height:200,width:200,opacity:0.5}}/>
      <Text className="text-gray-500">Please Select A Category</Text>
      </View>

<ScrollView>
  {restoU.length > 0 && (
    <View key={value} className=" self-center p-2 rounded-xl" style={{width:"95%",height:"max-content",backgroundColor:backGroundColor}}>
      {restoU.map((item) => (
         < View key={item.item} className="flex-row pb-3 h-max">
         <View style={{width:"45%"}}>
       <Image source={{uri:item.image}} style={{height:150,width:150}} className="rounded-lg"/>
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
       <Button title="Reserve" color="#BF1A2F" className="rounded-lg" />
       </View>
      </View>
      ))}
    </View>
  )}
</ScrollView>
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


