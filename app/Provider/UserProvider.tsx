'use client'
import { ReactNode, Reducer, useReducer } from 'react'
import { RoomContext, RoomDispatchContext, RoomIdContext } from '@/app/planning-poker/[rid]/contexts/RoomContext'
import { DocumentData } from '@/app/firestore/room/documentData'
import { RoomActions } from '@/app/planning-poker/[rid]/Actions/RoomActions'
import { serverTimestamp } from '@firebase/firestore'
import { User } from '@firebase/auth'
import { UserActions } from '@/app/Actions/UserActions'
import { UserContext, UserDispatchContext } from '@/app/context/UserContext'

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
