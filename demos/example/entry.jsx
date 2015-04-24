import React from 'react'
import App from '../index.jsx'
import { flux } from './data.js'

// expose React for debugging
window.React = React

// console.log(flux)
// flux.getStore('users').on('change', (...args) => console.log('change', args))
// flux.getActions('users').setEmail({id: 'user:1', email: 'me@me.com'})
// console.log(flux.state.cursor(['users', 'user:1']).get('email'))
// console.log(flux.getStore('users').get('user:1'))

React.render(<App flux={flux} />, document.getElementById('app'))
