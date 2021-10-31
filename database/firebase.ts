import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYnIjHBEqIIWOcRwnYWR6V4jSoXScHLhg',
  authDomain: 'task-2a68f.firebaseapp.com',
  projectId: 'task-2a68f',
  storageBucket: 'task-2a68f.appspot.com',
  messagingSenderId: '723930042407',
  appId: '1:723930042407:web:78e248198575db98f3be02',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function getTasks(db: Firestore) {
  const tasksCol = collection(db, 'tasks')
  const tasksSnapshot = await getDocs(tasksCol)
  const tasks = tasksSnapshot.docs.map((doc) => doc.data())
  return tasks
}
