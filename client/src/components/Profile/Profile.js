import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../Layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
const Profile = (props) => {
    useEffect(() => {
        props.getProfileById(props.match.params.id)
    }, [props.match.params.id])
    return (
        <Fragment>
            {props.profile.profile === null || props.profile.loading ? <Spinner /> : (<Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Back To Profiles</Link>
                {props.auth.isAuthenticated && props.auth.loading === false &&
                    props.auth.user._id === props.profile.profile.user._id &&
                    (<Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>)}
            </Fragment>)}
            <div className="profile-grid my-1">
                {props.profile.profile && (
                    <Fragment>
                        <ProfileTop profile={props.profile.profile} />
                        <ProfileAbout profile={props.profile.profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {props.profile.profile.experience.length > 0 ? (<Fragment>
                                {props.profile.profile.experience.map(exp =>
                                    <ProfileExperience key={exp._id} experience={exp} />)}
                            </Fragment>) : <h4>No experience Credentials</h4>}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {props.profile.profile.education.length > 0 ? (<Fragment>
                                {props.profile.profile.education.map(edu =>
                                    <ProfileEducation key={edu._id} education={edu} />)}
                            </Fragment>) : <h4>No education Credentials</h4>}
                        </div>
                        {props.profile.profile.githubusername && (
                            <ProfileGithub username={props.profile.profile.githubusername} />
                        )}
                    </Fragment>
                )}

            </div>
        </Fragment >
    )
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile)