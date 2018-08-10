
import { mount, findComponentNamed } from '../testUtils'
import React from 'react'
import { Grid } from '../src'

let wrapper
let inner

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
})

test('renders', () => {
  expect(() => {
    wrapper = mount(<Grid col={6} p={2} />)
  }).not.toThrow()
})

test('passes props', () => {
  wrapper = mount(<Grid col={6} p={2} />)
  inner = findComponentNamed(wrapper, 'ReflexWrap')
  expect(inner.props).toEqual({
    className: 'Grid',
    inlineBlock: true,
    col: 6,
    p: 2,
    style: {
      verticalAlign: 'top'
    }
  })
})

test('passes align prop', () => {
  wrapper = mount(<Grid align='middle' />)
  inner = findComponentNamed(wrapper, 'ReflexWrap')
  expect(inner.props.style.verticalAlign).toEqual('middle')
})

test('passes className prop', () => {
  wrapper = mount(<Grid className='hello' />)
  inner = findComponentNamed(wrapper, 'ReflexWrap')
  expect(inner.props.className).toEqual('Grid hello')
})

test('applies vertical-align styles', () => {
  wrapper = mount(<Grid className='hello' />)
  inner = findComponentNamed(wrapper, 'ReflexWrap')
  expect(inner.props.style.verticalAlign).toEqual('top')
})

test('applies styles', () => {
  wrapper = mount(<Grid m={2} />)
  inner = findComponentNamed(wrapper, 'div')
  expect(inner.style.margin).toEqual('16px')
})
