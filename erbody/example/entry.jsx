import React from 'react'
import Hi from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<Hi {...data} />, document.getElementById('app'))
