import {default as React, PropTypes} from 'react'

export default class Hi extends React.Component {
  constructor () {
    super()
    this.state = {count: 0}
  }

  onClick (e) {
    e.preventDefault()
    this.setState((state) => ({count: ++state.count}))
    this.setState({count: ++this.state.count})
  }

  render () {
    return (
      <div onClick={this.onClick.bind(this)}>
        <h1>hi {this.props.user.name} {this.state.count} </h1>
      </div>
    )
  }
}

Hi.propTypes = {
  user: PropTypes.object.isRequired
}
