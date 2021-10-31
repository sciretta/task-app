import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Login from './views/Login'

export default function App() {
  // const tasks = async () => {
  //   const response = await getTasks(db)
  //   console.log({ response })
  // }

  // useEffect(() => {
  //   tasks()
  // }, [])

  return (
    <SafeAreaProvider>
      <Login />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
