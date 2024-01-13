import { DocumentData } from '@/app/firestore/room/documentData'

export type RoomActions = {
  type: 'set'
  payload: {
    room: DocumentData
  }
} | {
  type: 'updatePlayers'
  payload: {
    players: DocumentData['players']
  }
} | {
  type: 'showdown'
} | {
  type: 'reset'
  payload: {
    players: DocumentData['players']
  }
}
