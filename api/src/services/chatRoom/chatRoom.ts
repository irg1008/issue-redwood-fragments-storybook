import { ChatMessage, QueryResolvers } from 'types/graphql'

const chatRooms = new Map<string, ChatMessage[]>()

export const sendChatMessage = ({ input }: { input: ChatMessage }) => {
  const newChatMessage: ChatMessage = {
    ...input,
    id: Math.floor(Math.random() * 1000000),
    createdAt: new Date().toISOString(),
    user: {
      id: 1,
      displayName: 'Example',
    },
  }

  const chatRoom = chatRooms.get(input.chatRoomId) || []
  chatRoom.push(newChatMessage)
  chatRooms.set(input.chatRoomId, chatRoom)

  return newChatMessage
}

export const chatMessages: QueryResolvers['chatMessages'] = ({
  chatRoomId,
}) => {
  return chatRooms.get(chatRoomId)?.slice(-100) || []
}
