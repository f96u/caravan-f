import { useCallback } from 'react'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useRouter } from 'next/router'
import { useRooms } from '@/app/planning-poker/hooks/useRooms'
import Link from 'next/link'
import { MeContextProvider } from '@/app/planning-poker/context/MeContext'
import { getAuth, signInAnonymously } from '@firebase/auth'
import { useMe } from '@/app/planning-poker/hooks/useMe'

export default function PlanningPoker() {
  const { me, setMe } = useMe()
  const router = useRouter()
  const { rooms } = useRooms()

  const entryRoom = useCallback(async () => {
    const docRef = await addDoc(collection(db, 'room'), {
      selectCard: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: '23.9.7'
    })
    router.push({ pathname: '/PlanningPoker/[rid]', query: { rid: docRef.id }})
  }, [router])

  const signIn = useCallback(() => {
    signInAnonymously(getAuth())
      .then(credentials => {
        setMe(credentials.user)
      })
      .catch(error => {
        console.log(error.code, ': ', error.message)
      })
  }, [])

  return (
    <MeContextProvider>
      <button onClick={signIn}>匿名でアカウント認証実施</button>
      現在のログイン状態:{ me === null ? 'ログアウト中' : 'ログイン中'}
      <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={entryRoom}>入室</button>
      {rooms.map(rid => (
        <Link key={rid} href={`/PlanningPoker/${rid}`}>{rid}</Link>
      ))}
    </MeContextProvider>
  )
}