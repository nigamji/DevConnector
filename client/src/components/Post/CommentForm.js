import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'
const CommentForm = ({ postid, addComment }) => {
    const [text, setText] = useState('')
    const onChangeHandler = e => {
        setText(e.target.value)
    }
    const submitHandler = e => {
        e.preventDefault();
        addComment(postid, { text })
        setText('')
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => submitHandler(e)}>
                <textarea
                    name="text"
                    value={text}
                    onChange={e => onChangeHandler(e)}
                    cols="30"
                    rows="5"
                    placeholder="Leave a comment"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default connect(null, { addComment })(CommentForm)
