import { Metadata } from '@redwoodjs/web'
import Chat from 'src/components/Chat/Chat'

const ChatPage = () => {
  return (
    <>
      <Metadata title="Chat" description="Chat page" />

      <Chat />
    </>
  )
}

export default ChatPage
