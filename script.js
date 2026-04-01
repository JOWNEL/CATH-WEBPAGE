// script.js - Shared Firebase Configuration & Helpers

// 🔥 Firebase Config (used by all pages)
export const firebaseConfig = {
  apiKey: "AIzaSyC-uy3DLim-C06ueatkNCr9bZ-4Cnqi5E4",
  authDomain: "cath-aesthetics.firebaseapp.com",
  projectId: "cath-aesthetics",
  storageBucket: "cath-aesthetics.firebasestorage.app",
  messagingSenderId: 89600382,
  appId: "1:89600382:web:4b9259e721980ca266c32f",
  measurementId: "G-V4FRRXM4BC"
};

// 🔍 Get user role from Firestore
export async function getUserRole(db, email) {
  const { collection, query, where, getDocs } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
  );
  
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return "employee"; // Safe default
  return snapshot.docs[0].data().role || "employee";
}

// 🔐 Check if user is authenticated (for dashboard protection)
export function requireAuth(auth, redirectUrl = "login.html") {
  const { onAuthStateChanged } = await import(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
  );
  
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = redirectUrl;
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// 🎨 Apply pink aesthetic styles (optional helper)
export function applyPinkTheme() {
  document.body.style.fontFamily = "'Poppins', sans-serif";
  // Add more shared styles here if needed
}