import { PlayField } from '@/app/planning-poker/[rid]/components/PlayField'

export default function PokerRoom({ params }: { params: { rid: string }}) {
  return (
    <PlayField rid={params.rid} />
  )
}
