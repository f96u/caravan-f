'use client'

import { useSelectCard } from '@/app/planning-poker/[rid]/hooks/useSelectCard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { User } from '@firebase/auth'

export const PlayField = ({ rid }: { rid: string }) => {
  const [me, setMe] = useState<User | null>(null)
  const { selectCardId, selected } = useSelectCard(me, rid)
  const router = useRouter()

  useEffect(() => {
    const docRef = doc(db, 'room', rid)
    getDoc(docRef)
      .then(docSnap => {
        if (!docSnap.exists()) {
          // NOTE: 部屋は存在しないので退室
          router.replace('/planning-poker')
        }
      })
  }, [rid, router])

  return (
    <div className="[&>:nth-child(n+2)]:ml-4">
      {me === null ? 'ログアウト' : 'ログイン'}
      <Card id="0" selected={selectCardId === "0"} onClick={selected}>0</Card>
      <Card id="1" selected={selectCardId === "1"} onClick={selected}>1</Card>
      <Card id="2" selected={selectCardId === "2"} onClick={selected}>2</Card>
      <Card id="3" selected={selectCardId === "3"} onClick={selected}>3</Card>
      <Card id="5" selected={selectCardId === "5"} onClick={selected}>5</Card>
    </div>
  )
}