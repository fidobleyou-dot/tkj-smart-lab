// ==========================================
// TKJ SMART LAB
// Authentication System
// ==========================================

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
  auth,
  db
} from "./firebase.js";


// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("loginMessage");

    if (!email || !password) {
      message.textContent = "Email dan password wajib diisi.";
      message.className = "login-message error";
      return;
    }

    message.textContent = "Sedang memproses login...";
    message.className = "login-message";

    try {

      // Login Firebase
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Ambil data profil pengguna dari Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {

        message.textContent =
          "Akun berhasil login, tetapi data profil belum ditemukan. Hubungi administrator.";

        message.className = "login-message error";

        return;
      }

      const userData = userSnap.data();

      // Ambil role
      const role = userData.role;

      message.textContent = "Login berhasil. Mengarahkan...";
      message.className = "login-message success";


      // ==========================================
      // REDIRECT BERDASARKAN ROLE
      // ==========================================

      setTimeout(() => {

        if (role === "admin") {

          window.location.href =
            "admin/dashboard.html";

        } else if (role === "guru") {

          window.location.href =
            "guru/dashboard.html";

        } else if (role === "siswa") {

          window.location.href =
            "siswa/dashboard.html";

        } else {

          message.textContent =
            "Role akun tidak dikenali. Hubungi administrator.";

          message.className =
            "login-message error";

        }

      }, 700);


    } catch (error) {

      console.error(error);

      let pesan =
        "Login gagal. Periksa email dan password.";

      if (error.code === "auth/invalid-credential") {
        pesan = "Email atau password salah.";
      }

      if (error.code === "auth/user-not-found") {
        pesan = "Akun tidak ditemukan.";
      }

      if (error.code === "auth/wrong-password") {
        pesan = "Password salah.";
      }

      if (error.code === "auth/too-many-requests") {
        pesan =
          "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
      }

      message.textContent = pesan;
      message.className = "login-message error";

    }

  });

}


// ==========================================
// LUPA PASSWORD
// ==========================================

const forgotPassword =
  document.getElementById("forgotPassword");

if (forgotPassword) {

  forgotPassword.addEventListener("click", async function (event) {

    event.preventDefault();

    const emailInput =
      document.getElementById("email");

    const message =
      document.getElementById("loginMessage");

    const email =
      emailInput.value.trim();

    if (!email) {

      message.textContent =
        "Masukkan email terlebih dahulu.";

      message.className =
        "login-message error";

      emailInput.focus();

      return;
    }

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      message.textContent =
        "Link untuk mengatur ulang password telah dikirim ke email Anda.";

      message.className =
        "login-message success";

    } catch (error) {

      console.error(error);

      message.textContent =
        "Gagal mengirim email reset password. Pastikan email terdaftar.";

      message.className =
        "login-message error";

    }

  });

}
