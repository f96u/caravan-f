import { DocumentSnapshot, FieldValue, serverTimestamp, Timestamp } from '@firebase/firestore'

export const cardIds = ['?', '0', '1', '2', '3', '5', '8', '13', '21', '34'] as const
export type CardId = typeof cardIds[number]

export type PlayerState = {
  nickname: string
  card: CardId | null
}
export type DocumentData = {
  players: {
    [key: string]: PlayerState,
  },
  createdAt: FieldValue
  updatedAt: FieldValue
  version: string
}

export const initPlayerState: PlayerState = {
  nickname: '',
  card: null
}

export const initDocumentData: DocumentData = {
  players: {},
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  version: '23.9.7'
}

const fallbackData: DocumentData = {
  players: {},
  createdAt: Timestamp.fromDate(new Date()),
  updatedAt: Timestamp.fromDate(new Date()),
  version: 'fallback'
}

export const shapingData = (docSnap: DocumentSnapshot): DocumentData => {
  const docData = docSnap.data()
  if (docData === undefined || docData.version !== '23.9.7') {
    return fallbackData
  } else {
    return <DocumentData>{ ...fallbackData, ...docData }
  }
}
