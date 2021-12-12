import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'

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
        <Button
          icon={<Icon name="add" size={15} color="white" />}
          title="Add task"
        />
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
