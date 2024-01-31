import { User } from '@firebase/auth'

export type UserActions = {
  type: 'login'
  payload: {
    user: User
  }
} | {
  type: 'logout'
}
