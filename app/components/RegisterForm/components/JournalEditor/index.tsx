import { assets, expenditure, liabilities, revenue } from '@/app/constant/accounts'
import { Select } from '@/app/components/RegisterForm/components/Select'
import { Input } from '@/app/components/Input'
import { Button } from '@/app/components/Button'
import { DatePicker } from '@/app/components/RegisterForm/components/DatePicker'
import { useEffect, useReducer, useState } from 'react'
import { DocumentData, initDocumentData, ItemAmountComb } from '@/app/firestore/journal/documentData'
import { CalendarDate } from '@/app/components/RegisterForm/types/CalendarDate'
import { useJournal } from '@/app/components/RegisterForm/hooks/useJournal'

export type JournalForm = {
  calendarDate: CalendarDate
  description: string
  debit: ItemAmountComb[]
  credit: ItemAmountComb[]
}

type Actions =
  { type: 'changeCalendarDate'; payload: { calendarDate: CalendarDate }}
  | { type: 'changeDescription'; payload: { description: string } }
  | { type: 'addComb' }
  | { type: 'reset' }
  | { type: 'changeDebitItem'; payload: { idx: number, item: string } }
  | { type: 'changeCreditItem'; payload: { idx: number, item: string } }
  | { type: 'changeDebitAmount'; payload: { idx: number, amount: number } }
  | { type: 'changeCreditAmount'; payload: { idx: number, amount: number } }
  | { type: 'set'; payload: { documentData: DocumentData } }

const validSubmit = (debit: ItemAmountComb[], credit: ItemAmountComb[]) => {
  // NOTE: 全てのamountに数値が入っている
  if (debit.some(comb => comb.item !== '' && comb.amount === null)) {
    return false
  }
  // NOTE: 同じitem名が登録されていない
  const itemArray = debit
    .map(comb => comb.item)
    .concat(credit.map(comb => comb.item))
  if (itemArray.length !== new Set(itemArray).size) {
    return false
  }
  // NOTE: debit, creditのamountが同値
  const sumDebit = debit
    .map(comb => comb.amount ?? 0)
    .reduce((acc, cur) => acc + cur, 0)
  const sumCredit = credit
    .map(comb => comb.amount ?? 0)
    .reduce((acc, cur) => acc + cur, 0)
  return sumDebit === sumCredit;
}
const currentDate = new Date()
const initEditItemAmountComp: ItemAmountComb = {
  item: '',
  amount: null,
}
const initJournalForm: JournalForm = {
  calendarDate: {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate(),
  },
  description: '',
  debit: [initEditItemAmountComp],
  credit: [initEditItemAmountComp],
}
const reducer = (state: JournalForm, action: Actions): JournalForm => {
  switch (action.type) {
    case 'changeCalendarDate':
      return {
        ...state,
        calendarDate: action.payload.calendarDate
      }
    case 'changeDescription':
      return {
        ...state,
        description: action.payload.description
      }
    case 'addComb':
      return {
        ...state,
        debit: state.debit.concat([initEditItemAmountComp]),
        credit: state.credit.concat([initEditItemAmountComp]),
      }
    case 'reset':
      return initJournalForm
    case 'changeDebitItem':
      return {
        ...state,
        debit: state.debit.map((comb, idx) => idx === action.payload.idx ? { ...comb, item: action.payload.item } : comb)
      }
    case 'changeCreditItem':
      return {
        ...state,
        credit: state.credit.map((comb, idx) => idx === action.payload.idx ? { ...comb, item: action.payload.item } : comb)
      }
    case 'changeDebitAmount':
      return {
        ...state,
        debit: state.debit.map((comb, idx) => idx === action.payload.idx ? { ...comb, amount: action.payload.amount } : comb)
      }
    case 'changeCreditAmount':
      return {
        ...state,
        credit: state.credit.map((comb, idx) => idx === action.payload.idx ? { ...comb, amount: action.payload.amount } : comb)
      }
      case 'set':
        return {
          ...state,
          calendarDate: {
            year: action.payload.documentData.date.getFullYear(),
            month: action.payload.documentData.date.getMonth(),
            date: action.payload.documentData.date.getDate(),
          },
          description: action.payload.documentData.description,
          debit: action.payload.documentData.debit,
          credit: action.payload.documentData.credit,
        }
    default:
      return state
  }
}

type Props = {
  onSubmit: () => void
  editTargetDocumentData?: DocumentData | null
}

export const JournalEditor = ({ onSubmit, editTargetDocumentData }: Props) => {
  const { register: registerFirestore, update: updateFirestore } = useJournal()
  const [registering, setRegistering] = useState(false)
  const [state, dispatch] = useReducer(reducer, initJournalForm)

  useEffect(() => {
    if (!editTargetDocumentData) {
      return
    }
    dispatch({ type: 'set', payload: { documentData: editTargetDocumentData }}) 
  }, [editTargetDocumentData])

  const register = async () => {
    const {calendarDate, description, debit, credit} = state
    const entry: DocumentData = {
      ...initDocumentData,
      date: new Date(calendarDate.year, calendarDate.month, calendarDate.date),
      debit: debit.map(comb => ({
        item: comb.item,
        amount: comb.amount
      })),
      credit: credit.map(comb => ({
        item: comb.item,
        amount: comb.amount
      })),
      description,
    }
    setRegistering(true)
    // NOTE: editTargetDocumentDataがある場合は更新処理
    if (editTargetDocumentData) {
      entry['createdAt'] = editTargetDocumentData.createdAt
      await updateFirestore(editTargetDocumentData.documentId, entry)
    } else {
      await registerFirestore(entry)
      dispatch({type: 'reset'})
    }
    onSubmit()
    setRegistering(false)
  }

  return (
    <>
      <DatePicker
        className="mb-4 sm:mb-0 sm:mr-4"
        calendarDate={state.calendarDate}
        onChange={cDate => dispatch({ type: 'changeCalendarDate', payload: { calendarDate: cDate }})}
      />
      <div className="flex flex-1 flex-col gap-1">
        <Input
          placeholder="摘要"
          value={state.description}
          onChange={value => dispatch({ type: 'changeDescription', payload: { description: value }})}
        />
        <div className="flex flex-col gap-2">
          {Array.from({ length: state.debit.length }).map((_, idx) => (
            <div key={idx} className="flex flex-col gap-1 lg:flex-row">
              <div className="flex grow gap-1">
                <Select
                  label="借方"
                  onChange={event => dispatch({ type: 'changeDebitItem', payload: { idx, item: event.target.value }})}
                  value={state.debit[idx].item}
                >
                  <option>{''}</option>
                  <optgroup label="資産">
                    {assets.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                  <optgroup label="負債">
                    {liabilities.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                  <optgroup label="収入">
                    {revenue.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                  <optgroup label="支出">
                    {expenditure.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                </Select>
                <Input
                  className="max-w-32"
                  placeholder="金額"
                  variant="amount"
                  value={state.debit[idx].amount === null ? '' : `${state.debit[idx].amount}`}
                  onChange={value => dispatch({ type: 'changeDebitAmount', payload: { idx, amount: Number(value) }})}
                />
              </div>
              <div className="flex grow gap-1">
                <Select
                  label="貸方"
                  onChange={event => dispatch({ type: 'changeCreditItem', payload: { idx, item: event.target.value }})}
                  value={state.credit[idx].item}
                >
                  <option>{''}</option>
                  <optgroup label="資産">
                    {assets.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                  <optgroup label="負債">
                    {liabilities.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                  <optgroup label="収入">
                    {revenue.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                  <optgroup label="支出">
                    {expenditure.map(a => <option key={a}>{a}</option>)}
                  </optgroup>
                </Select>
                <Input
                  className="max-w-32"
                  placeholder="金額"
                  variant="amount"
                  value={state.credit[idx].amount === null ? '' : `${state.credit[idx].amount}`}
                  onChange={value => dispatch({ type: 'changeCreditAmount', payload: { idx, amount: Number(value) }})}
                />
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => dispatch({ type: 'addComb' })}>+</Button>
        <Button onClick={register} disabled={!validSubmit(state.debit, state.credit) || registering}>登録</Button>
      </div>
    </>
  )
}