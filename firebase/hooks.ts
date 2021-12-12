import { Auth, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import auth from './Auth'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return unsubscribe
  }, [])

  return user
}
