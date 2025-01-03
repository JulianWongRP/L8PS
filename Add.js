import React, {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, StatusBar, TextInput, View, Text, StyleSheet} from "react-native";


const Add = ({navigation, route}) => {
     const[title, setTitle] = useState("");
     const[ISBN, setISBN] = useState("");
     const[img, setImg] = useState("");
     const[amt, setAmt] = useState("");


     const setData = async(value) =>{
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
     };

    const styles = StyleSheet.create({
        container: {
            margin: 10,
            padding: 10,
            marginTop: 50,
        },

        words: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'grey',

        }
    })
     return (
        <View style={styles.container}>
            <StatusBar/>
            <View>
                <Text style={styles.words}>Title:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}></TextInput>
            </View>
            <View>
                <Text style={styles.words}>ISBN:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}></TextInput>
            </View>
            <View>
                <Text style={styles.words}>Image URL:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setImg(text)}></TextInput>
            </View>
            <View>
                <Text style={styles.words}>Copies Owned:</Text>
                <TextInput style={{borderWidth:1}} onChangeText={(text)=>setAmt(text)}></TextInput>
            </View>


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
