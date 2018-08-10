
import { mount, findComponentNamed } from '../testUtils'
import React from 'react'
import { Flex } from '../src'

let wrapper
let inner

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
})

test('renders', () => {
  wrapper = mount(<Flex className='hello' p={2} />)
  expect(() => {
    findComponentNamed(wrapper, 'ReflexWrap')
  }).not.toThrow()
})

test('passes props', () => {
  const wrapper = mount(<Flex className='hello' p={2} />)
  const inner = findComponentNamed(wrapper, 'ReflexWrap')
  const props = inner.props
  expect(props.flex).toEqual(true)
  expect(props.className).toEqual('Flex hello')
  expect(props.p).toEqual(2)
})

test('applies styles', () => {
  const wrapper = mount(<Flex className='hello' p={2} />)
  const inner = findComponentNamed(wrapper, 'div')
  expect(inner.style.display).toEqual('flex')
})
