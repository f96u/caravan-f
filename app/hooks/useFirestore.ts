import {
  Transaction,
  Query,
  runTransaction as originRunTransaction,
  getDoc as originGetDoc,
  getDocs as originGetDocs,
  deleteDoc as originDeleteDoc,
  addDoc as originAddDoc,
  DocumentReference, CollectionReference, WithFieldValue
} from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useCallback, useMemo, useState } from 'react'

const BREAK_COUNT = 8
const LAP_TIME = 3000

/**
 * firestoreと通信する際にロジック上の考慮が足りてないため書き込みと読み込みがループすることがある。
 * このループが発生したことを検知して通信を止めるように安全処理を入れたhook
 */
export const useFirestore = () => {
  const [circuitBreak, setCircuitBreak] = useState(false)
  const [count, setCount] = useState(0)

  const canConnect = useCallback(() => {
    if (count > BREAK_COUNT) {
      console.error('Circuit breaker')
      setCircuitBreak(true)
      return false
    } else if (circuitBreak) {
      return false
    }
    setCount(prevState => prevState + 1)
    window.setTimeout(() => setCount(prevState => prevState - 1), LAP_TIME)
    return true
  }, [circuitBreak, count])

  const runTransaction = useCallback(((transaction: (transaction: Transaction) => Promise<unknown>) => {
    if (!canConnect()) {
      return Promise.reject()
    }

    return originRunTransaction(db, transaction)
  }), [canConnect])

  const getDoc = useCallback(<T,>(ref: DocumentReference<T>) => {
    return originGetDoc(ref)
  }, [])

  const getDocs = useCallback(<T,>(ref: Query<T>) => {
    if (!canConnect()) {
      return Promise.reject()
    }
    return originGetDocs(ref)
  }, [])

  const addDoc = useCallback(<T,>(ref: CollectionReference<T>, data: WithFieldValue<T>) => {
    if (!canConnect()) {
      return Promise.reject()
    }
    return originAddDoc(ref, data)
  }, [canConnect])

  const deleteDoc = useCallback((ref: DocumentReference<unknown>) => {
    if (!canConnect()) {
      return Promise.reject()
    }
    return originDeleteDoc(ref)
  }, [canConnect])

  return { runTransaction, getDoc, getDocs, addDoc, deleteDoc }
}