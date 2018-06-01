import { hello } from './hello'

test('green test', () => {
    expect(hello()).toBe('hello!')
})
// test('red test', () => {
//     expect(hello()).toEqual('oops')
// })