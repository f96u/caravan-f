import React, { createContext, ReactNode, useState } from 'react'
import { User } from '@firebase/auth'

export const MeContext = createContext({ me: null, setMe: () => {} } as { me: User | null, setMe: React.Dispatch<React.SetStateAction<User | null>>})
export const MeContextProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null)
  return <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
}
