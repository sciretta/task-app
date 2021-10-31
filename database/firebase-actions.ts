import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()

export default {
  async createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        return user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        return errorMessage
      })
  },
}
