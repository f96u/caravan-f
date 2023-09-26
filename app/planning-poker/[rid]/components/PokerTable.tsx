'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { useMe } from '@/app/hooks/useMe'
import { PlayersInfo } from '@/app/planning-poker/[rid]/components/PlayersInfo'
import CardButton from '@/app/planning-poker/[rid]/components/CardButton'

export const PokerTable = ({ rid }: { rid: string }) => {
  const { me } = useMe()
  const { players, entry, exit, selectCardId, selected } = usePlayers(me, rid)
  const router = useRouter()

  useEffect(() => {
    entry()
      .then(() => {
        // TODO: 部屋に参加しています。の表示を取り除いてカード選択できる表示にする
      })
      .catch(error => {
        // TODO: 部屋への参加ができなかった旨を伝えた上で、トップに戻る
      })
    return () => {
      (async () => await exit())()
    }
  }, [entry, exit])

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
    <>
      <PlayersInfo players={players} />
      <div className="m-1 border border-gray-500 p-1 flex justify-center items-center [&>:nth-child(n+2)]:ml-4">
          <CardButton id="0" selected={selectCardId === "0"} onClick={selected}>0</CardButton>
          <CardButton id="1" selected={selectCardId === "1"} onClick={selected}>1</CardButton>
          <CardButton id="2" selected={selectCardId === "2"} onClick={selected}>2</CardButton>
          <CardButton id="3" selected={selectCardId === "3"} onClick={selected}>3</CardButton>
          <CardButton id="5" selected={selectCardId === "5"} onClick={selected}>5</CardButton>
          <CardButton id="8" selected={selectCardId === "8"} onClick={selected}>8</CardButton>
          <CardButton id="13" selected={selectCardId === "13"} onClick={selected}>13</CardButton>
          <CardButton id="21" selected={selectCardId === "21"} onClick={selected}>21</CardButton>
      </div>
    </>
  )
}
