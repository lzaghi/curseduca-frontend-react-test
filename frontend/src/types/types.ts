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

// date-time-picker types
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];