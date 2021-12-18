import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
} from 'firebase/firestore'
import app from './config'

enum Collection {
  TASKS = 'tasks',
}

class TaskActions {
  private db = getFirestore(app)

  // public async getTasks(uid: string) {
  //   const q = query(
  //     collection(this.db, Collection.TASKS),
  //     where('uid', '==', uid)
  //   )
  //   const taskSnapshot = await getDocs(q)

  //   const tasksList = taskSnapshot.docs.map((doc) => doc.data())
  //   return tasksList
  // }

  public async addTask(uid: string, name: string) {
    await addDoc(collection(this.db, Collection.TASKS), {
      uid,
      name,
    })
  }

  public async subscribeTasksCollection(uid: string, cb: (tasks: any) => void) {
    const q = query(
      collection(this.db, Collection.TASKS),
      where('uid', '==', uid)
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks: any = []
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data())
      })
      cb(tasks)
    })

    return unsubscribe
  }
}

export const taskActions = new TaskActions()
