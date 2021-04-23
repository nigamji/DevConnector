import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'
const PostForm = (props) => {
    const [text, setText] = useState('')
    const onChangeHandler = e => {
        setText(e.target.value)
    }
    const submitHandler = e => {
        e.preventDefault();
        props.addPost({ text });
        setText('')
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => submitHandler(e)}>
                <textarea
                    name="text"
                    value={text}
                    onChange={e => onChangeHandler(e)}
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default connect(null, { addPost })(PostForm)
