import { DocumentSnapshot, FieldValue, serverTimestamp, Timestamp } from '@firebase/firestore'

export type JournalOperation = 'registered' | 'deleted' | 'offset'
export type ItemAmountComb = {
  item: string
  amount: number
}

export type DocumentData = {
  date: number
  debit: ItemAmountComb[]
  credit: ItemAmountComb[]
  stamps: string[]
  description: string
  operation: JournalOperation
  version: string
  createdAt: FieldValue
  updatedAt: FieldValue
}

export const initItemAmountComb: ItemAmountComb = {
  item: '',
  amount: 0
}

export const initDocumentData: DocumentData = {
  date: new Date().getTime(),
  debit: [],
  credit: [],
  stamps: [],
  description: '',
  operation: 'registered',
  version: '23.2.1',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
}

const fallbackData: DocumentData = {
  date: new Date().getTime(),
  debit: [],
  credit: [],
  stamps: [],
  description: '',
  operation: 'registered',
  createdAt: Timestamp.fromDate(new Date()),
  updatedAt: Timestamp.fromDate(new Date()),
  version: 'fallback'
}

export const shapingData = (docSnap: DocumentSnapshot): DocumentData => {
  const docData = docSnap.data()
  switch(docData?.version) {
    case '23.2.1':
      return <DocumentData>{ ...fallbackData, ...docData }
    default:
      return fallbackData
  }
}
