import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import { Link } from 'react-router-dom'
import Spinner from '../Layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
const Dashboard = props => {

    useEffect(() => {
        props.getCurrentProfile();
    }, [])
    return props.profile.loading && props.profile.profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>{' '}
            Welcome {props.auth.user && props.auth.user.name}
        </p>
        {props.profile.profile !== null ?
            <Fragment>
                <DashboardActions />
                <Experience experiences={props.profile.profile.experience} />
                <Education educations={props.profile.profile.education} />
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => props.deleteAccount()}>
                        <i className="fas fa-user-minus">{' '}Delete Account</i>
                    </button>
                </div>
            </Fragment> :
            <Fragment>
                <p>You haven't created a profile yet, Please add some info!</p>
                <Link to='/create-profile' className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </Fragment>}
    </Fragment>

}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
