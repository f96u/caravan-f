import PokerTable from '@/app/planning-poker/[rid]/components/PokerTable'

export default function PokerRoom({ params }: { params: { rid: string }}) {
  return (
    <PokerTable rid={params.rid} />
  )
}
