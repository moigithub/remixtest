import { Link, useActionData } from '@remix-run/react'
import { Film } from '~/api/films'

type FilmBannerProps = {
  film: Film
}
export default function Index({ film }: FilmBannerProps) {
  return (
    <div className='w-full h-96 overflow-hidden relative'>
      <div className='w-full h-full flex flex-col absolute justify-between items-start'>
        <Link to='/films' className='text-white p-5 text-2xl hover:underline'>
          Go back
        </Link>
        <div className='bg-slate-700/60 p-5'>
          <div className='text-6xl font-bold text-white'>{film.title}</div>
        </div>
        <img src={film.movie_banner} alt={film.title} />
      </div>
    </div>
  )
}
