import auth from '@react-native-firebase/auth'

class Auth {
  public async logIn(email: string, password: string) {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password)
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async signUp(email: string, password: string) {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password)
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new Auth()
