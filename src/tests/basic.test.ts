import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import HelloWorld from '@/components/HelloWorld.vue'

describe('basic ui tests', () => {
  test('mount component', async () => {
    expect(HelloWorld).toBeTruthy()

    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Component test'
      }
    })

    expect(wrapper.text()).toContain('Component test')
  })
})
