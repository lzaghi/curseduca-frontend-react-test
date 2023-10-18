export type TPost = {
  id: number,
  title: string,
  text: string,
  id_user: number,
  id_category: number,
  date: string
}

export type TCategory = {
  id: number,
  name: string
}

export type TUser = {
  id: number,
  email: string
}

export type TCredentials = {
  email: string,
  password: string
}

export type THeader = {
  headers: {
    authorization: string
  }
}

export type TpostBody = {
  title: string,
  text: string,
  id_user: number | undefined,
  id_category: number,
  date: string,
}

// date-time-picker types
export type TValuePiece = Date | null;
export type TValue = TValuePiece | [TValuePiece, TValuePiece];
