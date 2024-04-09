'use client'

import { useJournal } from '@/app/components/RegisterForm/hooks/useJournal'
import { JournalTable } from '@/app/components/RegisterForm/components/JournalTable'
import { JournalEditor } from '@/app/components/RegisterForm/components/JournalEditor'


export const RegisterForm = () => {
  const { journalList, reacquisition } = useJournal()

  return (
    <>
      <div className="mb-4 sm:flex">
        <JournalEditor onSubmit={() => reacquisition()} />
      </div>
      <JournalTable journalList={journalList}/>
    </>
  )
}