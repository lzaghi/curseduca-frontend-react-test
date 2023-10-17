type Post = {
  id: number,
  title: string,
  text: string,
  id_user: number,
  id_category: number
}

type Category = {
  id: number,
  name: string
}

type User = {
  id: number,
  email: string
}