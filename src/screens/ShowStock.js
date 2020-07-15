import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Context} from "../context/StockContext";

const ShowStock = ({ navigation }) => {

    const [showShares, setShowShares] = useState(false);
    const [sharesAmount, setSharesAmount] = useState('');

    return (
        <View>

        </View>
    );
};

export default ShowStock;