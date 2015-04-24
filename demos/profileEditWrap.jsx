import React from 'react'
import { PropTypes } from 'react'
import FluxComponent from 'flummox/component'
import ProfileEdit from './profileEdit.jsx'

export default class ProfileEditWrap extends React.Component {
  onSubmit (data) {
    this.props.flux.getActions('users').set(data)
  }

  render () {
    return (
      <FluxComponent
        connectToStores={{
          users: (store) => ({
            user: store.get(this.props.userId)
          })
        }}
        flux={this.props.flux}
        render={
          (storeState) =>
            <ProfileEdit user={storeState.user} onSubmit={this.onSubmit.bind(this)} />
        }
      />
    )
  }
}

ProfileEditWrap.propTypes = {
  userId: PropTypes.string.isRequired
  , flux: PropTypes.object.isRequired
}
