import { DocumentData } from '@/app/firestore/journal/documentData'
import { Trash } from '@/app/svg/Trash'
import { useJournal } from '@/app/components/RegisterForm/hooks/useJournal'
import { EditModal } from '@/app/components/RegisterForm/components/JournalTable/components/EditModal'
import { useState } from 'react'
import { PencilSquare } from '@/app/svg/PencilSquare'

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

type Props = {
  journalList: DocumentData[]
}
export const JournalTable = ({ journalList }: Props) => {
  const { remove } = useJournal()
  const [editJournal, setEditJournal] = useState<DocumentData | null>(null)

  return (
    <>
      <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="hidden grid-cols-12 gap-2 bg-white p-4 sm:grid">
                <div className="col-span-2 text-start text-xs font-medium uppercase text-gray-500">日付</div>
                <div className="col-span-2 text-start text-xs font-medium uppercase text-gray-500">借方</div>
                <div className="col-span-2 text-start text-xs font-medium uppercase text-gray-500">貸方</div>
                <div className="col-span-4 text-start text-xs font-medium uppercase text-gray-500">摘要</div>
                <div className="col-span-1 text-start text-xs font-medium uppercase text-gray-500">Stamp</div>
                <div className="col-span-1 text-end text-xs font-medium uppercase text-gray-500">Action</div>
              </div>
              <div className="divide-y divide-gray-200">
                {journalList.map((jData, idx) => (
                  <div
                    key={idx}
                    className="relative grid grid-cols-2 gap-2 p-4 odd:bg-white even:bg-gray-50 sm:grid-cols-12"
                  >
                    <div className="col-span-2 whitespace-nowrap text-sm font-medium text-gray-800 sm:col-span-2">
                      {formatDate(jData.date)}
                    </div>
                    <div className="col-span-1 whitespace-nowrap text-sm text-gray-800 sm:col-span-2">
                      {jData.debit.map((d, idx) => (
                        <div key={idx}>
                          <div>
                            {d.item}
                          </div>
                          <div>
                            {d.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-span-1 whitespace-nowrap text-sm text-gray-800 sm:col-span-2">
                      {jData.credit.map((c, idx) => (
                        <div key={idx}>
                          <div>
                            {c.item}
                          </div>
                          <div>
                            {c.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-span-2 overflow-hidden whitespace-nowrap text-sm text-gray-800 sm:col-span-4">
                      {jData.description}
                    </div>
                    <div className="col-span-2 w-1/2 whitespace-nowrap text-sm text-gray-800 sm:col-span-1">
                      {jData.stamps}
                    </div>
                    <div
                      className="absolute right-4 top-4 flex flex-col whitespace-nowrap rounded-lg text-end text-sm font-medium shadow-sm sm:static sm:col-span-1"
                    >
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-t-md border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => setEditJournal(jData)}
                      >
                        <PencilSquare />
                      </button>
                      <button
                        type="button"
                        className="-mt-px inline-flex justify-center rounded-b-md border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => remove(jData.documentId)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <EditModal
        open={!!editJournal}
        onSubmit={() => {
          setEditJournal(null)
          // TODO: データの更新処理
        }}
        onClose={() => setEditJournal(null)}
        editTarget={editJournal}
      />
    </>
  )
}