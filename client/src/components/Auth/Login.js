import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault();
        props.login(email, password);
    }
    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email"
                            value={email} onChange={e => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"

                            value={password} onChange={e => handleChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)