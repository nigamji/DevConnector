import React, { Fragment, useEffect } from 'react'
import Spinner from '../Layout/Spinner'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
const Profiles = (props) => {
    useEffect(() => {
        props.getProfiles();
    }, [])
    return (
        <Fragment>
            {props.profile.loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"> Browse and connect with developers</i>
                        <div className="profiles">
                            {props.profile.profiles.length > 0 ? (
                                props.profile.profiles.map(profile => (
                                    <ProfileItem key={profile.id} profile={profile} />
                                ))
                            ) : <Spinner />}
                        </div>
                    </p>
                </Fragment>}
        </Fragment >
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(Profiles)
