import { ChatMessageFragment } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  chatMessages: Array.from({ length: 20 }, (_, index) => ({
    body: `Message with Fragment ${index + 7}`,
    createdAt: '2024-05-01T00:00:00.000Z',
    id: index + 1,
    user: {
      displayName: `User for Fragment ${(index % 5) + 7}`, // Cycle through 5 different users
      id: (index % 5) + 7,
    },
  })) satisfies ChatMessageFragment[],
})
