import {
  Transaction,
  Query,
  runTransaction as originRunTransaction,
  getDoc as originGetDoc,
  getDocs as originGetDocs,
  deleteDoc as originDeleteDoc,
  addDoc as originAddDoc,
  updateDoc as originUpdateDoc,
  DocumentReference,
  CollectionReference,
  WithFieldValue,
  getFirestore,
  UpdateData,
  DocumentData
} from '@firebase/firestore'
import { useCallback, useRef, useState } from 'react'
import { app } from '@/app/lib/firebase/init'

const BREAK_COUNT = 8
const LAP_TIME = 3000

/**
 * firestoreと通信する際にロジック上の考慮が足りてないため書き込みと読み込みがループすることがある。
 * このループが発生したことを検知して通信を止めるように安全処理を入れたhook
 */
export const useFirestore = () => {
  const [circuitBreak, setCircuitBreak] = useState(false)
  const countRef = useRef(0)

  const canConnect = useCallback(() => {
    if (countRef.current > BREAK_COUNT) {
      console.error('Circuit breaker')
      setCircuitBreak(true)
      return false
    } else if (circuitBreak) {
      return false
    }
    countRef.current = countRef.current + 1
    window.setTimeout(() => countRef.current = countRef.current - 1, LAP_TIME)
    return true
  }, [circuitBreak])

  const runTransaction = useCallback(((transaction: (transaction: Transaction) => Promise<unknown>) => {
    if (!canConnect()) {
      return Promise.reject()
    }

    return originRunTransaction(getFirestore(app), transaction)
  }), [canConnect])

  const getDoc = useCallback(<T,>(ref: DocumentReference<T>) => {
    return originGetDoc(ref)
  }, [])

  const getDocs = useCallback(<T,>(ref: Query<T>) => {
    if (!canConnect()) {
      return Promise.reject()
    }
    return originGetDocs(ref)
  }, [canConnect])

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

  const updateDoc = useCallback(<T extends DocumentData>(ref: DocumentReference<T, T>, data: UpdateData<T>) => {
    if (!canConnect()) {
      return Promise.reject()
    }
    return originUpdateDoc(ref, data)
  }, [canConnect])

  return { runTransaction, getDoc, getDocs, addDoc, deleteDoc, updateDoc }
}