import { useEffect, useRef, useState } from 'react'

import type {
  ChatMessageInput,
  ChatMessagesQuery,
  ChatMessagesQueryVariables,
  SendChatMessageMutation,
  SendChatMessageMutationVariables,
} from 'types/graphql'

import { Form, InputField, Label, useForm } from '@redwoodjs/forms'
import {
  useMutation,
  type CellFailureProps,
  type CellSuccessProps,
  type TypedDocumentNode,
} from '@redwoodjs/web'
import { registerFragment } from '@redwoodjs/web/apollo'

export type ChatMessagesCellProps = Pick<ChatMessageInput, 'chatRoomId'>

registerFragment(gql`
  fragment ChatMessageFragment on ChatMessage {
    id
    body
    createdAt
    user {
      id
      displayName
    }
  }
`)

// UMCOMMENT THIS TO TEST FRAGMENT
export const QUERY: TypedDocumentNode<
  ChatMessagesQuery,
  ChatMessagesQueryVariables
> = gql`
  query ChatMessagesQuery($chatRoomId: String!) {
    chatMessages(chatRoomId: $chatRoomId) {
      ...ChatMessageFragment
    }
  }
`

export const SEND_CHAT_MESSAGE: TypedDocumentNode<
  SendChatMessageMutation,
  SendChatMessageMutationVariables
> = gql`
  mutation SendChatMessageMutation($input: ChatMessageInput!) {
    sendChatMessage(input: $input) {
      ...ChatMessageFragment
    }
  }
`

export const Loading = () => <div>Loading messages</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-danger">Error: {error?.message}</div>
)

export const Success = ({
  chatMessages,
  chatRoomId,
}: CellSuccessProps<ChatMessagesQuery> & ChatMessagesCellProps) => {
  const [messages, setMessages] = useState(chatMessages)
  // const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    if (messages.length < chatMessages.length) {
      setMessages(chatMessages)
    }
  }, [messages.length, chatMessages])

  const [sendChatMessage, { error }] = useMutation<
    SendChatMessageMutation,
    SendChatMessageMutationVariables
  >(SEND_CHAT_MESSAGE)

  const formMethods = useForm<{ body: string }>({
    mode: 'onTouched',
    defaultValues: {
      body: '',
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const onMessageSent = async (data: { body: string }) => {
    await sendChatMessage({
      variables: { input: { ...data, chatRoomId } },
      onCompleted: () => {
        formMethods.reset()
        inputRef.current?.focus()
      },
    })
  }

  // useSubscription<ChatMessagesSub, ChatMessagesSubVariables>(
  //   CHAT_MESSAGES_SUB,
  //   {
  //     variables: { input: { chatRoomId } },
  //     onData: ({ data: result }) => {
  //       setMessages((previous) => {
  //         if (!result.data) return previous
  //         if (previous.length >= 100) previous = previous.slice(1)
  //         return [...previous, result.data.newChatMessage]
  //       })
  //     },
  //   }
  // )

  return (
    <>
      REMOVED REALTIME FOR SIMPLER REPRO (F5 fragment) - with fragments
      {messages.length === 0 && (
        <div className="grid h-full place-content-center place-items-center gap-2">
          {`It's so empty here -- with fragments`}
        </div>
      )}
      <div className="flex flex-col-reverse overflow-auto p-3">
        <ul className="flex flex-col items-end gap-3">
          {chatMessages.map((item) => (
            <li
              key={item.id}
              className="animate-appearance-in text-small flex w-full flex-wrap gap-1"
            >
              <span className="inline-flex h-6">
                {item.user.displayName} fragment cell:
              </span>
              <span className="[word-break:break-word]">
                {item.body} -- fragment cell
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Form<{ body: string }>
        formMethods={formMethods}
        error={error}
        onSubmit={onMessageSent}
        className="w-full"
      >
        <Label name="body">
          <span className="sr-only">Message</span>
        </Label>
        <InputField
          name="body"
          placeholder="Type a message"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Enviar
        </button>
      </Form>
    </>
  )
}
function useAuth(): { currentUser: any } {
  throw new Error('Function not implemented.')
}
