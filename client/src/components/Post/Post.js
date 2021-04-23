import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../Layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../Posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [])
    return (
        loading || post == null ? <Spinner /> :
            <Fragment>
                <Link to="/posts" className="btn btn-light">Go Back</Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postid={post._id} />
                <div className="comments">
                    {post.comments.map(comment =>
                        <CommentItem comment={comment} postid={post._id} />)}
                </div>
            </Fragment >
    )

}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(Post)
