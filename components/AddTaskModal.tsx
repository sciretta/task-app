import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { taskActions } from '../firebase/db'
import { useUser } from '../firebase/hooks'

export default function AddTaskModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Function
}) {
  const user = useUser()
  const toggleOverlay = () => {
    setOpen((prev: boolean) => !prev)
  }
  const [task, setTask] = useState('')

  useEffect(() => {
    if (!open) return
    setTask('')
  }, [open])

  const onAddTask = () => {
    if (!task || !user?.uid) return
    taskActions.addTask(user.uid, task)
  }

  return (
    <Overlay
      style={styles.overlay}
      isVisible={open}
      onBackdropPress={toggleOverlay}
    >
      <View style={styles.content}>
        <Input placeholder="New task" onChangeText={setTask} />
        <Button
          onPress={onAddTask}
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
