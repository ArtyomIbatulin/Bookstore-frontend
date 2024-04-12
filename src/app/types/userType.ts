export enum RoleEnum {
  user,
  admin,
}

export type User = {
  id: string
  login: string
  password: string
  role: RoleEnum
  name?: string
  avatarUrl?: string
  // createdAt, updatedAt
  // date of birth, location
  // likes, comments, books
}
