import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyCQNoTCUigNSBFFXg4nAXE29Gp2C2FUHg0',
  authDomain: 'psychologists-services-a71ec.firebaseapp.com',
  projectId: 'psychologists-services-a71ec',
  storageBucket: 'psychologists-services-a71ec.firebasestorage.app',
  messagingSenderId: '495613628071',
  appId: '1:495613628071:web:1522e83139a7c16d911582',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
