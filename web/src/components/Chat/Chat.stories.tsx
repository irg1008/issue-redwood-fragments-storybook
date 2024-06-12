// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Chat from './Chat'

const meta: Meta<typeof Chat> = {
  component: Chat,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Chat>

export const Primary: Story = {}
