'use client'
import { ReactNode, Reducer, useReducer } from 'react'
import { RoomContext, RoomDispatchContext } from '@/app/planning-poker/[rid]/components/contexts/RoomContext'
import { DocumentData } from '@/app/firestore/room/documentData'
import { RoomActions } from '@/app/planning-poker/[rid]/components/Actions/RoomActions'
import { serverTimestamp } from '@firebase/firestore'

const reducer: Reducer<DocumentData | undefined, RoomActions> = (room: DocumentData | undefined, action: RoomActions): DocumentData => {
  switch (action.type) {
    case 'set': {
      return action.payload.room
    }
    case 'updatePlayers' : {
      if (room === undefined) {
        throw 'Not found room information.'
      }
      return { ...room, players: action.payload.players, updatedAt: serverTimestamp() }
    }
    case 'showdown': {
      if (room === undefined) {
        throw 'Not found room information.'
      }
      return { ...room, isReveal: true, updatedAt: serverTimestamp() }
    }
    case 'reset': {
      if (room === undefined) {
        throw 'Not found room information.'
      }
      return { ...room, players: action.payload.players, isReveal: false, updatedAt: serverTimestamp() }
    }
  }
}

type Props = {
  children: ReactNode
}

export const RoomProvider = ({ children}: Props) => {
  const [room, dispatch] = useReducer(reducer, undefined)
  return (
    <RoomContext.Provider value={room}>
      <RoomDispatchContext.Provider value={dispatch}>
        {children}
      </RoomDispatchContext.Provider>
    </RoomContext.Provider>
  )
}