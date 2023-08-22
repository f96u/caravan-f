import Card from '@/app/PlanningPoker/components/Card'

export default function PlanningPoker() {
  return (
    <div className="[&>:nth-child(n+2)]:ml-4">
      <Card>0</Card>
      <Card>1</Card>
      <Card>2</Card>
      <Card>3</Card>
      <Card>5</Card>
    </div>
  )
}