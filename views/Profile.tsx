import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Avatar, Button } from 'react-native-elements'
import { useUser } from '../firebase/hooks'
import { taskActions } from '../firebase/db'

export default function Profile({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) {
  const user = useUser()
  const imageTaked = route?.params?.imageTaked
  const [loading, setLoading] = useState('')
  const [avatar, setAvatar] = useState('')

  const uploadImage = () => {
    if (!user?.uid) return
    taskActions.saveImage(user?.uid, imageTaked, setLoading)
  }

  useEffect(() => {
    ;(async () => {
      if (!user?.uid) return
      const fileUrl = await taskActions.getAvatar(user.uid)
      setAvatar(fileUrl)
    })()
  }, [user])

  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        containerStyle={{ backgroundColor: 'grey' }}
        rounded
        title={!imageTaked ? user?.email?.[0].toUpperCase() : ''}
        source={{
          uri: imageTaked || avatar,
        }}
      />
      <Button
        onPress={() => navigation.navigate('Camera')}
        icon={<Icon name="edit" size={15} color="white" />}
        title="Change image"
      />
      <Text h4>{user?.email?.toUpperCase()}</Text>
      <Button
        onPress={uploadImage}
        icon={<Icon name="save" size={15} color="white" />}
        title="Save changes"
        loading={Boolean(loading)}
      />
      <Text>{loading}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
