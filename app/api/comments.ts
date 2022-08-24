export type Comment = {
  id?: string
  name: string
  message: string
  filmId: string
}
export async function getComments(filmId: string) {
  const response = await fetch('http://localhost:3001/comments?filmId=' + filmId)
  return response.json()
}

export async function addComment(comment: Comment) {
  const response = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'content-type': 'application/json'
    }
  })

  return response.json()
}
