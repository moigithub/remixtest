import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  ActionFunction,
  redirect
} from '@remix-run/node'
import { Form, Link, Outlet, useActionData, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { addComment } from '~/api/comments'
import { Film, getFilmById, getFilms } from '~/api/films'
import CharacterList from '~/components/characterList'
import CommentList from '~/components/commentList'
import FilmBanner from '~/components/filmBanner'
import Character from './$filmId/characters.$characterId'

// server side
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, 'id missing')
  console.log('f', params)
  const film: Film = await getFilmById(params.filmId)
  return film
}

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.filmId, 'err filmid missing')
  const body = await request.formData()

  const comment = {
    name: body.get('name'),
    message: body.get('message'),
    filmId: params.filmId
  }

  const error = { name: '', message: '' }
  if (!comment.name) {
    error.name = 'name'
  }
  if (!comment.message) {
    error.message = 'message'
  }
  const values = Object.fromEntries(body)
  console.log('valu err', values, error, body)
  if (error.name || error.message) {
    return { error, values }
  }
  await addComment(comment)

  return redirect('/films/' + params.filmId)
}

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title || '',
  description: data?.description || ''
})

export default function Index() {
  const film = useLoaderData<Film>()

  return (
    <div>
      <FilmBanner film={film}></FilmBanner>
      <div className='p-18'>
        <p>{film.description}</p>
      </div>

      <div className='flex py-4 space-x-5'>
        <CharacterList characters={film.characters}></CharacterList>

        <div className='flex-1'>
          <Outlet></Outlet>

          <CommentList filmId={film.id} comments={film.comments || []}></CommentList>
        </div>
      </div>
    </div>
  )
}
