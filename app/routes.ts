type Route = {
  path: string,
  name: string,
}
export const routes: Route[] = [
  {
    path: '/',
    name: 'TOP'
  },
  {
    path: '/timer',
    name: 'タイマー'
  },
  {
    path: '/planning-poker',
    name: 'プランニングポーカー'
  }
]
