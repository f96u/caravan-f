import { useCallback } from 'react'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useRouter } from 'next/navigation'

export const useRoom = () => {
  const router = useRouter()
  const createRoom = useCallback(async () => {
    const docRef = await addDoc(collection(db, 'room'), {
      selectCard: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: '23.9.7'
    })
    router.push(`/planning-poker/${docRef.id}`)
  }, [router])
  return { createRoom }
}
