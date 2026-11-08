import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js';

// Firebase usado pelo Nexus Verse para login, dados e armazenamento.
export const firebaseConfig = {
  apiKey: 'AIzaSyAwBLS4cFrTvM6rbXpn968B752RlarNnVc',
  authDomain: 'drama-damas.firebaseapp.com',
  databaseURL: 'https://drama-damas-default-rtdb.firebaseio.com',
  projectId: 'drama-damas',
  storageBucket: 'drama-damas.firebasestorage.app',
  messagingSenderId: '932787134552',
  appId: '1:932787134552:web:86a275650e75434f662a2d',
  measurementId: 'G-LXCBBGBML6'
};
export const ADMIN_UID = 'vLSKhd1onRUzcYLEzK1o85uMkbg2';
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
