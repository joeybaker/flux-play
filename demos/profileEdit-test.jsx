// there are a ton of handy methods to get things off the DOM
// https://facebook.github.io/react/docs/test-utils.html

import test from 'tape'
import React from 'react'
import ProfileEdit from './profileEdit.jsx'
import {addons} from 'react/addons'
import users from './example/userfixtures.json'
import sinon from 'sinon'
const {TestUtils} = addons
const {Simulate, renderIntoDocument, isElement, createRenderer} = TestUtils
const getReactNode = (dom, node) => TestUtils.findRenderedDOMComponentWithTag(dom, node)
const getDOMNode = (dom, node) => getReactNode(dom, node).getDOMNode()
const getDOMNodes = (dom, type) => TestUtils.scryRenderedDOMComponentsWithTag(dom, type)
const getDOMNodeText = (dom, node) => getDOMNode(dom, node).textContent

test('profleEdit', (suite) => {
  let profileEdit
  let dom
  let getText
  let getNode
  let getNodes
  let renderer
  let onInputChange
  let setData
  const onSubmit = sinon.stub()

  const beforeEach = () => {
    onInputChange = sinon.spy(ProfileEdit.prototype, 'onInputChange')
    setData = sinon.spy(ProfileEdit.prototype, 'setData')
    profileEdit = <ProfileEdit user={users[0]} onSubmit={onSubmit} />
    dom = renderIntoDocument(profileEdit)
    getText = getDOMNodeText.bind(null, dom)
    getNode = getReactNode.bind(null, dom)
    getNodes = getDOMNodes.bind(null, dom)
    renderer = createRenderer()
  }

  const afterEach = () => {
    onSubmit.reset()
    onInputChange.restore()
    setData.restore()
  }

  suite.test('#constructor', (t) => {
    beforeEach()
    t.ok(isElement(profileEdit), 'is a valid React Component')
    afterEach()
    t.end()
  })

  suite.test('rendered DOM', (t) => {
    beforeEach()
    t.equal(
      getText('header')
      , 'Ricky\'s profile'
      , 'sets the title with the user\'s first name'
    )

    afterEach()
    t.end()
  })

  suite.test('when an input changes', (t) => {
    beforeEach()
    const input = getNodes('input')[0]
    Simulate.change(input, {target: {value: 'hi', name: 'name.first'}})

    t.ok(onInputChange.calledOnce, 'calls #onInputChange')
    t.deepEqual(
      setData.args[0][0]
      , {name: {first: 'hi'}}
    )

    afterEach()
    t.end()
  })

  suite.test('submission', (t) =>{
    beforeEach()
    const button = getNode('button')
    Simulate.submit(button)

    t.ok(
      onSubmit.calledOnce
      , 'calls the onSubmit prop'
    )

    afterEach()
    t.end()
  })

  suite.test('after submission', (t) => {
    beforeEach()
    const rendered2 = React.createElement(ProfileEdit, {user: users[1]})
    renderer.render(profileEdit)
    renderer.render(rendered2)
    t.ok(renderer.getRenderOutput().props.children[0], 'should render out updates')

    afterEach()
    t.end()
  })


  suite.end()
})
