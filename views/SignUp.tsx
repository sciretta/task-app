import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import Auth from '../firebase/Auth'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    const response = await Auth.signUp(email, password)
    console.log({ response })
  }

  return (
    <>
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
            secureTextEntry
            leftIcon={<Icon name="lock" />}
          />
        </View>

        <Button title="Sign Up" onPress={handleSignUp} />
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
  input: {
    height: 75,
    width: '70%',
  },
})
