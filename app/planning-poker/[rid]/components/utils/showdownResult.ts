import { CardId, cardIds, DocumentData } from '@/app/firestore/room/documentData'

const orgRound = (value: number, base: number) => {
  return Math.round(value * base) / base
}

const isCardId = (id: string): id is CardId => {
  return cardIds.some(cid => cid === id)
}

const checkChained = (cIds: CardId[]): boolean => {
  if (cIds.length === 1) {
    return true
  }
  const numCardIds = cIds.map(cid => Number(cid))
  const minNum = Math.min(...numCardIds).toString()
  if (!isCardId(minNum)) {
    return false
  }
  const idx = cardIds.indexOf(minNum)
  if (idx === -1) {
    return false
  }
  if (cIds.length === 2) {
    if (cIds[0] === cIds[1]) {
      return true
    }
  }
  const nextCardId = cardIds[idx + 1]
  const isConnected = cIds.some(cid => cid === nextCardId)
  if (!isConnected) {
    return false
  }
  return checkChained(cIds.filter(cid => cid !== minNum))
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
  if (!checkChained(cIds)) {
    return 'X'
  }

  const sum = cIds.reduce((acc, cur) => acc + Number(cur), 0)
  const average = sum / cIds.length
  return `${orgRound(average, 1)}`
}