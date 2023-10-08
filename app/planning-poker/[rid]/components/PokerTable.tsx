'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useMe } from '@/app/hooks/useMe'
import { PlayersInfo } from '@/app/planning-poker/[rid]/components/PlayersInfo'
import CardButton from '@/app/planning-poker/[rid]/components/CardButton'
import { Button } from '@/app/components/Button'
import { useToast } from '@/app/context/ToastContext'

export const PokerTable = ({ rid }: { rid: string }) => {
  const { me } = useMe()
  const { players, entry, exit, selectCardId, selected, reset } = usePlayers(me, rid)
  const router = useRouter()
  const [isTurnOver, setIsTurnOver] = useState(false)
  const [isEntered, setIsEntered] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    entry()
      .then(() => {
        setIsEntered(true)
      })
      .catch(error => {
        showToast('入室できませんでした', 'error')
        router.replace('/planning-poker')
        console.error(error)
      })
    return () => {
      (async () => await exit())()
    }
  }, [entry, exit, router, showToast])

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

  const showdown = useCallback(() => {
    setIsTurnOver(true)
  }, [])

  const resetPlayers = useCallback(() => {
    reset()
      .then(() => {
        setIsTurnOver(false)
      })
  }, [reset])

  return isEntered ? (
    <>
      <PlayersInfo players={players} isTurnOver={isTurnOver} />
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
      <Button onClick={showdown}>表示</Button><Button onClick={resetPlayers}>リセット</Button>
    </>
  ) : (
    <>入室中...</>
  )
}
