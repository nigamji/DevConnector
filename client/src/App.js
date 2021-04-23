import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import LandingPage from './components/Layout/LandingPage'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Alert from './components/Layout/Alert'
import Dashboard from './components/Dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import CreateProfile from './components/Profile-form/CreateProfile'
import EditProfile from './components/Profile-form/EditProfile'
import AddExperience from './components/Profile-form/AddExperience'
import AddEducation from './components/Profile-form/AddEducation'
import Profiles from './components/Profiles/Profiles'
import Profile from './components/Profile/Profile'
import Posts from './components/Posts/Posts'
import Post from './components/Post/Post'
import { Provider } from 'react-redux'
import store from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Layout />
          <Route exact path="/" component={LandingPage} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
