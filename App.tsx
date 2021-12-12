import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Header } from 'react-native-elements'
import Login from './views/LogIn'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './views/Home'
import { useUser } from './firebase/hooks'

const Stack = createStackNavigator()

export default function App() {
  const user = useUser()
  return (
    <SafeAreaProvider>
      <Header
        placement="center"
        centerComponent={{ text: 'Task App', style: { color: '#fff' } }}
      />
      {!user ? (
        <Login />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
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
