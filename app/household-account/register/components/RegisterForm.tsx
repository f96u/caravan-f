'use client'

import { Input } from '@/app/components/Input'
import { useState } from 'react'
import { DatePicker } from '@/app/household-account/components/DatePicker'
import { CalendarDate } from '@/app/household-account/components/DatePicker/types/CalendarDate'
import { DocumentData, initDocumentData, ItemAmountComb } from '@/app/firestore/journal/documentData'
import { Button } from '@/app/components/Button'
import { useJournal } from '@/app/household-account/hooks/useJournal'

type EditItemAmountComb = Omit<ItemAmountComb, 'amount'> & { amount: number | null }
const initEditItemAmountComp: EditItemAmountComb = {
  item: '',
  amount: null,
}

const currentDate = new Date()

export const RegisterForm = () => {
  const { register } = useJournal()
  const [calendarDate, setCalendarDate] = useState<CalendarDate>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate(),
  })
  const [description, setDescription] = useState('')
  const [debit, setDebit] = useState<EditItemAmountComb[]>([initEditItemAmountComp])
  const [credit, setCredit] = useState<EditItemAmountComb[]>([initEditItemAmountComp])

  const addComb = () => {
    setDebit(prevState => prevState.concat([initEditItemAmountComp]))
    setCredit(prevState => prevState.concat([initEditItemAmountComp]))
  }

  const validSubmit = () => {
    // NOTE: 全てのamountに数値が入っている
    if (debit.some(comb => comb.item !== '' && comb.amount === null)) {
      return false
    }
    // NOTE: 同じitem名が登録されていない
    const itemArray = debit.map(comb => comb.item).concat(credit.map(comb => comb.item))
    if (itemArray.length !== new Set(itemArray).size) {
      return false
    }
    // NOTE: debit, creditのamountが同値
    const sumDebit = debit.map(comb => comb.amount ?? 0).reduce((acc, cur) => acc + cur, 0)
    const sumCredit = credit.map(comb => comb.amount ?? 0).reduce((acc, cur) => acc + cur, 0)
    return sumDebit === sumCredit;
  }

  const submit = () => {
    const fixDebit: ItemAmountComb[] = debit.map(comb => ({
      item: comb.item,
      amount: comb.amount ?? 0
    }))

    const fixCredit: ItemAmountComb[] = credit.map(comb => ({
      item: comb.item,
      amount: comb.amount ?? 0
    }))
    const entry: DocumentData = {
      ...initDocumentData,
      date: new Date(calendarDate.year, calendarDate.month, calendarDate.date),
      debit: fixDebit,
      credit: fixCredit,
      description,
    }
    register(entry)
  }

  return (
    <div className="sm:flex">
      <DatePicker calendarDate={calendarDate} onChange={cDate => setCalendarDate(cDate)} />
      <div className="flex flex-1 flex-col gap-1">
        <Input placeholder="摘要" value={description} onChange={event => setDescription(event.target.value)} />
        <div className="flex flex-col gap-1">
          {Array.from({ length: debit.length }).map((_, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row">
              <div key={idx} className="flex grow">
                <Input
                  placeholder="借方"
                  value={debit[idx].item}
                  onChange={event =>
                    setDebit(prev =>
                      prev.map((prevComb, prevIdx) =>
                        prevIdx === idx ? { ...prevComb, item: event.target.value } : prevComb))}
                />
                <Input
                  className="max-w-32"
                  placeholder="金額"
                  value={debit[idx].amount ?? ''}
                  onChange={event =>
                    setDebit(prev =>
                      prev.map((prevComb, prevIdx) =>
                        prevIdx === idx ? { ...prevComb, amount: Number(event.target.value) } : prevComb))}
                  type="number"
                />
              </div>
              <div key={idx} className="flex grow">
                <Input
                  placeholder="貸方"
                  value={credit[idx].item}
                  onChange={event =>
                    setCredit(prev =>
                      prev.map((prevComb, prevIdx) =>
                        prevIdx === idx ? { ...prevComb, item: event.target.value } : prevComb))}
                />
                <Input
                  className="max-w-32"
                  placeholder="金額"
                  value={credit[idx].amount ?? ''}
                  onChange={event =>
                    setCredit(prev =>
                      prev.map((prevComb, prevIdx) =>
                        prevIdx === idx ? { ...prevComb, amount: Number(event.target.value) } : prevComb))}
                  type="number"
                />
              </div>
            </div>
          ))}
        </div>
        <Button onClick={addComb}>+</Button>
        <Button onClick={submit} disabled={!validSubmit()}>登録</Button>
      </div>
    </div>
  )
}