import type { AppProps } from 'next/app'
import { createContext } from 'react'
import { useState } from 'react'



export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
})

import '../styles/globals.css'
import { AppContextType, User } from '../types/app_context'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null)
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
