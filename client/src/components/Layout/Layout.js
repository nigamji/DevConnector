import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
const Layout = (props) => {
    const authLink = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/dashboard">
                <i className="fas fa-user"></i>{' '}
                <span className="hide-sm">Dashboard</span></Link></li>
            <li>
                <a onClick={props.logout} href="#!"><i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span></a>
            </li>
        </ul>
    );
    const guestLink = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!props.auth.loading && (<Fragment>
                {props.auth.isAuthenticated ? authLink : guestLink}
            </Fragment>)}
        </nav>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Layout)