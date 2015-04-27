import React from 'react'
import { PropTypes } from 'react'
import { Link, RouteHandler, Route, DefaultRoute } from 'react-router'
import ProfileEditWrap from './profileEditWrap.jsx'

class App extends React.Component {
  render () {
    return (
      <div>
        <header >
          <nav className="navbar">
            <strong><Link to="default">a demo app</Link></strong>
            <ul>
              <li><Link to="profile">profile</Link></li>
              <li><Link to="cats">cats</Link></li>
            </ul>
          </nav>
        </header>

        <RouteHandler {...this.props} />
      </div>
    )
  }
}

App.propTypes = {
  flux: PropTypes.object.isRequired
}

class Demo extends React.Component {
  render () {
    return (<div>
      <h1>random image!!</h1>
      <img src="http://lorempixel.com/800/400" />
    </div>)
  }
}

class Profile extends React.Component {
  render () {
    return <ProfileEditWrap userId='user:1' flux={this.props.flux} />
  }
}
Profile.propTypes = {
  flux: PropTypes.object.isRequired
}

class Cats extends React.Component {
  render () {
    return <img src="http://thecatapi.com/api/images/get?format=src&type=gif" />
  }
}

export default (
  <Route name="default" path="/" handler={App}>
    <Route name="profile" handler={Profile} />
    <Route name="cats" handler={Cats} />
    <DefaultRoute handler={Demo} />
  </Route>
)
