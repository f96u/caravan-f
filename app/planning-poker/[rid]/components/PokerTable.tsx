'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useMe } from '@/app/hooks/useMe'
import CardButton from '@/app/planning-poker/[rid]/components/CardButton'
import { useToast } from '@/app/context/ToastContext'
import { cardIds } from '@/app/firestore/room/documentData'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'

export const PokerTable = ({ rid }: { rid: string }) => {
  const { me } = useMe()
  const {
    players,
    entry,
    exit,
    myChoiceCard,
    selected,
    reset,
    setNickname,
    turnOver,
    isTurnOver
  } = usePlayers(me, rid)
  const router = useRouter()

  const { showToast } = useToast()

  useEffect(() => {
    entry()
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

  return (
    <>
      <BoardSurface players={players ?? {}} meUid={me?.uid ?? ''} isTurnOver={isTurnOver} onActionButton={isTurnOver ? reset : turnOver} setNickname={setNickname} />
      <div className="m-1 flex items-center justify-center rounded-md bg-indigo-100 p-1 [&>:nth-child(n+2)]:ml-4">
        {cardIds.map(cardId => (
          <CardButton key={cardId} id={cardId} selected={myChoiceCard === cardId} isLock={isTurnOver} onClick={selected}>{cardId}</CardButton>
        ))}
      </div>
    </>
  )
}
