import { Outlet } from '@remix-run/react'

export default function Index() {
  return (
    <div className='p-10'>
      <Outlet />
    </div>
  )
}
