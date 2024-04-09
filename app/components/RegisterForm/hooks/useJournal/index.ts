import { useCallback, useEffect, useState } from 'react'
import { useFirestore } from '@/app/hooks/useFirestore'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where
} from '@firebase/firestore'
import { DocumentData, shapingData } from '@/app/firestore/journal/documentData'
import { useToast } from '@/app/context/ToastContext'
import { app } from '@/app/lib/firebase/init'

const journalCollection = collection(getFirestore(app), 'householdAccounts/ZyIdVvUPMRXYcBdYJFjD/journal')

export const useJournal = () => {
  const { addDoc, getDocs, updateDoc } = useFirestore()
  const { showToast } = useToast()
  const [ journalList, setJournalList ] = useState<DocumentData[]>([])

  const reacquisition = useCallback(() => {
    getDocs(
      query(
        journalCollection,
        where('operation', '==', 'registered'),
        orderBy('createdAt', 'desc'),
        limit(10),
      )
    )
      .then(snap => {
        setJournalList(snap.docs.map(doc => shapingData(doc)))
      })
  }, [getDocs])

  useEffect(() => {
    reacquisition()
  }, [getDocs, reacquisition])

  const register = useCallback( async (entry: DocumentData) => {
    try {
      const docRef = await addDoc(journalCollection, entry)
      const snap = await getDoc(docRef)
      setJournalList(prev => [shapingData(snap), ...prev])
      showToast('登録しました', 'success')
    } catch (e) {
      console.error(e)
      showToast('登録できませんでした', 'error')
      return Promise.reject(e)
    }
  }, [addDoc, showToast])

  const remove = useCallback(async (documentId: string) => {
    const docRef = doc(getFirestore(app), `householdAccounts/ZyIdVvUPMRXYcBdYJFjD/journal/${documentId}`)
    const snap = await getDoc(docRef)
    if (!snap.exists()) {
      showToast('削除できませんでした', 'error')
      return
    }
    showToast('削除しました', 'success')
    return updateDoc(docRef, { operation: 'removed', updatedAt: serverTimestamp() })
  }, [showToast, updateDoc])

  const update = useCallback(async (documentId: string, entry: DocumentData) => {
    const docRef = doc(getFirestore(app), `householdAccounts/ZyIdVvUPMRXYcBdYJFjD/journal/${documentId}`)
    const snap = await getDoc(docRef)
    if (!snap.exists()) {
      showToast('更新できませんでした', 'error')
      return
    }

    await updateDoc(docRef, { ...entry, updatedAt: serverTimestamp() })
    showToast('更新しました', 'success')
  }, [showToast, updateDoc])

  return { register, journalList, reacquisition, remove, update }
}