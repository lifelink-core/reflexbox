
import { mount, findComponentNamed } from '../testUtils'
import React from 'react'
import { Box } from '../src'

let wrapper
let inner

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
})

test('renders', () => {
  expect(() => {
    mount(<Box className='hello' />)
  }).not.toThrow()
})

test('passes props', () => {
  wrapper = mount(<Box col={6} p={2} />)
  inner = findComponentNamed(wrapper, 'ReflexWrap')
  expect(inner.props).toEqual({
    className: 'Box',
    col: 6,
    p: 2
  })
})

test('passes className prop', () => {
  wrapper = mount(<Box className='hello' />)
  inner = findComponentNamed(wrapper, 'ReflexWrap')
  expect(inner.props.className).toEqual('Box hello')
})

test('applies styles', () => {
  wrapper = mount(<Box flex />)
  inner = findComponentNamed(wrapper, 'div')
  expect(inner.style.display).toEqual('flex')
})
