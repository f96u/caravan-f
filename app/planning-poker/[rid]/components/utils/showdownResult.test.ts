import { describe, expect, test } from '@jest/globals'
import { DocumentData } from '@/app/firestore/room/documentData'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'

describe('showdownResult', () => {
  test('全員が選択してない状態で呼ばれた場合に"ERROR"が返却される', () => {
    const players: DocumentData["players"] = { "1": { nickname: 'nickname', card: null }}
    expect(showdownResult(players)).toBe('ERROR')
  })

  test('cardIdが数値ではない場合に"?"が返却される', () => {
    const players: DocumentData["players"] = { "1": { nickname: 'nickname', card: '?' }}
    expect(showdownResult(players)).toBe('?')
  })

  describe('ポイントが2つ以上離れている場合に"X"が返却される', () => {
    test('2人のプレイヤーの場合', () => {
      const players: DocumentData["players"] = {
        "1": { nickname: 'nickname', card: '0' },
        "2": { nickname: 'nickname', card: '2' }
      }
      expect(showdownResult(players)).toBe('X')
    })

    test('3人のプレイヤーの場合', () => {
      const players: DocumentData["players"] = {
        "1": { nickname: 'nickname', card: '0' },
        "2": { nickname: 'nickname', card: '1' },
        "3": { nickname: 'nickname', card: '3' }
      }
      expect(showdownResult(players)).toBe('X')
    })
  })

  describe('正常に返却される', () => {
    test('1人の場合', () => {
      const players: DocumentData["players"] = { "1": { nickname: 'nickname', card: '1' }}
      expect(showdownResult(players)).toBe('1')
    })

    test('2人の場合', () => {
      const players: DocumentData["players"] = {
        "1": { nickname: 'nickname', card: '2' },
        "2": { nickname: 'nickname', card: '2' },
      }
      expect(showdownResult(players)).toBe('2')
    })

    test('3人の場合', () => {
      const players: DocumentData["players"] = {
        "1": { nickname: 'nickname', card: '1' },
        "2": { nickname: 'nickname', card: '2' },
        "3": { nickname: 'nickname', card: '3' },
      }
      expect(showdownResult(players)).toBe('2')
    })

    test('4人の場合', () => {
      const players: DocumentData["players"] = {
        "1": { nickname: 'nickname', card: '1' },
        "2": { nickname: 'nickname', card: '1' },
        "3": { nickname: 'nickname', card: '2' },
        "5": { nickname: 'nickname', card: '3' },
      }
      expect(showdownResult(players)).toBe('2')
    })
  })
})