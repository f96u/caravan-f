import { DocumentData } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { Spinner } from '@/app/components/Spinner'

type Props = {
  players: DocumentData["players"] | undefined,
  isTurnOver: boolean
}

export const PlayersInfo = ({ players, isTurnOver }: Props) => {
  return (
    <div className="flex justify-center items-center m-1 border rounded-md border-gray-500 p-1 [&>:nth-child(n+2)]:ml-4">
      {players ? Object.keys(players).map(player => (
        <div key={player} className="flex flex-col items-center">
          <Card>{isTurnOver ? players[player].card : "?"}</Card>
          {`${players[player].nickname}[${player.slice(0, 4)}]`}
        </div>
      )) : <div className="h-20 flex items-center"><Spinner /></div>}
    </div>
  )
}