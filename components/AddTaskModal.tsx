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
  const [loading, setLoading] = useState(false)
  const toggleOverlay = () => {
    setOpen((prev: boolean) => !prev)
  }
  const [task, setTask] = useState('')

  useEffect(() => {
    if (!open) return
    setTask('')
    setLoading(false)
  }, [open])

  const onAddTask = async () => {
    if (!task || !user?.uid) return
    setLoading(true)
    await taskActions.addTask(user.uid, task)
    setOpen(false)
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
          loading={loading}
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
