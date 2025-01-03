import React, {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, StatusBar, TextInput, View, Text} from "react-native";


const Add = ({navigation, route}) => {
     const[title, setTitle] = useState("");
     const[ISBN, setISBN] = useState("");
     const[img, setImg] = useState("");
     const[amt, setAmt] = useState("");


     const setData = async(value) =>{
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
     };

     return (
        <View>
            <StatusBar/>
            <Text>Title:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}></TextInput>
            <Text>ISBN:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}></TextInput>
            <Text>Image URL:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>setImg(text)}></TextInput>
            <Text>Copies Owned:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>setAmt(text)}></TextInput>

            <Button title='Submit'
                    onPress={()=>{
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {key:title, ISBN: ISBN, img:img, Copies: amt};
                        mydata.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                        navigation.navigate("Home")

                    }
                    }
            />

        </View>

     )


}

export default Add;
