import { useCallback, useMemo } from 'react'
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useRouter } from 'next/navigation'
import { initDocumentData } from '@/app/firestore/room/documentData'
import { useToast } from '@/app/context/ToastContext'

export const useRoom = () => {
  const router = useRouter()
  const { showToast } = useToast()

  const createRoom = useCallback(async () => {
    const docRef = await addDoc(collection(db, 'room'), initDocumentData)
    showToast('部屋を作成しました', 'success')
    router.push(`/planning-poker/${docRef.id}`)
  }, [router, showToast])

  const deleteRoom = useCallback(async (id: string) => {
    deleteDoc(doc(db, 'room', id))
      .then(() => {
        showToast('部屋を削除しました', 'success')
      })
      .catch((error) => {
        showToast('部屋を削除できません', 'error')
        console.log(error)
      })
  }, [showToast])

  return { createRoom, deleteRoom }
}
