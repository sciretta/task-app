import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Header } from 'react-native-elements'

import Login from './views/LogIn'
import SignUp from './views/SignUp'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <Header
        placement="center"
        centerComponent={{ text: 'Task App', style: { color: '#fff' } }}
      />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="SignUp" component={SignUp} />
        </Drawer.Navigator>
      </NavigationContainer>
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
