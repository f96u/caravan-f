import { useCallback } from 'react'
import { useFirestore } from '@/app/hooks/useFirestore'
import { db } from '@/app/firebaseApp'
import { collection } from '@firebase/firestore'
import { DocumentData } from '@/app/firestore/journal/documentData'
import { useToast } from '@/app/context/ToastContext'

export const useJournal = () => {
  const { addDoc } = useFirestore()
  const { showToast } = useToast()

  const register = useCallback( async (entry: DocumentData) => {
    await addDoc(collection(db, 'householdAccounts/ZyIdVvUPMRXYcBdYJFjD/journal/'), entry)
    showToast('登録しました', 'success')
  }, [addDoc, showToast])

  return { register }
}