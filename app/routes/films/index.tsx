import { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { Film, getFilms } from '~/api/films'

// export const meta: MetaFunction = () => ({
//   title: 'Nlinks ',
//   description: 'safasf desc'
// })

// export const links: LinksFunction = () => {
//   return [{ rel: 'stylesheet', href: 'styles' }]
// }

// server side
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const title = url.searchParams.get('title')
  return getFilms(title)
}

export default function Index() {
  const data = useLoaderData<Film[]>()

  return (
    <div className='p-16 font-sans'>
      <h1 className='text-5xl font-bold text-center'>films </h1>

      <Form reloadDocument method='get' className='py5'>
        <label>
          Search{' '}
          <input
            type='text'
            name='title'
            placeholder='title'
            className='border-2 rounded py-3 px-3'
          />
        </label>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'>
          search
        </button>{' '}
      </Form>

      <div>
        <div className='grid grid-cols-4 gap-4'>
          {data.map(film => {
            return (
              <Link
                key={film.id}
                to={film.id}
                className='hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer'
                prefetch='render'
              >
                <div>{film.title}</div>
                <img src={film.image} alt={film.title} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
