import React, {useState, useEffect}  from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import finance from "../api/finance";
import Share from "../components/Share";
import {host, key} from '../api/security';

const MainPage = () => {
    const [quote, setQuote] = useState(0);
    const [ticker, setTicker] = useState('TSLA');
    const [stockList, setStockList] = useState([]);

    const search = async (tick) => {
        await finance.get(`?symbol=${tick}&function=GLOBAL_QUOTE`).then((response) => {
            console.log('\n\n WORKED \n\n');
            const data = response.data["Global Quote"];
            data !== undefined ? setStockList([...stockList, data]) : null;
        }).catch((error)=>{
            console.log(error);
        });
    };

    useEffect(() => {
        // search(ticker);
    }, []);

    return (
        <View>
            <TextInput
                style={styles.textInput}
                value={ticker}
                onChangeText={(text) => setTicker(text)}
                onEndEditing={() => search(ticker)}
            />

            <FlatList
                data={stockList}
                keyExtractor={(key) => key["01. symbol"]}
                renderItem={(stock) => {
                    stock = stock["item"];
                    return <Share ticker={stock["01. symbol"]} price={stock["05. price"]} change={stock["09. change"]} shares={20} />;
                }}
            />


        </View>
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