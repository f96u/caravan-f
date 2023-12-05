import { useCallback, useState } from 'react'
import { collection, doc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useRouter } from 'next/navigation'
import { initDocumentData } from '@/app/firestore/room/documentData'
import { useToast } from '@/app/context/ToastContext'
import { useFirestore } from '@/app/hooks/useFirestore'

export const useRoom = () => {
  const { addDoc, deleteDoc, getDocs } = useFirestore()
  const [roomList, setRoomList] = useState<string[]>([])
  const router = useRouter()
  const { showToast } = useToast()

  const createRoom = useCallback(async () => {
    const docRef = await addDoc(collection(db, 'room'), initDocumentData)
    if (!docRef) {
      return
    }
    showToast('部屋を作成しました', 'success')
    router.push(`/planning-poker/${docRef.id}`)
  }, [addDoc, router, showToast])

  const deleteRoom = useCallback(async (rid: string) => {
    deleteDoc(doc(db, 'room', rid))
      .then(() => {
        setRoomList(roomList.filter(roomId => roomId !== rid))
        showToast('部屋を削除しました', 'success')
      })
      .catch((error) => {
        showToast('部屋を削除できません', 'error')
        console.log(error)
      })
  }, [roomList, showToast])

  const checkRoom = useCallback(() => {
    getDocs(collection(db, 'room'))
      .then(querySnapshot => {
        setRoomList(querySnapshot.docs.map((doc) => doc.id))
      })
      .catch(error => {
        console.error('failed room collection: ', error)
      })
  }, [])

  return { roomList, checkRoom, createRoom, deleteRoom }
}
