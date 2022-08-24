import { Form, useActionData, useTransition } from '@remix-run/react'
import { Comment } from '~/api/comments'

type CommentListProps = {
  filmId: string
  comments: Comment[]
}
export default function CommentList({ filmId, comments }: CommentListProps) {
  const transition = useTransition()
  const actionData = useActionData()
  console.log('action data', actionData)

  const inputStyle = (inputField: string) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      actionData?.error[inputField] ? ' border-red-500' : ''
    }`

  return (
    <div>
      <h2 className='text-3xl mb-2'>comments</h2>

      <div className='flex flex-col space-y-4 my-3'>
        {comments.map(comment => (
          <div key={comment.id} className='p-4 rounded border border-slate-400'>
            <div className='text-gray-700 font-bold text-xl mb-2'>{comment.name}</div>
            <p>{comment.message}</p>
          </div>
        ))}

        <div className='p-4 rounded border border-slate-400'>
          <Form method='post' action={'/films/' + filmId}>
            <fieldset disabled={transition.state === 'submitting'}>
              <label className='inline-block my-2'>Name: </label>
              <input type='text' name='name' className={inputStyle('name')} />
              {actionData?.error.name && <p className='text-red-500'>{actionData.error.name}</p>}

              <label className='inline-block my-2'>message: </label>
              <input type='text' name='message' className={inputStyle('message')} />
              {actionData?.error.message && (
                <p className='text-red-500'>{actionData.error.message}</p>
              )}

              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
              >
                send
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  )
}
