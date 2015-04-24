import React from 'react'
import { PropTypes } from 'react'
import ProfileEditWrap from './profileEditWrap.jsx'
import FluxComponent from 'flummox/component'

export default class App {
  render () {
    return (
      // <FluxComponent>
        <ProfileEditWrap userId='user:1' flux={this.props.flux} />
      // </FluxComponent>
    )
  }
}

App.propTypes = {
  flux: PropTypes.object.isRequired
}
