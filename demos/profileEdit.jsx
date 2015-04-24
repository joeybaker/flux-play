import React from 'react'
import {PropTypes, findDOMNode} from 'react'
import merge from 'lodash/object/merge'
import {unflatten} from 'flat'
import isEqual from 'lodash/lang/isEqual'
import reduce from 'lodash/collection/reduce'
import map from 'lodash/collection/map'
import isEmpty from 'lodash/lang/isEmpty'
import omit from 'lodash/object/omit'

const name = 'profileEdit'
const digitsOnlyRegx = /^[0-9]*$/

const isValidPhone = (phone) => digitsOnlyRegx.test(phone)

export default class ProfileEdit extends React.Component {
  constructor () {
    super()
    this.state = {errors: {}, updates: {}}
  }

  onInputChange (e) {
    const err = this.getValidityMessage(e.target)
    const attr = e.target.name
    const value = e.target.value

    if (err) this.setError(attr, err)
    else this.unsetError(attr)

    this.setData(unflatten({[attr]: value}))
  }

  onCheckboxChange (e) {
    this.setData(unflatten({[e.target.name]: e.target.checked}))
  }

  onNameLabelFocus () {
    findDOMNode(this.refs.inputNameFirst).focus()
  }

  onSubmit (e) {
    e.preventDefault()
    if (!isEmpty(this.state.errors)) return
    this.props.onSubmit(this.getData())
    this.setState({disableSubmit: true})
  }

  getValidityMessage (node) {
    const type = node.type
    const value = node.value

    if (node.validationMessage) return node.validationMessage

    switch (type) {
      case 'tel':
        if (value.length > 10) return 'too many digits'
        else if (!isValidPhone(value)) return 'digits only!'
        break
      default:
        return void 0
    }
  }

  getData () {
    return merge({}, this.props.user, this.state.user)
  }

  getErrors () {
    return this.state.errors || {}
  }

  setData (data) {
    this.setState({user: merge(this.getData(), data)})
  }

  setError (attr, err) {
    this.setState({errors: merge({}, this.state.errors, {[attr]: err})})
  }

  unsetError (attr) {
    const errors = omit(this.state.errors, attr)
    this.setState({errors})
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
      || !isEqual(this.state.errors, nextState.errors)
      || !isEqual(this.state.updates, nextState.updates)
  }

  componentWillReceiveProps (nextProps) {
    const updates = reduce(nextProps.user, function findUpdates (out, value, attr) {
      if (!isEqual(value, this.props.user[attr])) out[attr] = value
      return out
    }, {}, this)
    this.setState({updates, disableSubmit: false})
  }

  render () {
    const user = this.getData()
    const errors = this.getErrors()
    const nameLabelId = `${name}-inputLabel-name`
    const updatesClassName = `${name}-updates`
    let updates

    if (!isEmpty(this.state.updates)) {
      updates = <ul className={updatesClassName}>{map(this.state.updates, (value, attr) => <li key={attr}>Updated <strong>{attr}</strong> to <strong>{value}</strong></li>)}</ul>
    }

    console.log('re-render')

    return (
      <div className={name}>
        {updates}
        <header>
          <h1>{user.name.first}'s profile</h1>
        </header>

        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="inputGroup">
            <strong id={nameLabelId} onClick={this.onNameLabelFocus.bind(this)}>Name</strong>
            <input name="name.first" defaultValue={user.name.first} onChange={this.onInputChange.bind(this)} ref="inputNameFirst" aria-labelledby={nameLabelId} />
            <input name="name.last" defaultValue={user.name.last} onChange={this.onInputChange.bind(this)} aria-labelledby={nameLabelId} />
          </div>
          <label className="inputGroup">
            <strong className={errors.email ? 'inputGroup-error' : ''}>{errors.email || 'Email'}</strong>
            <input type="email" name="email" defaultValue={user.email} onChange={this.onInputChange.bind(this)} />
          </label>
          <label className="inputGroup">
            <strong className={errors.phone ? 'inputGroup-error' : ''}>{errors.phone || 'Phone'}</strong>
            <input type="tel" name="phone" defaultValue={user.phone} required onChange={this.onInputChange.bind(this)} />
          </label>
          <div className="inputGroup">
            <strong>Notifications</strong>
            <label className="inputGroup">
              Email
              <input type="checkbox" name="notifications.email" onChange={this.onCheckboxChange.bind(this)} checked={user.notifications.email} />
            </label>
            <label className="inputGroup">
              SMS
              <input type="checkbox" name="notifications.sms" onChange={this.onCheckboxChange.bind(this)} checked={user.notifications.sms} />
            </label>
          </div>
          <button type="submit" disabled={this.state.disableSubmit}>Save</button>
        </form>
      </div>
    )
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.object.isRequired
  , onSubmit: PropTypes.func.isRequired
}
