export enum RoleEnum {
  user,
  admin,
}

export type User = {
  id: string
  login: string
  password: string
  role: RoleEnum
  // createdAt, updatedAt
  // name, avatar, date of birth, location
}
