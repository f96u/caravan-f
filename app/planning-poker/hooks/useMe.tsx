import { useContext } from 'react'
import { MeContext } from '@/app/planning-poker/context/MeContext'

export const useMe = () => {
  const {me, setMe} = useContext(MeContext)
  return { me, setMe }
}
