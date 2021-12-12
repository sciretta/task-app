import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import auth from '../firebase/Auth'

export default function LogOut() {
  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={() => auth.logOut()} />
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
})
