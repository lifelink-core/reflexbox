import './rafPolyfill'
import React from 'react'
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export function mount(element, options = {}) {
  const context = options.context || {}
  const contextTypes = {}
  Object.keys(context).forEach(key => (contextTypes[key] = PropTypes.any))
  class ContextProvider extends React.Component {
    getChildContext() {
      return context
    }
    render() {
      return element
    }
  }
  ContextProvider.childContextTypes = contextTypes
  return ReactTestUtils.renderIntoDocument(<ContextProvider context={context}>{element}</ContextProvider>)
}

export function node(component) {
  return ReactDOM.findDOMNode(component)
}

export function findComponentNamed(rootComponent, name) {
  let firstLetter = name[0]
  let lowerCase = firstLetter === firstLetter.toLowerCase()
  if (lowerCase) {
    return ReactTestUtils.findRenderedDOMComponentWithTag(rootComponent, name)
  } else {
    return ReactTestUtils.findAllInRenderedTree(rootComponent, el => {
      return el && el.constructor && el.constructor.name === name
    })[0]
  }
}
