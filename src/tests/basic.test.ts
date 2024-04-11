import { mount } from '@vue/test-utils'
import { test, expect, beforeEach, describe } from 'vitest'
import HelloWorld from '@/components/HelloWorld.vue'

// pinia
import { setActivePinia, createPinia } from 'pinia'
import { useWizardStore } from '@/store'

test('mount component', async () => {
  expect(HelloWorld).toBeTruthy()

  const wrapper = mount(HelloWorld, {
    props: {
      msg: 'Component test'
    }
  })

  expect(wrapper.text()).toContain('Component test')
})

describe('pinia test', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })
  test('test pinia next step', async () => {
    const store = useWizardStore()
    expect(store.step).toBe(1)
    store.nextStep()
    expect(store.step).toBe(2)
  })
  test('test pinia prev step', async () => {
    const store = useWizardStore()
    expect(store.step).toBe(1)
    store.nextStep()
    expect(store.step).toBe(2)
    store.prevStep()
    expect(store.step).toBe(1)
  })
})
