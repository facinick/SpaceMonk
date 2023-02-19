import { render } from '@redwoodjs/testing/web'

import ImageLoaderAndViewer from './ImageLoaderAndViewer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImageLoaderAndViewer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImageLoaderAndViewer />)
    }).not.toThrow()
  })
})
