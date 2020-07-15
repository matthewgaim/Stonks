import createDataContext from "./createDataContext";
import server from "../api/mongo-server";
import AsyncStorage from '@react-native-community/async-storage';

const reducer = (state, action) => {
    switch (action.type){
        case 'signup':
            return {token: action.payload};
        case 'signin':
            return {token: action.payload};
        default:
            return state;
    };
};

const signup = dispatch => async (email, password, name, callback) => {
    try {
        const query = await server.post('/signup', {email, password, firstName: name});
        await AsyncStorage.setItem('token', query.data.token);
        dispatch({type: 'signup', payload: query.data.token});
        callback();
    } catch (err) {
        console.log(err);
    }
};

const signin = dispatch => async (email, password, callback) => {
    try {
        const query = await server.post('/signin', {email, password});
        await AsyncStorage.setItem('token', query.data.token);
        dispatch({type: 'signin', payload: query.data.token});
        callback();
    } catch (err) {
        console.log(err);
    }
};

export const {Context, Provider} = createDataContext(
    reducer,
    {signup, signin},
    {token: null}
)