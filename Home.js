import React, {useState} from 'react';
import {datasource} from "./Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, FlatList, TouchableOpacity, View, Text, Image, StyleSheet} from "react-native";

const Home = ({navigation}) => {

    const [mydata, setMydata] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if(datastr != null){
            let jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        } else {
            setMydata(datasource);
        }
    };

    getData();

    const renderItem = ({item, index}) => {
        return(
            <TouchableOpacity onPress={() => {
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Edit",
                    {index:index,
                        key:item.key,
                        ISBN:item.ISBN,
                        img:item.img,
                        amt:item.Copies,
                        datastring: datastr});
            }} style={styles.itemContainer}>

                <Image source={{uri: item.img}} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.key}</Text>
                    <Text style={styles.isbn}>ISBN: {item.ISBN}</Text>
                    <Text style={styles.copies}>Copies: {item.Copies}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Button title={"Add Books"} onPress={() => {
                let datastr = JSON.stringify(mydata)
                navigation.navigate("Add", {datastring:datastr});
            }} />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20,
    },
    flatListContainer: {
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    isbn: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 5,
    },
    copies: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default Home;
