import { DocumentData } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'

export const PlayersInfo = ({ players }: { players: DocumentData["players"] }) => {
  return (
    <div>
      {Object.keys(players).map(player => (
        <>
          <Card>{players[player].card}</Card>
          {player}
        </>
      ))}
    </div>
  )
}