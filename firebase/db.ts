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
  getDoc,
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

  public async getAvatar(uid: string) {
    const docRef = doc(this.db, Collection.AVATARS, uid)
    const docSnap = await getDoc(docRef)

    return docSnap.data()?.fileUrl as string
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
      transferedCb(
        ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          .toFixed(0)
          .toString() + '%'
      )
    }

    const taskCompleted = () => {
      getDownloadURL(storageRef).then((url) => {
        if (!url) return
        console.log({ url })
        this.uploadAvatar(uid, url)
        if (!transferedCb) return
        transferedCb('')
      })
    }

    const taskError = (snapshot: any) => {
      console.log(snapshot)
      if (!transferedCb) return
      transferedCb('')
    }

    uploadTask.on('state_changed', taskProgress, taskError, taskCompleted)
  }
}

export const taskActions = new TaskActions()
