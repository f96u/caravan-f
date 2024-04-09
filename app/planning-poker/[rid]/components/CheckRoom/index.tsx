'use client'
import { useEffect, useRef } from 'react'
import { doc, getFirestore } from '@firebase/firestore'
import { useFirestore } from '@/app/hooks/useFirestore'
import { useRouter } from 'next/navigation'
import { app } from '@/app/lib/firebase/init'

type Props = {
  rid: string
}

/**
 * 部屋の存在チェックをする
 *
 * 部屋が存在しない場合は`/planning-poker`ページへ強制リプレイス
 * @param rid
 * @constructor
 */
export const CheckRoom: React.FC<Props> = ({ rid }) => {
  const { getDoc } = useFirestore()
  const router = useRouter()
  const initRef = useRef(false)

  useEffect(() => {
    // NOTE: 初期化
    if (initRef.current) {
      return
    }
    //NOTE: 部屋の存在チェック
    const docRef = doc(getFirestore(app), 'room', rid)
    getDoc(docRef)
      .then(docSnap => {
        if (!docSnap.exists()) {
          // NOTE: 部屋は存在しないので退室
          router.replace('/planning-poker')
        }
      })
      .finally(() => {
        initRef.current = true
      })
  }, [getDoc, rid, router])

  return null
}