import {
    ACCOUNT_DELETED, GET_PROFILE, PROFILE_CLEAR, PROFILE_ERR, UPDATE_PROFILE, GET_PROFILES,
    GET_REPOS
} from './types'
import { setAlert } from './alert'
import axios from 'axios'

//get current profile
export const getCurrentProfile = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/profile/me')
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}
//Get all profiles 
export const getProfiles = () => {
    return async dispatch => {
        //just in case previous user profile flashes up
        dispatch({ type: PROFILE_CLEAR })
        try {
            const res = await axios.get('/api/profile')
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}
//Get profile by ID
export const getProfileById = (userId) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/api/profile/user/${userId}`)
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}
//Get github repos
export const getGithubRepos = (username) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/api/profile/github/user/${username}`)
            dispatch({
                type: GET_REPOS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}
//create or update profile
export const createProfile = (formData, history, edit = false) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post('api/profile', formData, config)
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
            if (!edit) {
                history.push('/dashboard')
            }
        } catch (error) {
            const errors = error.response.data.err
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }

    }
}
//add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))

        history.push('/dashboard')

    } catch (error) {
        const errors = error.response.data.err
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}
//add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))

        history.push('/dashboard')

    } catch (error) {
        const errors = error.response.data.err
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}
//Delete experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience removed!', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//Delete education
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education removed!', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//DElete account & profile 
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can\'t be undone!')) {
        try {
            const res = await axios.delete('api/profile')
            dispatch({
                type: PROFILE_CLEAR
            })
            dispatch({
                type: ACCOUNT_DELETED
            })
            dispatch(setAlert('Account deletd succesfully', 'success'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}