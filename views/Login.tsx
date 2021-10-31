import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Header, Icon, Input } from 'react-native-elements'
import actions from '../database/firebase-actions'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log({ email, password })

  const handleLogin = () => {
    actions.createUser(email, password)
  }

  return (
    <>
      <Header
        placement="center"
        centerComponent={{ text: 'Task App', style: { color: '#fff' } }}
      />
      <View style={styles.container}>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          leftIcon={<Icon name="email" />}
          onChange={(e) => {
            console.log({ ads: e.target })
          }}
        />

        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" />}
        />

        <Button title="Login" onPress={handleLogin} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
