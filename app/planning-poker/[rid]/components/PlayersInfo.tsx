import { DocumentData } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'

export const PlayersInfo = ({ players }: { players: DocumentData["players"] }) => {
  return (
    <div　className="m-1 border rounded-md border-gray-500 p-1">
      {Object.keys(players).map(player => (
        <div key={player} className="flex flex-col items-center">
          <Card>{players[player].card}</Card>
          {player.slice(0, 4)}
        </div>
      ))}
    </div>
  )
}