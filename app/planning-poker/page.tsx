import React from 'react'
import { Rooms } from '@/app/planning-poker/components/Rooms'

export default function PlanningPoker() {
  return (
    <>
      <h1 className="my-10 text-center text-2xl">プランニングポーカー</h1>
      <Rooms />
    </>
  )
}