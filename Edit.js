import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const[title,setTitle] = useState(route.params.key);
    const[ISBN, setISBN] = useState(route.params.ISBN);
    const[img, setImg] = useState(route.params.img);
    const[amt, setAmt] = useState(route.params.amt);

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    }

    return (

        <View style={{margin: 10}}>
            <Text style={{fontSize: 20, color: "red"}}>Edit Title:</Text>
            <TextInput value={title} style={{borderWidth: 1, marginBottom: 20}} onChangeText={(text) => setTitle(text)}/>
            <Text style={{fontSize: 20, color: "grey"}}>Edit ISBN:</Text>
            <TextInput value={ISBN} style={{borderWidth: 1}} onChangeText={(text) => setISBN(text)}/>
            <Text style={{fontSize: 20, color: "grey"}}>Edit ISBN:</Text>
            <TextInput value={img} style={{borderWidth: 1}} onChangeText={(text) => setImg(text)}/>
            <Text style={{fontSize: 20, color: "grey"}}>Edit Copies:</Text>
            <TextInput value={amt} style={{borderWidth: 1}} onChangeText={(text) => setAmt(text)}/>
            <View style={{flexDirection: "row"}}>
                <View style={{margin: 10, flex: 1}}>
                    <Button title="Save"
                            onPress={()=>{
                                mydata[myindex] = {
                                    key: title,
                                    ISBN: ISBN,
                                    img: img,
                                    Copies: amt,
                                }
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                                navigation.navigate("Home");
                            }}
                    />
                </View>


                <View style={{margin: 10, flex: 1}}>
                    {/*Delete Button*/}
                    <Button title="Delete"
                            onPress={()=>{
                                Alert.alert("Are you sure?", ' ',
                                    [{text: "Yes", onPress:()=>{
                                        mydata.splice(route.params.index, 1);
                                        let stringdata = JSON.stringify(mydata);
                                        setData(stringdata);
                                        navigation.navigate("Home");
                                    }},
                                    {text: "No"}])

                            }}/>
                </View>
            </View>


        </View>
    )
}

export default Edit;
