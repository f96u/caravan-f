import { useCallback } from 'react'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useRouter } from 'next/navigation'
import { initDocumentData } from '@/app/firestore/room/documentData'
import { useToast } from '@/app/context/ToastContext'

export const useRoom = () => {
  const router = useRouter()
  const { showToast, closeToast } = useToast()
  const createRoom = useCallback(async () => {
    // const docRef = await addDoc(collection(db, 'room'), initDocumentData)
    showToast('部屋を作成しました', 'success')
    // router.push(`/planning-poker/${docRef.id}`)
  }, [router, showToast])
  return { createRoom }
}
