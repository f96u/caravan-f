import { DocumentData } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { Spinner } from '@/app/components/Spinner'

export const PlayersInfo = ({ players }: { players: DocumentData["players"] | undefined }) => {
  return (
    <div　className="flex justify-center items-center m-1 border rounded-md border-gray-500 p-1 [&>:nth-child(n+2)]:ml-4">
      {players ? Object.keys(players).map(player => (
        <div key={player} className="flex flex-col items-center">
          <Card>{players[player].card}</Card>
          {player.slice(0, 4)}
        </div>
      )) : <div className="h-20 flex items-center"><Spinner /></div>}
    </div>
  )
}