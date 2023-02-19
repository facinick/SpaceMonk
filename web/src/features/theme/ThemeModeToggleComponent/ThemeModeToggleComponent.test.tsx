import { render } from '@redwoodjs/testing/web'

import ThemeModeToggleComponent from './ThemeModeToggleComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeModeToggleComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeModeToggleComponent />)
    }).not.toThrow()
  })
})
