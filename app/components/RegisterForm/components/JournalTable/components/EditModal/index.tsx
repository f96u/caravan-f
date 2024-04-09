import { JournalEditor } from '@/app/components/RegisterForm/components/JournalEditor'
import { Dialog } from '@/app/components/Dialog'
import { DocumentData } from '@/app/firestore/journal/documentData'
import { useEffect, useState } from 'react'

type Props = {
  open : boolean
  onSubmit: () => void
  onClose: () => void
  editTarget: DocumentData | null
}

export const EditModal = ({ open, onSubmit, onClose, editTarget }: Props) => {
  // NOTE: モーダルのクローズアニメーション時に表示がリセットされないように、ここで編集対象のデータを一時的に保持する
  const [tmpEditTarget, setTmpEditTarget] = useState<DocumentData | null>(null)

  useEffect(() => {
    if (editTarget) {
      setTmpEditTarget(editTarget)
    }
  }, [editTarget])

  return (
    <Dialog onClose={onClose} open={open}>
      <JournalEditor onSubmit={() => {
        onClose()
        onSubmit()
      }} editTargetDocumentData={tmpEditTarget} />
    </Dialog>
  )
}