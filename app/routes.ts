type Route = {
  path: string,
  name: string,
}

export const routeMap: {[key: string]: Route} = {
  planningPoker: {
    path: '/planning-poker',
    name: 'プランニングポーカー'
  },
  timer: {
    path: '/timer',
    name: 'タイマー'
  },
}

export const routes = Object.values(routeMap)
