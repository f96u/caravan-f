import { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'

export const useRooms = () => {
  const [rooms, setRooms] = useState<string[]>([])

  const checkRooms = useCallback(() => {
    getDocs(collection(db, 'room'))
      .then(querySnapshot => {
        setRooms(querySnapshot.docs.map((doc) => doc.id))
      })
      .catch(error => {
        console.error('failed room collection: ', error)
      })
  }, [])

  return { rooms, checkRooms }
}
