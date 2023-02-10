import type { ComponentStory } from '@storybook/react'

import { Loading, Empty, Failure, Success } from './PostCell'
import { singlePost, singlePostBig, singlePostBigNoGap } from './PostCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : <></>
}

export const empty = () => {
  return Empty ? <Empty /> : <></>
}

export const failure: ComponentStory<typeof Failure> = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
}

export const successSimple: ComponentStory<typeof Success> = (args) => {
  return Success ? <Success post = {singlePost} {...args} /> : <></>
}

export const successBigSentence: ComponentStory<typeof Success> = (args) => {
  return Success ? <Success post = {singlePostBig} {...args} /> : <></>
}

export const successBigWord: ComponentStory<typeof Success> = (args) => {
  return Success ? <Success post = {singlePostBigNoGap} {...args} /> : <></>
}

export default { title: 'Cells/PostCell' }
