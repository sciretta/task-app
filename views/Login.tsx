import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Header, Icon, Input } from 'react-native-elements'

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {}

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          leftIcon={<Icon name="email" />}
        />
      </View>

      <View style={styles.input}>
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" />}
        />
      </View>

      <Button title="Log In" onPress={handleLogin} />
    </View>
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
  input: {
    height: 75,
    width: '70%',
  },
})
