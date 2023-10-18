type Post = {
  id: number,
  title: string,
  text: string,
  id_user: number,
  id_category: number,
  date: string
}

type Category = {
  id: number,
  name: string
}

type User = {
  id: number,
  email: string
}

type Credentials = {
  email: string,
  password: string
}

type Header = {
  headers: {
    authorization: string
  }
}

type postBody = {
  title: string,
  text: string,
  id_user: number | undefined,
  id_category: number,
  date: string,
}

// date-time-picker types
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];