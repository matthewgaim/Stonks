import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Share = ({ ticker, price, change, shares, onClick  }) => {
    price = parseFloat(price);

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.bar}>
                    <View>
                        <Text style={styles.ticker}>${ticker}</Text>
                        <Text>{shares} shares</Text>
                    </View>
                    <Text>{change}%</Text>
                    { change >= 0 ?
                        <Feather name="arrow-up-right" size={25} color="green"/>
                        :
                        <Feather name="arrow-down-right" size={25} color="red" />
                    }
                    <View style={{ backgroundColor:  change >= 0 ? 'green' : 'red', padding: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={styles.price}>${price}</Text>
                    </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 25,
        backgroundColor: `rgb(${224},${224},${224})`,
        borderRadius: 20,
    },
    priceBox:{
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    price:{
        fontSize: 16
    },
    ticker: {
        fontSize: 18
    }
});

export default Share;