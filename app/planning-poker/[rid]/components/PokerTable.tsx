'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { useMe } from '@/app/hooks/useMe'

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
      <div className="[&>:nth-child(n+2)]:ml-4">
        {me === null ? 'ログアウト' : 'ログイン'}
        <Card id="0" selected={selectCardId === "0"} onClick={selected}>0</Card>
        <Card id="1" selected={selectCardId === "1"} onClick={selected}>1</Card>
        <Card id="2" selected={selectCardId === "2"} onClick={selected}>2</Card>
        <Card id="3" selected={selectCardId === "3"} onClick={selected}>3</Card>
        <Card id="5" selected={selectCardId === "5"} onClick={selected}>5</Card>
      </div>
      {Object.keys(players).map(player => (
        <div key={player}>player key {player} player card {players[player].card}</div>
      ))}
    </>
  )
}
