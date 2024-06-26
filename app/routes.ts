export type Route = {
  path: string,
  name: string,
  limit?: string,
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
  householdAccount: {
    path: '/household-account',
    name: '家計簿',
    limit: '7lMj8JqKnSbxoNnIMxfGKteGfvs1',
  },
}

export const routes = Object.values(routeMap)
