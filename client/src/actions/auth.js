import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    PROFILE_CLEAR
} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

//User laod
export const loadUser = () => {
    if (localStorage.token)
        setAuthToken(localStorage.token)
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({ type: AUTH_ERROR })
        }
    }
}

//login user
export const login = (email, password) => {

    return async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post('/api/auth', body, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
        } catch (error) {
            const errors = error.response.data.errors
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            setAlert()
            dispatch({ type: LOGIN_FAIL })
        }
    }
}
//logout user 
export const logout = () => {
    return dispatch => {
        dispatch({
            type: PROFILE_CLEAR
        })
        dispatch({
            type: LOGOUT
        })
    }
}
//Register user
export const register = ({ name, email, password }) => {

    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ name, email, password });
        try {
            const res = await axios.post('/api/users', body, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
        } catch (error) {
            const errors = error.response.data.errors
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            setAlert()
            dispatch({ type: REGISTER_FAIL })
        }
    }
}