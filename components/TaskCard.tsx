import React from 'react'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { taskActions } from '../firebase/db'

export default function TaskCard({
  task,
}: {
  task: { name: string; id: string }
}) {
  return (
    <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
      <Card.Title>{task.name}</Card.Title>

      <Button
        type="clear"
        icon={<Icon name="delete" size={20} color="red" />}
        onPress={() => taskActions.deleteTask(task.id)}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    color: 'red',
  },
})
