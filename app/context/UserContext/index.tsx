'use client'
import { ReactNode, Reducer, useReducer, createContext, Dispatch } from 'react'
import { User } from '@firebase/auth'

type UserActions = {
  type: 'login'
  payload: {
    user: User
  }
} | {
  type: 'logout'
}

export const UserContext = createContext<User | undefined | null>(undefined)

export const UserDispatchContext = createContext({} as Dispatch<UserActions>)

const reducer: Reducer<User | null | undefined, UserActions> = (user: User | null | undefined, action: UserActions): User | null => {
  switch (action.type) {
    case 'login': {
      return action.payload.user
    }
    case 'logout' : {
      return null
    }
  }
}

type Props = {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(reducer, undefined)
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}
