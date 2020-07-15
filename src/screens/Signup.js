import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from "react-navigation";
import { Feather } from '@expo/vector-icons';
import Spacer from "../components/Spacer";
import {Context as AuthContext} from '../context/AuthContext';

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const {state, signup} = useContext(AuthContext);
    return (
            <SafeAreaView forceInset={{top: 'always'}}>
                <View style={styles.container}>
                    <Text style={styles.create}>Create an Account</Text>
                    <Spacer />
                    <Spacer />
                    <Input leftIcon={{type: 'feather', name: 'mail'}} label={'Email'} value={email} onChangeText={setEmail} placeholder='joe@gmail.com' autoCapitalize='none' autoCorrect={false} />
                    <Spacer />
                    <Input leftIcon={{type: 'feather', name: 'lock'}} label={'Password'} value={password} onChangeText={setPassword} placeholder={'password'} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false}/>
                    <Spacer />
                    <Input leftIcon={{type: 'feather', name: 'user'}} label={'First Name'} value={name} onChangeText={setName} autoCorrect={false}/>
                    <Spacer />
                    <Button title={'Sign Up'} style={{marginHorizontal: 10}} onPress={()=> {
                        signup(email, password, name, ()=> {
                            navigation.navigate('Main');
                        });
                    }}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                        <Text style={{marginTop: 50, alignSelf: 'center', color: 'blue'}}>Don't have an account?</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    );
};

Signup.navigationOptions = () => {
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

export default Signup;