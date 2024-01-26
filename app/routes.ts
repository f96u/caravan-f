export type Route = {
  path: string,
  name: string,
}

export const routeMap: {[key: string]: Route} = {
  top: {
    path: '/',
    name: 'TOP',
  },
  timer: {
    path: '/timer',
    name: 'タイマー'
  },
  planningPoker: {
    path: '/planning-poker',
    name: 'プランニングポーカー'
  },
  householdAccount: {
    path: '/household-account',
    name: '家計簿'
  },
}

export const routes = Object.values(routeMap)
