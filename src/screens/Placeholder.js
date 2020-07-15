import React, {useEffect} from "react";
import AsyncStorage from '@react-native-community/async-storage';

export default ({ navigation }) => {

    useEffect(()=>{
        async function fetchData(){
            const token = await AsyncStorage.getItem('token');
            if(token) navigation.navigate('Main');
            else navigation.navigate('Auth');
        };
        fetchData();
    }, [])

    return <></>;
};