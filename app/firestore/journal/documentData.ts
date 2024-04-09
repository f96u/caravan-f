import { DocumentSnapshot, FieldValue, serverTimestamp, Timestamp } from '@firebase/firestore'

export type JournalOperation = 'registered' | 'removed' | 'offset'
export type ItemAmountComb = {
  item: string
  amount: number | null
}

export type DocumentData = {
  documentId: string
  date: Date
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
  documentId: '',
  date: new Date(),
  debit: [],
  credit: [],
  stamps: [],
  description: '',
  operation: 'registered',
  version: '24.4.1',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
}

const fallbackData: DocumentData = {
  documentId: '',
  date: new Date(),
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
    case '24.4.1':
      return <DocumentData>{ ...fallbackData, ...docData, date: docData.date.toDate(), documentId: docSnap.id }
    default:
      return fallbackData
  }
}
