import { Camera } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default function CameraView({ navigation }: { navigation: any }) {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [camera, setCamera] = useState<Camera | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    navigation.navigate('Profile', { imageTaked: photo.uri })
  }

  if (hasPermission === null) return <View />

  if (hasPermission === false) return <Text>No access to camera</Text>

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={(ref) => setCamera(ref)} style={{ flex: 1 }} type={type} />
      <Button
        onPress={() =>
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          )
        }
        title={
          type === Camera.Constants.Type.back
            ? 'Use Front Camera'
            : 'Use Back Camera'
        }
      />
      <Button onPress={takePicture} title="Take a picture" />
    </View>
  )
}

const styles = StyleSheet.create({})
