'use client'
import Card from '@/app/PlanningPoker/components/Card'
import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot, runTransaction, setDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { getAuth, onAuthStateChanged, signInAnonymously, User } from '@firebase/auth'
import { useAuth } from '@/app/PlanningPoker/hooks/useAuth'
import { useSelectCard } from '@/app/PlanningPoker/hooks/useSelectCard'

export default function PokerTable() {
  const { me, signIn } = useAuth()
  const { selectCardId, selected } = useSelectCard(me)

  return (
    <div className="[&>:nth-child(n+2)]:ml-4">
      <Card id="0" selected={selectCardId === "0"} onClick={selected}>0</Card>
      <Card id="1" selected={selectCardId === "1"} onClick={selected}>1</Card>
      <Card id="2" selected={selectCardId === "2"} onClick={selected}>2</Card>
      <Card id="3" selected={selectCardId === "3"} onClick={selected}>3</Card>
      <Card id="5" selected={selectCardId === "5"} onClick={selected}>5</Card>
      <button onClick={signIn}>匿名でアカウント認証実施</button>
      現在のログイン状態:{ me === null ? 'ログアウト中' : 'ログイン中'}
    </div>
  )
}