// ==========================================
// TKJ SMART LAB
// Firebase Configuration
// SMKS Mandiri Bandar Agung
// ==========================================

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "ISI_API_KEY_DARI_FIREBASE",
  authDomain: "ISI_AUTH_DOMAIN_DARI_FIREBASE",
  projectId: "tkj-smart-lab",
  storageBucket: "ISI_STORAGE_BUCKET_DARI_FIREBASE",
  messagingSenderId: "ISI_MESSAGING_SENDER_ID_DARI_FIREBASE",
  appId: "ISI_APP_ID_DARI_FIREBASE"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firebase Firestore
const db = getFirestore(app);

// Export
export {
  app,
  auth,
  db
};
