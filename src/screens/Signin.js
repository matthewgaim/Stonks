import React, {useContext, useState} from "react";
import {Context as AuthContext} from "../context/AuthContext";
import {SafeAreaView} from "react-navigation";
import {StyleSheet, View} from "react-native";
import {Button, Input, Text} from "react-native-elements";
import Spacer from "../components/Spacer";
import Signup from "./Signup";

const Signin = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, signin} = useContext(AuthContext);

    return (
            <SafeAreaView forceInset={{top: 'always'}}>
                <View style={styles.container}>
                    <Text style={styles.create}>Sign In</Text>
                    <Spacer />
                    <Spacer />
                    <Input leftIcon={{type: 'feather', name: 'mail'}} label={'Email'} value={email} onChangeText={setEmail} placeholder='joe@gmail.com' autoCapitalize='none' autoCorrect={false} />
                    <Spacer />
                    <Input leftIcon={{type: 'feather', name: 'lock'}} label={'Password'} value={password} onChangeText={setPassword} placeholder={'password'} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false}/>
                    <Spacer />
                    <Button title={'Sign In'} style={{marginHorizontal: 10}} onPress={()=> {
                        signin(email, password, ()=> {
                            navigation.navigate('Main');
                        });
                    }}/>
                </View>
            </SafeAreaView>
    );
};

Signin.navigationOptions = () => {
   return {
       header: () => null
   };
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    },
    create:{
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    }
});

export default Signin;