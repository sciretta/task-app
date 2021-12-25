import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import app from './config'

enum Collection {
  TASKS = 'tasks',
  AVATARS = 'avatars',
}

class TaskActions {
  private db = getFirestore(app)

  private storage = getStorage(app)

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
        tasks.push({ ...doc.data(), id: doc.id })
      })
      cb(tasks)
    })

    return unsubscribe
  }

  public async deleteTask(id: string) {
    await deleteDoc(doc(this.db, Collection.TASKS, id))
  }

  private async uploadAvatar(uid: string, fileUrl: string) {
    await setDoc(doc(this.db, Collection.AVATARS, uid), {
      fileUrl,
    })
  }

  public async saveImage(
    uid: string,
    image: string,
    transferedCb?: (transfered: string) => void
  ) {
    const childPath = `avatar/${uid}/${Math.random().toString(36)}`

    const response = await fetch(image)
    const blob = await response.blob()

    const storageRef = ref(this.storage, childPath)

    const uploadTask = uploadBytesResumable(storageRef, blob)

    const taskProgress = (snapshot: any) => {
      if (!transferedCb) return
      transferedCb(snapshot.bytesTransferred.toString())
    }

    const taskCompleted = () => {
      getDownloadURL(storageRef).then((url) => {
        if (!url) return
        this.uploadAvatar(uid, url)
      })
    }

    const taskError = (snapshot: any) => {
      console.log(snapshot)
    }

    uploadTask.on('state_changed', taskProgress, taskError, taskCompleted)
  }
}

export const taskActions = new TaskActions()
