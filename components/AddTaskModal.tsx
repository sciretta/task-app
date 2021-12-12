import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { TextInput } from 'react-native-gesture-handler'

export default function AddTaskModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Function
}) {
  const toggleOverlay = () => {
    setOpen((prev: boolean) => !prev)
  }
  return (
    <Overlay
      style={styles.overlay}
      isVisible={open}
      onBackdropPress={toggleOverlay}
    >
      <View style={styles.content}>
        <Input placeholder="New task" />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  content: {},
})
