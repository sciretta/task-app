import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SpeedDial } from 'react-native-elements'
import AddTaskModal from '../components/AddTaskModal'
import TaskCard from '../components/TaskCard'
import auth from '../firebase/Auth'
import { taskActions } from '../firebase/db'
import { useUser } from '../firebase/hooks'

export default function Home({ navigation }: { navigation: any }) {
  const [addTask, setAddTask] = useState(false)
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [tasks, setTasks] = useState<{ name: string; id: string }[]>()
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

  const handleSpeedDial = () => {
    setOpenSpeedDial((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <AddTaskModal open={addTask} setOpen={setAddTask} />
        {tasks && tasks.map((task) => <TaskCard task={task} />)}
      </ScrollView>
      <SpeedDial
        isOpen={openSpeedDial}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => handleSpeedDial()}
        onClose={() => handleSpeedDial()}
      >
        <SpeedDial.Action
          icon={{ name: 'exit-to-app', color: '#fff' }}
          title="Logout"
          onPress={() => auth.logOut()}
        />
        <SpeedDial.Action
          icon={{ name: 'person', color: '#fff' }}
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add task"
          onPress={() => {
            setAddTask(true)
            handleSpeedDial()
          }}
        />
      </SpeedDial>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
