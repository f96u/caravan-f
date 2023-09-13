import { useCallback } from 'react'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useRouter } from 'next/navigation'
import { initDocumentData } from '@/app/firestore/room/documentData'

export const useRoom = () => {
  const router = useRouter()
  const createRoom = useCallback(async () => {
    const docRef = await addDoc(collection(db, 'room'), initDocumentData)
    router.push(`/planning-poker/${docRef.id}`)
  }, [router])
  return { createRoom }
}
