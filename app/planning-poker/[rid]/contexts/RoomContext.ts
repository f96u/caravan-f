import { createContext, Dispatch } from 'react'
import { DocumentData } from '@/app/firestore/room/documentData'
import { RoomActions } from '@/app/planning-poker/[rid]/Actions/RoomActions'

export const RoomContext = createContext<DocumentData | undefined>(undefined)
export const RoomDispatchContext = createContext({} as Dispatch<RoomActions>)
