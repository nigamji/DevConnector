import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types'
import axios from 'axios'
import { setAlert } from './alert'

//Get Posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//Get Post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//Add Like
export const addLike = (postid) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postid}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postid, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//Remove Like
export const removeLike = (postid) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postid}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postid, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//Delete post
export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Removed Successfully', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//ADD POST
export const addPost = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`api/posts`, formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//ADD COMMENT
export const addComment = (postid, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/posts/comment/${postid}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//DELETE COMMENT
export const deleteComment = (postid, commentid) => async dispatch => {
    try {
        await axios.delete(`api/posts/comment/${postid}/${commentid}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentid
        })
        dispatch(setAlert('Comment Removed', 'danger'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}