// import { test, expect, beforeEach, describe } from 'vitest'

// // pinia
// import { setActivePinia, createPinia } from 'pinia'
// import { useWizardStore } from '@/stores/wizard-store'

// describe('pinia test', () => {
//   beforeEach(() => {
//     // creates a fresh pinia and makes it active
//     // so it's automatically picked up by any useStore() call
//     // without having to pass it to it: `useStore(pinia)`
//     setActivePinia(createPinia())
//   })
//   test('test pinia next step', async () => {
//     const store = useWizardStore()
//     expect(store.step).toBe(1)
//     store.nextStep()
//     expect(store.step).toBe(2)
//   })
//   test('test pinia prev step', async () => {
//     const store = useWizardStore()
//     expect(store.step).toBe(1)
//     store.nextStep()
//     expect(store.step).toBe(2)
//     store.prevStep()
//     expect(store.step).toBe(1)
//   })
// })
