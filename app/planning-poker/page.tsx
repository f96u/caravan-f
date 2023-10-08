import React from 'react'
import { Rooms } from '@/app/planning-poker/components/Rooms'

export default function PlanningPoker() {
  return (
    <main>
      <h1 className="text-2xl text-center my-10">プランニングポーカー</h1>
      <Rooms />
    </main>
  )
}