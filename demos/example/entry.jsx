import React from 'react'
import App from '../index.jsx'
import {flux} from './data.js'
import Router from 'react-router'

// expose React for debugging
window.React = React

Router.run(App, Router.HistoryLocation, function routerRunning (Handler) {
  React.render(<Handler flux={flux} />, document.getElementById('app'))
})
