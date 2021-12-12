import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import app from './config'

class TaskActions {
  private db = getFirestore(app)

  public async getTasks(uid: string) {
    const q = query(collection(this.db, 'cities'), where('uid', '==', uid))
    const taskSnapshot = await getDocs(q)

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // const tasksCol = collection(this.db, 'tasks')
    // console.log({ tasksCol })
    // const taskSnapshot = await getDocs(tasksCol)
    const tasksList = taskSnapshot.docs.map((doc) => doc.data())
    return tasksList
  }
}

export const taskActions = new TaskActions()
