import { LoaderFunction } from '@remix-run/node'
import { useActionData, useCatch, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { FilmCharacter, getFilmCharacter } from '~/api/films'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, 'id missing')
  const film: FilmCharacter = await getFilmCharacter(params.characterId)
  return film
}

export default function Character() {
  const char = useLoaderData<FilmCharacter>()
  console.log('char', char)

  return (
    <div className='mb-3'>
      <div className='text-3xl mb-2'>Character detail</div>
      <div className='p-4 rounded shadow-lg border'>
        <div className='text-gray-700 font-bold text-xl mb-2'>{char.name}</div>
        <ul className='py-2'>
          <li>Gender: {char.gender}</li>
          <li>Age; {char.age}</li>
          <li>Eye color: {char.eye_color}</li>
          <li>Hair color: {char.hair_color}</li>
        </ul>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return (
      <div className='mb-3'>
        <div className='text-3xl mb-2'>Character detail</div>
        <div className='p-4 rounded shadow-lg border bg-rose-200 border-rose-600'>
          <div className='text-gray-700 font-bold text-xl mb-2'>{caught.statusText}</div>
        </div>
        <p>{caught?.status}</p>
      </div>
    )
  }

  throw new Error('unknow error')
}

export function ErrorBoundary({ error }: any) {
  console.log('erro', error)
  return (
    <div className='mb-3'>
      <div className='text-3xl mb-2'>Character detail</div>
      <div className='p-4 rounded shadow-lg border bg-rose-200 border-rose-600'>
        <div className='text-gray-700 font-bold text-xl mb-2'>error something went wrong</div>
      </div>
      <p>{error?.message}</p>
    </div>
  )
}
