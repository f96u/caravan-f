import { User } from '@firebase/auth'

export type Me = {
  user: User
  nickname: string
}
