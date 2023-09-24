import { DocumentSnapshot, FieldValue, serverTimestamp, Timestamp } from '@firebase/firestore'

export type DocumentData = {
  player: {
    [key: string]: {
      card: string
    },
  },
  createdAt: FieldValue
  updatedAt: FieldValue
  version: string
}

export const initDocumentData: DocumentData = {
  player: {},
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  version: '23.9.7'
}

const fallbackData: DocumentData = {
  player: {},
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
