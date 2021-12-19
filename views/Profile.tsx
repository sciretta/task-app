import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Avatar, Button } from 'react-native-elements'
import { useUser } from '../firebase/hooks'

export default function Profile() {
  const user = useUser()
  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        containerStyle={{ backgroundColor: 'grey' }}
        rounded
        title={user?.email?.[0].toUpperCase()}
        // source={{
        //   uri: 'https://img.huffingtonpost.com/asset/6135f4e6280000d70171f2ca.jpg?cache=TseSA4gepS&ops=crop_8_0_1827_2237%2Cscalefit_720_noupscale&format=webp',
        // }}
      />
      <Button
        onPress={() => {}}
        icon={<Icon name="edit" size={15} color="white" />}
        title="Change image"
      />
      <Text h4>{user?.email?.toUpperCase()}</Text>
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
