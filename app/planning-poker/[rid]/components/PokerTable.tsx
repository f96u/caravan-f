'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useMe } from '@/app/hooks/useMe'
import CardButton from '@/app/planning-poker/[rid]/components/CardButton'
import { Button } from '@/app/components/Button'
import { useToast } from '@/app/context/ToastContext'
import { cardIds } from '@/app/firestore/room/documentData'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'

export const PokerTable = ({ rid }: { rid: string }) => {
  const { me } = useMe()
  const { players, entry, exit, myChoiceCard, selected, reset, setNickname, turnOver, isTurnOver } = usePlayers(me, rid)
  const router = useRouter()
  const [draftNickname, setDraftNickname] = useState('')
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

  const changeNickname = useCallback((event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    event && setDraftNickname(event.target.value)
  }, [])

  const submitNickname = useCallback(() => {
    setNickname(draftNickname)
      .then(() => {
        setDraftNickname('')
        showToast('ニックネームを変更しました', 'success')
      })
  }, [draftNickname, setNickname, showToast])

  return (
    <>
      <BoardSurface players={players ?? {}} isTurnOver={isTurnOver} onActionButton={isTurnOver ? reset : turnOver} />
      <div className="bg-indigo-100 m-1 rounded-md p-1 flex justify-center items-center [&>:nth-child(n+2)]:ml-4">
        {cardIds.map(cardId => (
          <CardButton key={cardId} id={cardId} selected={myChoiceCard === cardId} isLock={isTurnOver} onClick={selected}>{cardId}</CardButton>
        ))}
      </div>
      <div className="flex">
        <input
          id="nickname"
          name="nickname"
          placeholder="ニックネーム"
          value={draftNickname}
          onChange={changeNickname}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Button onClick={submitNickname}>変更</Button>
      </div>
    </>
  )
}
