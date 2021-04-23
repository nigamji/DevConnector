import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../Layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
const Posts = (props) => {
    useEffect(() => {
        props.getPosts();
    }, [props.post.posts.loading])
    return (
        <div>
            { props.post.loading ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                    <PostForm />
                    <div className="posts">
                        {props.post.posts !== null && (
                            props.post.posts.map(post =>
                                <PostItem post={post} />
                            ))}
                    </div>
                </Fragment>
            )}
        </div>
    )

}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPosts })(Posts)
