import { createContext, Dispatch } from 'react'
import { User } from '@firebase/auth'
import { UserActions } from '@/app/Actions/UserActions'

export const UserContext = createContext<User | undefined | null>(undefined)

export const UserDispatchContext = createContext({} as Dispatch<UserActions>)
