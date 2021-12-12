import app from '../firebase/config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

class Auth {
  private auth = getAuth(app)

  public async logIn(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password)
      return user
    } catch (error) {
      console.log(error)
    }
  }

  public async signUp(email: string, password: string) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )
      return user
    } catch (error) {
      console.log(error)
    }
  }

  public getUser() {
    return this.auth.currentUser
  }

  public onAuthStateChanged(callback: (user: any) => void) {
    this.auth.onAuthStateChanged(callback)
  }

  public async logOut() {
    try {
      await this.auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Auth()
