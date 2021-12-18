import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, SpeedDial } from 'react-native-elements'
import AddTaskModal from '../components/AddTaskModal'
import auth from '../firebase/Auth'
import { taskActions } from '../firebase/db'
import { useUser } from '../firebase/hooks'

export default function Home() {
  const [addTask, setAddTask] = useState(false)
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [tasks, setTasks] = useState<{ name: string }[]>()
  const user = useUser()

  useEffect(() => {
    let unsubscribe: any
    ;(async () => {
      if (!user?.uid) return
      unsubscribe = await taskActions.subscribeTasksCollection(
        user.uid,
        setTasks
      )
    })()

    return unsubscribe
  }, [user])

  console.log({ tasks })

  const handleSpeedDial = () => {
    setOpenSpeedDial((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      <AddTaskModal open={addTask} setOpen={setAddTask} />
      {tasks &&
        tasks.map((task) => (
          <Card>
            <Card.Title>{task.name}</Card.Title>
          </Card>
        ))}
      <SpeedDial
        isOpen={openSpeedDial}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => handleSpeedDial()}
        onClose={() => handleSpeedDial()}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add task"
          onPress={() => {
            setAddTask(true)
            handleSpeedDial()
          }}
        />
        <SpeedDial.Action
          icon={{ name: 'exit-to-app', color: '#fff' }}
          title="Logout"
          onPress={() => auth.logOut()}
        />
      </SpeedDial>
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
