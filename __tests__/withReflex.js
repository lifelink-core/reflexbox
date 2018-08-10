
import { mount, node, findComponentNamed } from '../testUtils'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { withReflex } from '../src'

let wrapper
let button
let inner

let MATCHES = null

window.matchMedia = query => ({
  get matches () { return MATCHES ? MATCHES.test(query) : false },
  addListener: () => {},
  removeListener: () => {}
})

const Box = withReflex()('div')
const Button = withReflex()(p => <button {...p} />)

test('renders', () => {
  expect(() => {
    button = mount(<Button flex col={6} />)
    wrapper = mount(<Box flex col={6} p={2} />)
  }).not.toThrow()
  expect(findComponentNamed(wrapper, 'ReflexWrap')).toBeDefined()
})

test('applies styles', () => {
  const button = mount(<Button flex col={6} />)
  const wrapper = mount(<Box flex col={6} p={2} />)
  expect(node(button).style.display).toEqual('flex')
  expect(node(wrapper).style.display).toEqual('flex')
})

test('passes style prop', () => {
  const wrapper = mount(<Box style={{ color: 'red' }} />)
  expect(node(wrapper).style.color).toEqual('red')
})

// Placeholder test for getWidth function
test('renames `column` prop', () => {
  const wrapper = mount(<Box column />)
  const inner = node(wrapper)
  expect(node(wrapper).style["flexDirection"]).toEqual("column")
})

test('renames `auto` prop', () => {
  wrapper = mount(<Box auto />)
  inner = findComponentNamed(wrapper, 'WrappedComponent')
  expect(inner.props).toEqual({
    col: null,
    flexAuto: true,
    style: null
  })
})

test('sm breakpoint', () => {
  MATCHES = /40/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />)
  inner = findComponentNamed(wrapper, 'WrappedComponent')

  expect(inner.props).toEqual({
    col: 3,
    style: null
  })
})

test('md breakpoint', () => {
  MATCHES = /52/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />)
  inner = findComponentNamed(wrapper, 'WrappedComponent')

  expect(inner.props).toEqual({
    col: 2,
    style: null
  })
})

test('lg breakpoint', () => {
  MATCHES = /64/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />)
  inner = findComponentNamed(wrapper, 'WrappedComponent')

  expect(inner.props).toEqual({
    col: 1,
    style: null
  })
})

test('custom breakpoints', () => {
  MATCHES = /24/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />, {
    context: {
      reflexbox: {
        breakpoints: {
          sm: '(min-width:24em)',
          md: '(min-width:36em)',
          lg: '(min-width:48em)'
        }
      }
    }
  })
  inner = findComponentNamed(wrapper, 'WrappedComponent')

  expect(inner.props).toEqual({
    col: 3,
    style: null
  })
})

// Needs work
test('accepts ref attribute', () => {
  class Root extends React.Component {
    render () {
      return (
        <div>
          <Box ref='box' />
        </div>
      )
    }
  }
  wrapper = findComponentNamed(mount(<Root />), 'Root')
  expect(wrapper.refs.box).toBeDefined()
})
