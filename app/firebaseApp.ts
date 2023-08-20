import { initializeApp } from '@firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDsUy4aZjHV6H3vyEKBcblcGFPmpk6skS8",
  authDomain: "caravan-f.firebaseapp.com",
  databaseURL: "https://caravan-f.firebaseio.com",
  projectId: "caravan-f",
  storageBucket: "caravan-f.appspot.com",
  messagingSenderId: "425810777948",
  appId: "1:425810777948:web:9383b15670df83004b1399",
  measurementId: "G-BTDWXL1FC2"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
