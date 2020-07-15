import React, {useState, useEffect, useContext}  from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button } from 'react-native';
import finance from "../api/finance";
import Share from "../components/Share";
import {host, key} from '../api/security';
import {Context as StockContext} from "../context/StockContext";
import {SafeAreaView} from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';

const MainPage = ({ navigation }) => {
    const [ticker, setTicker] = useState('');
    const [stockList, setStockList] = useState([]);
    const {state, getOwnedTickers} = useContext(StockContext);

    const search = async (tick) => {
        await finance.get(`?symbol=${tick}&function=GLOBAL_QUOTE`).then((response) => {
            const data = response.data["Global Quote"];
            data !== undefined ? setStockList([...stockList, data]) : alert('Didnt work');
        }).catch((error)=>{
            console.log(error);
        });
    };

    useEffect(() => {
        const fetchData = async function() {
            await getOwnedTickers()
            setStockList(state);
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <View>
                <TextInput
                    style={styles.textInput}
                    value={ticker}
                    placeholder={'Enter Ticker Here (ex. MSFT)'}
                    onChangeText={(text) => setTicker(text)}
                    onEndEditing={() => search(ticker)}
                />

                <FlatList
                    data={stockList}
                    keyExtractor={(key) => key._id}
                    renderItem={({item}) => {
                        console.log(item);
                        return <Share
                            id={item._id}
                            ticker={item.symbol}
                            price={item.buyInPrice}
                            change={2}
                            shares={item.sharesOwned}
                            onClick={() => navigation.navigate('Stock', {stock: item})}
                        />;
                    }}
                />
                <Button title={'Signout'} onPress={async ()=> {
                    await AsyncStorage.removeItem('token');
                    navigation.navigate('Signin');
                }}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        padding: 25,
        margin: 20,
        fontSize: 20,
        backgroundColor: `rgb(${224},${224},${224})`,
        borderRadius: 25
    }
});

export default MainPage;