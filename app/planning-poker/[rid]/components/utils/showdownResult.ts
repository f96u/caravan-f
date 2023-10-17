import { CardId, cardIds, DocumentData } from '@/app/firestore/room/documentData'

const orgRound = (value: number, base: number) => {
  return Math.round(value * base) / base
}

const isCardId = (id: string): id is CardId => {
  return cardIds.some(cid => cid === id)
}

export const showdownResult = (players: DocumentData["players"]) => {
  // NOTE: 全員が選択してない状態で呼ばれた時はERRORを返却する
  if (Object.values(players).some(ps => !ps.card)) {
    return 'ERROR'
  }
  const cIds: CardId[] = Object.values(players)
    .map(ps => ps.card)
    .reduce((acc, cur) => {
      cur !== null && acc.push(cur)
      return acc
    }, [] as CardId[])

  const numCardIds = cIds.map(cid => Number(cid))
  // NOTE: 最初に数値計算できるかチェックする
  const isInvalid = !!numCardIds.filter(cid => isNaN(cid)).length
  if (isInvalid) {
    return '?'
  }

  // NOTE: 2つ以上離れていないかチェックする
  const len = cIds.length
  if (len > 1) {
    const minNum = Math.min(...numCardIds).toString()
    if (!isCardId(minNum)) {
      return 'ERROR'
    }
    const idx = cardIds.indexOf(minNum)
    if (idx === -1) {
      return 'ERROR'
    }
    const nextCardId = cardIds[idx + 1]
    const isConnected = cIds.some(cid => cid === nextCardId)
    if (!isConnected) {
      return 'X'
    }
  }

  const sum = cIds.reduce((acc, cur) => acc + Number(cur), 0)
  const average = sum / len
  return `${orgRound(average, 1)}`
}