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
      <PlayersInfo players={players} isTurnOver={isTurnOver} />
      <div className="m-1 border border-gray-500 p-1 flex justify-center items-center [&>:nth-child(n+2)]:ml-4">
          <CardButton id="0" selected={myChoiceCard === "0"} onClick={selected}>0</CardButton>
          <CardButton id="1" selected={myChoiceCard === "1"} onClick={selected}>1</CardButton>
          <CardButton id="2" selected={myChoiceCard === "2"} onClick={selected}>2</CardButton>
          <CardButton id="3" selected={myChoiceCard === "3"} onClick={selected}>3</CardButton>
          <CardButton id="5" selected={myChoiceCard === "5"} onClick={selected}>5</CardButton>
          <CardButton id="8" selected={myChoiceCard === "8"} onClick={selected}>8</CardButton>
          <CardButton id="13" selected={myChoiceCard === "13"} onClick={selected}>13</CardButton>
          <CardButton id="21" selected={myChoiceCard === "21"} onClick={selected}>21</CardButton>
      </div>
      <Button onClick={isTurnOver ? reset : turnOver}>{isTurnOver ? 'リセット' : '表示'}</Button>
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
