import { useParams } from '@remix-run/react'

export default function Child() {
  const { someid } = useParams()
  return (
    <div>
      <h1>dynamic id {someid}</h1>
    </div>
  )
}
