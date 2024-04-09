'use client'
import { ReactNode, Reducer, useReducer } from 'react'
import {
  RoomActions,
  RoomContext,
  RoomDispatchContext,
  RoomIdContext
} from '@/app/planning-poker/[rid]/contexts/RoomContext'
import { DocumentData } from '@/app/firestore/room/documentData'
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
  rid: string
  children: ReactNode
}

export const RoomProvider = ({ rid, children}: Props) => {
  const [room, dispatch] = useReducer(reducer, undefined)
  return (
    <RoomIdContext.Provider value={rid}>
      <RoomContext.Provider value={room}>
        <RoomDispatchContext.Provider value={dispatch}>
          {children}
        </RoomDispatchContext.Provider>
      </RoomContext.Provider>
    </RoomIdContext.Provider>
  )
}
