import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    LOGIN_USERNAME_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_USER,
    SIGNUP_EMAIL_CHANGED,
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_USERNAME_CHANGED,
    SIGNUP_CONFIRM_PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_USERNAME,
    SET_ACCESS_TOKEN,
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    SET_USER_ID,
    SET_USER_DATA,
} from '../types';

import {
    LOGIN,
    SIGNUP
} from '../../api/API';

import NavigationService from '../../services/NavigationService';

//login actions-------------------------------------
export const loginUsernameChanged = (username) => {
    return {
        type: LOGIN_USERNAME_CHANGED,
        payload: username
    };
};

export const loginPasswordChanged = (password) => {
    return {
        type: LOGIN_PASSWORD_CHANGED,
        payload: password
    };
};

export const loginUser = (username, password, isChecked) => {
    console.log(username, password)
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        fetch(LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
                    .then(resJson => {
                        console.log(resJson);
                        if (resJson.success) {
                            dispatch({ type: LOGIN_SUCCESS });
                            setAccessToken(resJson.token, dispatch);
                            setUsername(resJson.user.username, dispatch);
                            setUserId(resJson.user.id, dispatch);
                            if (isChecked) {
                                AsyncStorage.setItem('accessToken', resJson.token);
                                AsyncStorage.setItem('userId', resJson.user.id);
                                AsyncStorage.setItem('userName', resJson.user.username);
                            }
                            NavigationService.navigate('App');
                        } else {
                            dispatch({ type: LOGIN_FAILED });
                            Alert.alert(
                                'Login Failed!',
                                resJson.msg,
                                [
                                    { text: 'Ok' },
                                ],
                            );
                        }
                    });
            } else {
                dispatch({ type: LOGIN_FAILED });
                Alert.alert(
                    'Login Failed!',
                    'Something went wrong',
                    [
                        { text: 'Ok' },
                    ],
                );
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: LOGIN_FAILED });
            Alert.alert(
                'Login Failed!',
                'Something went wrong',
                [
                    { text: 'Ok' },
                ],
            );
        });
    };
};

//set user Details in app state for logged in user
export const setUserDetails = (accessToken, userId, username) => {
    return (dispatch) => {
        setAccessToken(accessToken, dispatch);
        setUserId(userId, dispatch);
        setUsername(username, dispatch);
    };
}

const setUsername = (username, dispatch) => {
    dispatch({ type: SET_USERNAME, payload: username });
};

const setAccessToken = (accessToken, dispatch) => {
    dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
};

const setUserId = (userId, dispatch) => {
    dispatch({ type: SET_USER_ID, payload: userId });
};


//signup actions------------------------------------------------
export const signupEmailChanged = (email) => {
    return {
        type: SIGNUP_EMAIL_CHANGED,
        payload: email
    };
};

export const signupUsernameChanged = (username) => {
    return {
        type: SIGNUP_USERNAME_CHANGED,
        payload: username
    };
};

export const signupPasswordChanged = (password) => {
    return {
        type: SIGNUP_PASSWORD_CHANGED,
        payload: password
    };
};

export const signupConfirmPasswordChanged = (confirmPassword) => {
    return {
        type: SIGNUP_CONFIRM_PASSWORD_CHANGED,
        payload: confirmPassword
    };
};


export const signUpUser = (email, username, password, confirmPass) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER });
        fetch(SIGNUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                confirmPass: confirmPass
            })
        }).then(response => {
            console.log(response);
            if (response.ok) {
                return response.json()
                    .then(resJson => {
                        console.log(resJson);
                        if (resJson.success) {
                            dispatch({ type: SIGNUP_SUCCESS });
                            NavigationService.navigate('Signup2');
                        } else {
                            dispatch({ type: SIGNUP_FAILED });
                            Alert.alert(
                                'Signup Failed!',
                                resJson.msg,
                                [
                                    { text: 'Ok' },
                                ],
                            );
                        }
                    });
            } else {
                dispatch({ type: SIGNUP_FAILED });
                Alert.alert(
                    'Signup Failed!',
                    'Something went wrong',
                    [
                        { text: 'Ok' },
                    ],
                );
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: SIGNUP_FAILED });
            Alert.alert(
                'Signup Failed!',
                'Something went wrong',
                [
                    { text: 'Ok' },
                ],
            );
        });
    };
};