import { useCallback, useState } from 'react'
import { collection, doc, getFirestore } from '@firebase/firestore'
import { useRouter } from 'next/navigation'
import { initDocumentData } from '@/app/firestore/room/documentData'
import { useToast } from '@/app/context/ToastContext'
import { useFirestore } from '@/app/hooks/useFirestore'
import { app } from '@/app/lib/firebase/init'

export const useRoom = () => {
  const { addDoc, deleteDoc, getDocs } = useFirestore()
  const [roomList, setRoomList] = useState<string[]>([])
  const router = useRouter()
  const { showToast } = useToast()

  const createRoom = useCallback(async () => {
    const docRef = await addDoc(collection(getFirestore(app), 'room'), initDocumentData)
    if (!docRef) {
      return
    }
    showToast('部屋を作成しました', 'success')
    router.push(`/planning-poker/${docRef.id}`)
  }, [addDoc, router, showToast])

  const deleteRoom = useCallback(async (rid: string) => {
    deleteDoc(doc(getFirestore(app), 'room', rid))
      .then(() => {
        setRoomList(roomList.filter(roomId => roomId !== rid))
        showToast('部屋を削除しました', 'success')
      })
      .catch((error) => {
        showToast('部屋を削除できません', 'error')
        console.log(error)
      })
  }, [deleteDoc, roomList, showToast])

  const checkRoom = useCallback(() => {
    getDocs(collection(getFirestore(app), 'room'))
      .then(querySnapshot => {
        setRoomList(querySnapshot.docs.map((doc) => doc.id))
      })
      .catch(error => {
        console.error('failed room collection: ', error)
      })
  }, [getDocs])

  return { roomList, checkRoom, createRoom, deleteRoom }
}
